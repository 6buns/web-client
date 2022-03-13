
import { io } from "socket.io-client";
import debug from "debug";
import EventEmitter from "events";

const s = debug('Socket')
const p = debug('Peer')
const rp = debug('Remote')

/**
 * @class Bun Class which handles all the peer to peer realtime connection.
 */
class Bun extends EventEmitter {
    /**
     * Initializes the Peer with auth variables, and media types.
     * @param {string} apiKey API key provided, is available on dashboard.
     * @param {boolean} hasVideo If true, peer to peer session has camera on.
     * @param {boolean} hasAudio If true, session has microphone on.
     */
    constructor({ apiKey = null, hasVideo = true, hasAudio = true }) {
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

        /**
         * @implements Establishing the socket connection.
         */
        this.socket = io('https://p2p.6buns.com/', {
            transports: ["websocket", "polling"],
            auth: {
                key: this.apiKey
            }
        });

        /**
         * @listens Socket Socket Connection established.
         */
        this.socket.on('connection', (id, users, iceServers) => {
            s('Socket Connected', { id, users, iceServers })
            this.iceServers = [...iceServers]
        });

        /**
         * @listens Socket New Peer connected. Create a new RTCPeerConnection for this new peer.
         */
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

        /**
         * @listens Socket listener for listening on sdp, or candidate data required for RTCPeerConnection.
         */
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

        /**
         * @listens Socket Track Update Changes.
         */
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

        /**
         * @listens Socket Peer disconnected
         */
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

    /**
     * Creates a new RTCPeerConnection for each peer, if any.
     * @param {string} room Room ID peer wants to connect to. If no room exsits then a new room is created with the provided id.
     */
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

    /**
     * Add local Media track to all the peer connections.
     * @param {object} track MediaStreamTrack to be added to the session.
     */
    addMediaTrack = (track) => {
        this.streams.addTrack(track);
        if (this.peers.size > 0) {
            for (const [id, peer] of this.peers) {
                peer.addTrack(track, this.streams)
            }
        }
    }

    /**
     * Can be used to add a media stream, for all peer connections.
     * @param {object} stream MediaStream to be added, tracks are extracted and @function addMediaTrack is called on each track.
     */
    addMedia = (stream) => {
        p('Adding Stream from Peer Connection')
        stream.getTracks().forEach(track => this.addMediaTrack(track))
        p('Added new Stream', this.peers)
    }

    /**
     * Can be used to remove a media stream track, for all peer connections.
     * @param {object} track track MediaStreamTrack to be removed from all the connected peer's streams.
     */
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

    /**
     * Can be used to remove a media stream, for all peer connections.
     * @param {object} stream MediaStream to be removed, tracks are extracted and @function removeMediaTrack is called on each track.
     */
    removeMedia = (stream) => {
        p('Removing Stream from Peer Connection', stream)
        stream.getTracks().forEach(track => this.removeMediaTrack(track))
        p('Removed Stream', stream)
    }

    /**
     * Get User Media for session.
     * @param {boolean} video
     * @param {boolean} audio
     */
    getMedia = (video, audio) => navigator.mediaDevices.getUserMedia({
        video,
        audio
    }).then((stream) => {
        p(stream)
        this.addStream(stream)
        this.addMedia(stream)
    }).catch(console.error)

    /**
     * Get User Screen for session.
     * @param {boolean} video
     * @param {boolean} audio
     */
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

    /**
     * Only used when screen sharing.
     */
    switchToCam = async () => {
        this.removeMedia(this.streams)
        this.getMedia(this.media.video, this.media.audio)
    }

    /**
     * Adds local stream to video element.
     * @param {object} stream
     */
    addStream = (stream) => {
        const video = document.querySelector('#self');
        video.srcObject = stream;
        video.onloadedmetadata = (e) => {
            video.play();
        };
    }

    /**
     * Used to stop media for user, and other peers.
     * @param {string} mediaType Type of media to stop.
     * @param {string} peerId Peer ID for which media to be stopped. If empty, user's media can be stopped.
     */
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

    /**
     * @method createPoster
     * @summary Used to generate an image to be used as poster.
     * @param {string} name User's name.
     * @returns Data URL as base64 of generated Image to used as poster.
     */
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
