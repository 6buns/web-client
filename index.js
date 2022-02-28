
import { io } from "socket.io-client";
import { PeerConnect } from "./src/PeerConnect";
import debug from "debug";
import { config } from "./src/config";

const s = debug('Socket')
const p = debug('Peer')
const rp = debug('Remote')

// Create a Global Object to store state.
class Bun {
    constructor(accountSid, apiKey) {
        this.accountSid = accountSid;
        this.apiKey = apiKey;
        this.serverURL = 'http://localhost:3000'

        this.streams = [];

        this.buffer = 1000;

        this.room = ''

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
            peer.ontrack = (event) => {
                rp(`TRACK RECIEVED : ${event}`)
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

                    setTimeout(() => {
                        rp('Adding Tracks.')
                        this.streams.forEach(track => {
                            peer.addTrack(track)
                        });
                        rp('Tracks Added.')
                    }, this.buffer)
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

                rp('Adding Tracks.')
                this.streams.forEach(track => {
                    peer.addTrack(track)
                });
                rp('Tracks Added.')
            }
        })

        // add candidates
        this.socket.on('candidates', ({ to, from, candidates }) => {
            const peer = this.peers.get(from)
            rp('Adding Ice Candidates from Remote Peer.')
            candidates.forEach(candidate => {
                peer.addIceCandidate(candidate)
            });
        })

        // Peer disconnected
        this.socket.on('peer-disconnected', (id) => {
            s('Socket disconnected')
            p('Close Remote Peer Connection')
            this.peers.get(id).close()
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

                            newPeer.ontrack = (event) => {
                                rp(`TRACK RECIEVED`, event)
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
        stream.getTracks().forEach(track => this.streams.push(track))
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

export { Bun }
