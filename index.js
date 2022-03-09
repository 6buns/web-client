
import { io } from "socket.io-client";
import debug from "debug";
import { config } from "./src/config";
import EventEmitter from "events";

const s = debug('Socket')
const p = debug('Peer')
const rp = debug('Remote')

class Bun extends EventEmitter {
    constructor(apiKey = null, hasVideo = true, hasAudio = true) {
        super();
        this.apiKey = apiKey;
        this.media = {
            video: hasVideo,
            audio: hasAudio
        };
        this.getMedia(hasVideo, hasAudio);
        this.name = btoa(Math.random().toString()).substring(10, 5)
        this.poster = this.createPoster(this.name)
        this.streams = new MediaStream();
        this.room = '';
        this.buffer = 50;
        this.remoteStreams = new Map()
        this.peers = new Map();
        this.iceCandidates = new Map();
        this.iceServers = [];

        // Connect to socket
        this.socket = io('https://p2p.6buns.com/', {
            transports: ["websocket", "polling"],
            auth: {
                key: this.apiKey
            }
        });

        // Socket Incoming Handlers
        this.socket.on('connection', (id, users, iceServers) => {
            s('Socket Connected', { id, users, iceServers })
            this.iceServers = [...iceServers]
        });

        // New Peer
        this.socket.on('new-peer-connected', (id) => {
            if (id !== this.socket.id) {

                s('New Peer Connected. Waiting for an offer.')
                this.peers.set(id, new RTCPeerConnection({
                    iceServers: this.iceServers
                }))
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
                    this.remoteStreams.set(event.target.to, event.streams[0])
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
                peer.poster = this.poster
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

        this.socket.on('track-update', ({ id, update }) => {
            s('Track Update', id, update)
            switch (update) {
                case 'mute':
                    this.emit('remote-peer-track-muted', id)
                    break;
                case 'unmute':
                    this.emit('remote-peer-track-unmuted', id)
                    break;
                case 'end':
                    this.emit('remote-peer-track-ended', id)
                    break;
                default:
                    break;
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
                                this.remoteStreams.set(event.target.to, event.streams[0])
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
                            newPeer.poster = this.poster
                            s(newPeer)
                        }
                    });
                    rp('Establishing Peer Connection to Remote Peer.')
                    resolve()
                }
            })
        })
    }

    addMediaTrack = (track) => {
        this.streams.addTrack(track);
        if (this.peers.size > 0) {
            for (const [id, peer] of this.peers) {
                peer.addTrack(track, this.streams)
            }
        }
    }

    addMedia = (stream) => {
        p('Adding Stream from Peer Connection')
        stream.getTracks().forEach(track => this.addMediaTrack(track))
        p('Added new Stream', this.peers)
    }


    removeMediaTrack = (track) => {
        for (const [id, peer] of this.peers) {
            peer.getSenders().forEach(rtpSender => {
                if (rtpSender?.track?.kind === track.kind) {
                    peer.removeTrack(rtpSender)
                    this.socket.emit('track-update', { id: peer.from, update: 'end', room: this.room })
                }
            })
        }
        this.streams.removeTrack(track)
    }

    removeMedia = (stream) => {
        p('Removing Stream from Peer Connection', stream)
        stream.getTracks().forEach(track => this.removeMediaTrack(track))
        p('Removed Stream', stream)
    }

    // Get User Media
    // Add Stream
    getMedia = (video, audio) => navigator.mediaDevices.getUserMedia({
        video,
        audio
    }).then((stream) => {
        p(stream)
        this.addStream(stream)
        this.addMedia(stream)
    }).catch(console.error)

    // Get User Screen
    // Add Stream
    screenShare = async () => await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true }).then(stream => {
        const track = stream.getVideoTracks()[0]
        console.log(track)
        track.onended = (e) => {
            p('Stopped Screen Share', e)
            this.emit('screen-share-ended', e)
            this.switchToCam()
        }
        this.removeMedia(this.streams)
        this.addMedia(stream)
        this.addStream(stream)
    })

    switchToCam = async () => {
        this.removeMedia(this.streams)
        this.getMedia(this.media.video, this.media.audio)
    }

    addStream = (stream) => {
        const video = document.querySelector('#self');
        video.srcObject = stream;
        video.onloadedmetadata = (e) => {
            video.play();
        };
    }

    stopMedia = (mediaType = undefined, peerId = undefined) => {
        // stop producing media, if id provided stop users media
        if (mediaType) {
            switch (mediaType) {
                case 'video':
                    this.streams.getVideoTracks().forEach(track => {
                        this.removeMediaTrack(track);
                        document.querySelector('#self').srcObject = null;
                        track.stop()
                    })
                    break;
                case 'audio':
                    this.streams.getAudioTracks().forEach(track => {
                        this.removeMediaTrack(track);
                        track.stop()
                    })
                    break;
                case 'screen':
                    this.streams.getVideoTracks().forEach(track => {
                        this.removeMediaTrack(track);
                        track.stop()
                    })
                    break;
                case 'all':
                    this.streams.getTracks().forEach(track => {
                        this.removeMediaTrack(track);
                        track.stop()
                        document.querySelector('#self').srcObject = null;
                    })
                    break;
            }
        }

        if (peerId) {
            this.peers.get(peerId).getSenders().forEach(rtpSender => {
                if (mediaType) {
                    if (rtpSender.track.kind === mediaType) rtpSender.track.stop()
                } else {
                    rtpSender.track.stop()
                }
            })
        }
    }

    createPoster = (name) => {
        let canv = document.createElement('canvas');
        canv.id = "canv";
        canv.height = 600;
        canv.width = 800;
        document.body.appendChild(canv)
        canv = document.getElementById('canv');
        const ctx = canv.getContext('2d');

        ctx.fillStyle = '#1C1917';
        ctx.fillRect(0, 0, 800, 600);

        ctx.fillStyle = '#FAFAF9';
        ctx.textAlign = 'center';
        ctx.font = '64px sans-serif';
        ctx.fillText(name, 400, 300);

        const uri = (canv.toDataURL());
        document.body.removeChild(canv);
        return uri;
    }
}

export default Bun
