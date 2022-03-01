
import { io } from "socket.io-client";
import debug from "debug";
import { config } from "./src/config";
import EventEmitter from "events";

const s = debug('Socket')
const p = debug('Peer')
const rp = debug('Remote')

// Create a Global Object to store state.
class Bun extends EventEmitter {
    constructor(accountSid = null, apiKey = null) {
        super();
        this.accountSid = accountSid;
        this.apiKey = apiKey;
        this.serverURL = 'https://a83b-223-236-222-122.ngrok.io'

        this.streams = [];

        this.room = ''

        this.buffer = 50

        this.remoteStreams = new Map()

        this.peers = new Map();

        this.iceCandidates = new Map();

        // Connect to socket
        this.socket = io(this.serverURL)

        // Socket Incoming Handlers
        this.socket.on('connection', (id) => {
            s('Socket Connected', { id })
        })

        // New Peer
        this.socket.on('new-peer-connected', (id) => {
            s('New Peer Connected. Waiting for an offer.')
            this.peers.set(id, new RTCPeerConnection(config))
            const peer = this.peers.get(id)

            peer.onicecandidate = (event) => {
                if (event.candidate) {
                    rp('ICE Candidate', event)
                    this.socket.emit('candidates', {
                        from: event.currentTarget.from,
                        to: event.currentTarget.to,
                        candidates: [event.candidate]
                    })
                }
            }

            rp('Adding Tracks.')
            this.streams.getTracks().forEach(track => {
                peer.addTrack(track, this.streams)
            });
            rp('Tracks Added.')

            peer.ontrack = (event) => {
                rp(`TRACK RECIEVED : ${event}`)
                this.remoteStreams.set(event.target.from, event.track)
                this.emit('new-remote-track', event)
            }

            peer.onconnectionstatechange = (event) => {
                switch (event) {
                    case "connected":
                        rp('The connection has become fully connected.')
                        this.emit('new-peer', event)
                        break;
                    case "failed":
                        rp('One or more transports has terminated unexpectedly or in an error')
                        break;
                    case "closed":
                        rp('The connection has been closed')
                        break;
                }
            }

            peer.from = this.socket.id
            peer.to = id
            s(peer)
        })

        // PARTICIPANT
        /******************* */
        // On Offer,
        // Set Remote Description
        // Get User Media
        // Add Stream
        // Create Answer
        /******************* */
        // Set Local Description
        /******************* */
        // Add Ice Candidates
        /******************* */
        // Send Ice Candidates

        // New Peer Offer SDP
        this.socket.on('offer-sdp', ({ from, to, sdp }) => {
            if (this.peers.has(from)) {
                const peer = this.peers.get(from)
                const fromPeer = from
                s('Offer SDP recieved.')

                debug('Peers')(this.peers, from)
                peer.setRemoteDescription(sdp)
                p('Offer SDP set as Remote Description.')

                peer.createAnswer({
                    offerToReceiveAudio: true,
                    offerToReceiveVideo: true,
                }).then(sdp => {
                    p('Answer SDP created.')

                    peer.setLocalDescription(sdp);
                    p('Answer SDP set as Local Description.')

                    s('Send Answer SDP to Remote Peer.')
                    this.socket.emit('answer-sdp', {
                        to: fromPeer,
                        from: this.socket.id,
                        room: this.room,
                        sdp
                    })
                })
            }
        })

        // Answer SDP
        this.socket.on('answer-sdp', ({ to, from, room, sdp }) => {
            rp('Answer Recieved from Remote Peer.')
            if (sdp.type === 'answer') {
                const peer = this.peers.get(from)
                const fromPeer = from
                rp('Set Answer as Remote Description.')
                peer.setRemoteDescription(sdp)
            }
        })

        // add candidates
        this.socket.on('candidates', async ({ to, from, candidates }) => {
            const peer = this.peers.get(from)
            rp('Adding Ice Candidates from Remote Peer.')
            try {
                for (const candidate of candidates) {
                    await new Promise((resolve, reject) => {
                        peer.addIceCandidate(candidate).then(resolve).catch(reject)
                    })
                }
            } catch (error) {
                rp(error.message)
            }
        })

        // Peer disconnected
        this.socket.on('peer-disconnected', (id) => {
            s('Socket disconnected')
            let peer = this.peers.get(id)

            s(peer)
            this.emit('peer-left', peer.to)

            p('Close Remote Peer Connection')
            peer.close()

            p('Remove Remote Peer')
            this.peers.delete(id)
        })
    }

    test = (x) => {
        p(x, 'Client Library Loaded !')
    }

    // Create or Join Room
    join = async (room) => {
        this.room = room
        await new Promise(async (resolve, reject) => {
            s('Joining Room')
            this.socket.emit('join-room', room, (peerList) => {
                s('Room Joined', peerList)
                if (peerList.length > 1) {
                    s('Peers List Recieved')
                    peerList.forEach(pid => {
                        if (pid !== this.socket.id) {
                            this.peers.set(pid, new RTCPeerConnection(config))
                            const newPeer = this.peers.get(pid)

                            newPeer.onicecandidate = (event) => {
                                if (event.candidate) {
                                    rp('ICE Candidate', event)
                                    this.socket.emit('candidates', {
                                        from: event.currentTarget.from,
                                        to: event.currentTarget.to,
                                        candidates: [event.candidate]
                                    })
                                }
                            }

                            rp('Adding Tracks.')
                            this.streams.getTracks().forEach(track => {
                                newPeer.addTrack(track, this.streams)
                            });
                            rp('Tracks Added.')

                            newPeer.ontrack = (event) => {
                                rp(`TRACK RECIEVED : ${event}`)
                                this.remoteStreams.set(event.target.from, event.streams[0])
                                this.emit('new-remote-track', event)
                            }

                            newPeer.onconnectionstatechange = (event) => {
                                switch (event) {
                                    case "connected":
                                        rp('The connection has become fully connected.')
                                        this.emit('new-peer', event)
                                        break;
                                    case "failed":
                                        rp('One or more transports has terminated unexpectedly or in an error')
                                        break;
                                    case "closed":
                                        rp('The connection has been closed')
                                        break;
                                }
                            }

                            newPeer.from = this.socket.id
                            newPeer.to = pid
                            s(newPeer)
                        }
                    });
                    rp('Establishing Peer Connection to Remote Peer.')
                    this.connect()
                    resolve()
                }
            })
        })
    }

    // INITIATOR
    /******************* */
    // Get User Media
    // Add Stream
    // Create Offer
    // Set Local SDP
    /******************* */
    // Set Remote Description
    /******************* */
    // Send Candidates
    /******************* */
    // Add Candidates

    connect = async () => {
        for (const [socketId, peer] of this.peers) {
            rp('Connecting to Remote Peer.')
            rp(socketId, peer)
            try {
                await new Promise((resolve, reject) => {
                    rp('Creating Offer for Remote Peers')
                    peer.createOffer({
                        offerToReceiveAudio: true,
                        offerToReceiveVideo: true,
                    }).then((sdp) => {
                        rp('Set Offer as Local Description.')
                        peer.setLocalDescription(sdp)

                        setTimeout(() => {
                            s('Sending Offer to Remote Peer.')
                            this.socket.emit('offer-sdp', {
                                to: socketId, from: this.socket.id,
                                room: this.room, sdp
                            })
                            s('Offer Sent to Remote Peer.')
                            resolve()
                        }, this.buffer);
                    }).catch(reject)
                });
            } catch (error) {
                console.error(error)
            }
        }
    }

    // Get User Media
    // Add Stream
    getMedia = (video, audio) => navigator.mediaDevices.getUserMedia({
        video,
        audio
    }).then((stream) => {
        p(stream)
        const video = document.querySelector('#self');
        video.srcObject = stream;
        video.onloadedmetadata = (e) => {
            video.play();
        };
        this.streams = stream;
    })

    // Get User Screen
    // Add Stream
    shareScreen = async () => await navigator.mediaDevices.getDisplayMedia({ video: true }).then(stream => {
        this.streams.forEach((track, index) => {
            if (track.kind === 'video') {
                this.streams[index] = stream.getVideoTracks()[0]
            }
        })
    })
}

export default Bun
