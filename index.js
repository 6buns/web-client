
import { io } from "socket.io-client";
import debug from "debug";
import { config } from "./src/config";
import EventEmitter from "events";

const s = debug('Socket')
const p = debug('Peer')
const rp = debug('Remote')

class Bun extends EventEmitter {
    constructor(apiKey = null) {
        super();
        this.apiKey = apiKey;
        this.serverURL = 'https://p2p.6buns.com/'
        this.name = Math.random() > 0.5 ? 'a' : 'b'
        this.streams = [];
        this.room = ''
        this.buffer = 50
        this.remoteStreams = new Map()
        this.peers = new Map();
        this.iceCandidates = new Map();
        this.iceServers = []

        // Connect to socket
        this.socket = io(this.serverURL, {
            transports: ["websocket", "polling"],
            auth: {
                key: this.apiKey
            }
        })

        // Socket Incoming Handlers
        this.socket.on('connection', (id, users, iceServers) => {
            s('Socket Connected', { id, users, iceServers })
            this.iceServers = [...iceServers]
            // this.iceServers = [{
            //     urls: 'stun:stun.6buns.com:3478'
            // }]
        })

        // New Peer
        this.socket.on('new-peer-connected', (id) => {
            if (id !== this.socket.id) {

                s('New Peer Connected. Waiting for an offer.')
                this.peers.set(id, new RTCPeerConnection({
                    iceServers: this.iceServers
                }))
                // this.peers.set(id, new RTCPeerConnection(config))
                const peer = this.peers.get(id)

                peer.onicecandidate = (event) => {
                    if (event.candidate) {
                        rp('ICE Candidate', event)
                        this.socket.emit('data', {
                            from: event.currentTarget.from,
                            to: event.currentTarget.to,
                            data: { candidate: event.candidate }
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

                peer.makingOffer = false

                peer.onnegotiationneeded = async (event) => {
                    try {
                        p(event)
                        peer.makingOffer = true
                        const offer = await event.currentTarget.createOffer()
                        if (event.currentTarget.signalingState != "stable") return;
                        await event.currentTarget.setLocalDescription(offer);
                        p(event.currentTarget.localDescription, offer)
                        this.socket.emit('data', {
                            to: event.currentTarget.to,
                            from: event.currentTarget.from,
                            data: { sdp: event.currentTarget.localDescription }
                        })
                    } catch (error) {
                        console.error(error)
                    } finally {
                        peer.makingOffer = false
                    }
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
                peer.name = this.name
                peer.initiator = false
                peer.ignoreOffer = false
                s(peer)
            }
        })

        this.socket.on('data', async ({ to, from, data: { sdp, candidate } }) => {
            if (this.peers.has(from) && to === this.socket.id) {
                try {
                    const peer = this.peers.get(from)
                    if (sdp) {
                        const offerCollision = sdp.type === 'offer' && (peer.makingOffer || peer.signalingState !== 'stable')
                        peer.ignoreOffer = !peer.initiator && offerCollision
                        if (peer.ignoreOffer) return;
                        if (offerCollision) {
                            await Promise.all([
                                peer.setLocalDescription({ type: "rollback" }),
                                peer.setRemoteDescription(sdp)
                            ]);
                        } else {
                            p('Answer Recieved', sdp)
                            await peer.setRemoteDescription(sdp);
                        }
                        if (sdp.type == "offer") {
                            await peer.setLocalDescription(await peer.createAnswer());
                            this.socket.emit('data', {
                                to: from,
                                from: to,
                                data: { sdp: peer.localDescription }
                            });
                            p('Answer Sent', peer.localDescription)
                        }
                    } else if (candidate) {
                        try {
                            await peer.addIceCandidate(candidate);
                            p('Added Ice Candidate', candidate)
                        } catch (e) {
                            if (!peer.ignoreOffer) p(e);
                            else p('Should be ignored', e, candidate, this.peers.has(from), to === this.socket.id)
                        }
                    };
                } catch (error) {
                    s(error)
                }
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
                            this.peers.set(pid, new RTCPeerConnection({
                                iceServers: this.iceServers
                            }))
                            // this.peers.set(pid, new RTCPeerConnection(config))
                            const newPeer = this.peers.get(pid)

                            newPeer.onicecandidate = (event) => {
                                if (event.candidate) {
                                    rp('ICE Candidate', event)
                                    this.socket.emit('data', {
                                        from: event.currentTarget.from,
                                        to: event.currentTarget.to,
                                        data: { candidate: event.candidate }
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

                            newPeer.makingOffer = false

                            newPeer.onnegotiationneeded = async (event) => {
                                try {
                                    p(event)
                                    newPeer.makingOffer = true
                                    const offer = await event.currentTarget.createOffer()
                                    if (event.currentTarget.signalingState != "stable") return;
                                    await event.currentTarget.setLocalDescription(offer);
                                    p(event.currentTarget.localDescription, offer)
                                    this.socket.emit('data', {
                                        to: event.currentTarget.to,
                                        from: event.currentTarget.from,
                                        data: { sdp: event.currentTarget.localDescription }
                                    })
                                } catch (error) {
                                    console.error(error)
                                } finally {
                                    newPeer.makingOffer = false
                                }
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
                            newPeer.name = this.name
                            newPeer.initiator = true
                            newPeer.ignoreOffer = false
                            s(newPeer)
                        }
                    });
                    rp('Establishing Peer Connection to Remote Peer.')
                    // this.connect()
                    resolve()
                }
            })
        })
    }

    // Get User Media
    // Add Stream
    getMedia = (video, audio) => navigator.mediaDevices.getUserMedia({
        video,
        audio
    }).then((stream) => {
        p(stream)
        this.addStream(stream)
        this.streams = stream;
    }).catch(console.error)

    // Get User Screen
    // Add Stream
    shareScreen = async () => await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true }).then(stream => {
        for (const [id, peer] of this.peers) {
            peer.getSenders().forEach(rtpSender => {
                stream.getVideoTracks()[0].onended = (e) => {
                    p('Stopped Screen Share', e, peer, this)
                    this.switchToCam()
                }
                p(rtpSender, peer)
                if (rtpSender?.track?.kind === 'video') {
                    rtpSender.replaceTrack(stream.getVideoTracks()[0])
                        .then(() => p("Replaced video track from camera to screen"))
                        .catch(error => p("Could not replace video track: " + error))
                }
            })
        }
        this.addStream(stream)
    })

    switchToCam = async () => {
        this.addStream(this.streams)
        for (const [id, peer] of this.peers) {
            peer.getSenders().forEach(rtpSender => {
                p(rtpSender, peer)
                if (rtpSender?.track?.kind === 'video') {
                    rtpSender.replaceTrack(this.streams.getVideoTracks()[0])
                        .then(() => p("Replaced video track from camera to screen"))
                        .catch(error => p("Could not replace video track: " + error))
                }
            })
        }
    }

    addStream = (stream) => {
        const video = document.querySelector('#self');
        video.srcObject = stream;
        video.onloadedmetadata = (e) => {
            video.play();
        };
    }

    stop = ({ mediaType, peerId }) => {
        // stop producing media, if id provided stop users media
    }
}

export default Bun
