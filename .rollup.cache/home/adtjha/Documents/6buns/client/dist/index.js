import { io } from "socket.io-client";
import debug from "debug";
import { EventEmitter } from "events";
const s = debug("Socket");
const p = debug("Peer");
const rp = debug("Remote");
class Bun extends EventEmitter {
    constructor({ apiKey, hasVideo, hasAudio, }) {
        super();
        this.join = async (room) => {
            this.room = room;
            await new Promise((resolve, reject) => {
                s("Joining Room");
                this.socket.emit("join-room", room, (peerList) => {
                    s("Room Joined", peerList);
                    if (peerList.length > 1) {
                        s("Peers List Recieved");
                        peerList.forEach((pid) => {
                            if (pid !== this.socket.id) {
                                try {
                                    this.peers.set(pid, new RTCPeerConnection({
                                        iceServers: this.iceServers,
                                    }));
                                }
                                catch (error) {
                                    throw new Error(error);
                                }
                                const newPeer = this.peers.get(pid);
                                p("Adding Tracks");
                                this.streams.getTracks().forEach((track) => {
                                    newPeer.addTrack(track, this.streams);
                                });
                                p("Tracks Added");
                                newPeer.ontrack = (event) => {
                                    const { to } = event.target;
                                    this.remoteStreams.set(to, event.streams);
                                    this.emit("new-remote-track", event);
                                };
                                newPeer.onicecandidate = (event) => {
                                    if (event.candidate) {
                                        p("ICE Candidate", event);
                                        const pe = event.currentTarget;
                                        this.socket.emit("data", {
                                            from: pe.from,
                                            to: pe.to,
                                            data: {
                                                candidate: event.candidate,
                                            },
                                        });
                                    }
                                };
                                newPeer.onnegotiationneeded = async (event) => {
                                    const pe = event.currentTarget;
                                    try {
                                        pe.makingOffer = true;
                                        p("Negotiation needed", event);
                                        const offer = await pe.createOffer();
                                        p("Offer Generated", offer);
                                        if (pe.signalingState != "stable")
                                            return;
                                        await pe.setLocalDescription(offer);
                                        p("Local Description Set", pe.localDescription);
                                        pe.socket.emit("data", {
                                            to: pe.to,
                                            from: pe.from,
                                            data: {
                                                sdp: pe.localDescription,
                                            },
                                        });
                                    }
                                    catch (error) {
                                        console.error(new Error(error));
                                    }
                                    finally {
                                        pe.makingOffer = false;
                                    }
                                };
                                newPeer.from = this.socket.id;
                                newPeer.to = pid;
                                newPeer.initiator = true;
                                newPeer.ignoreOffer = false;
                                newPeer.makingOffer = false;
                                newPeer.socket = this.socket;
                            }
                        });
                        p("Establishing Peer Connection to Remote Peer.");
                        resolve();
                    }
                });
            });
        };
        this.addMediaTrack = (track) => {
            this.streams.addTrack(track);
            if (this.peers.size > 0) {
                for (const [id, peer] of this.peers) {
                    peer.addTrack(track);
                }
            }
        };
        this.addMedia = (stream) => {
            stream.getTracks().forEach((track) => this.addMediaTrack(track));
            p("Added new Stream", this.peers);
        };
        this.removeMediaTrack = (track) => {
            for (const [id, peer] of this.peers) {
                peer.getSenders().forEach((rtpSender) => {
                    var _a;
                    if (((_a = rtpSender === null || rtpSender === void 0 ? void 0 : rtpSender.track) === null || _a === void 0 ? void 0 : _a.kind) === track.kind) {
                        peer.removeTrack(rtpSender);
                        this.socket.emit("track-update", {
                            id: peer.from,
                            update: "end",
                            room: this.room,
                        });
                    }
                });
            }
            this.streams.removeTrack(track);
        };
        this.removeMedia = (stream) => {
            stream.getTracks().forEach((track) => this.removeMediaTrack(track));
            p("Removed Stream", stream);
        };
        this.getMedia = (video, audio) => navigator.mediaDevices
            .getUserMedia({
            video,
            audio,
        })
            .then((stream) => {
            p(stream);
            this.addStream(stream);
            this.addMedia(stream);
        })
            .catch(console.error);
        this.screenShare = () => navigator.mediaDevices
            // @ts-ignore
            .getDisplayMedia({
            video: true,
            audio: true,
        })
            .then((stream) => {
            const track = stream.getVideoTracks()[0];
            p("Sharing Screen", track);
            track.onended = (ev) => {
                p("Stop Sharing Screen");
                this.emit("screen-share-ended", ev);
                this.switchToCam();
            };
            this.removeMedia(this.streams);
            this.addMedia(stream);
            this.addStream(stream);
        })
            .catch(console.error);
        this.switchToCam = () => {
            this.removeMedia(this.streams);
            this.getMedia(this.media.video, this.media.audio);
        };
        this.addStream = (stream) => {
            const video = document.querySelector(".self");
            video.srcObject = stream;
            video.onloadedmetadata = (ev) => {
                video.play();
            };
        };
        this.stopMedia = (mediaType, peerId) => {
            if (mediaType) {
                switch (mediaType) {
                    case "video":
                        this.streams.getVideoTracks().forEach((track) => {
                            this.removeMediaTrack(track);
                            const video = document.querySelector(".self");
                            video.srcObject = null;
                            track.stop();
                        });
                        break;
                    case "audio":
                        this.streams.getAudioTracks().forEach((track) => {
                            this.removeMediaTrack(track);
                            track.stop();
                        });
                        break;
                    case "screen":
                        this.streams.getVideoTracks().forEach((track) => {
                            this.removeMediaTrack(track);
                            track.stop();
                        });
                        break;
                    case "all":
                        this.streams.getTracks().forEach((track) => {
                            this.removeMediaTrack(track);
                            const video = document.querySelector(".self");
                            video.srcObject = null;
                            track.stop();
                        });
                        break;
                }
            }
            if (peerId) {
                this.peers
                    .get(peerId)
                    .getSenders()
                    .forEach((rtpSender) => {
                    var _a, _b;
                    if (mediaType) {
                        if (((_a = rtpSender === null || rtpSender === void 0 ? void 0 : rtpSender.track) === null || _a === void 0 ? void 0 : _a.kind) === mediaType)
                            rtpSender.track.stop();
                    }
                    else {
                        (_b = rtpSender === null || rtpSender === void 0 ? void 0 : rtpSender.track) === null || _b === void 0 ? void 0 : _b.stop();
                    }
                });
            }
        };
        this.createPoster = (name) => {
            let canv = document.createElement("canvas");
            canv.id = "canv";
            canv.height = 600;
            canv.width = 800;
            document.body.appendChild(canv);
            let canve = document.getElementById("canv");
            const ctx = canve.getContext("2d");
            ctx.fillStyle = "#1C1917";
            ctx.fillRect(0, 0, 800, 600);
            ctx.fillStyle = "#FAFAF9";
            ctx.textAlign = "center";
            ctx.font = "64px sans-serif";
            ctx.fillText(name, 400, 300);
            const uri = canv.toDataURL();
            document.body.removeChild(canv);
            return uri;
        };
        this.apiKey = apiKey;
        this.hasAudio = hasAudio || true;
        this.hasVideo = hasVideo || true;
        this.media = {
            video: this.hasVideo,
            audio: this.hasAudio,
        };
        this.getMedia(this.hasVideo, this.hasAudio);
        this.name = btoa(Math.random().toString()).substring(10, 5);
        this.poster = this.createPoster(this.name);
        this.streams = new MediaStream();
        this.room = "";
        this.buffer = 50;
        this.remoteStreams = new Map();
        this.peers = new Map();
        this.iceServers = [];
        this.socket = io("https://p2p.6buns.com", {
            transports: ["websocket", "polling"],
            auth: {
                key: this.apiKey,
            },
        });
        this.socket.on("connection", (id, users, iceServers) => {
            s("Socket Connected", { id, users, iceServers });
            this.iceServers = [...iceServers];
        });
        this.socket.on("new-peer-connected", (id) => {
            if (id !== this.socket.id) {
                s("New Peer Connected. Waiting for an offer");
                this.peers.set(id, new RTCPeerConnection({
                    iceServers: this.iceServers,
                }));
                const peer = this.peers.get(id);
                rp("Adding Tracks");
                this.streams.getTracks().forEach((track) => {
                    peer.addTrack(track, this.streams);
                });
                rp("Tracks Added");
                peer.ontrack = (event) => {
                    const { to } = event.target;
                    this.remoteStreams.set(to, event.streams);
                    this.emit("new-remote-track", event);
                };
                peer.onicecandidate = (event) => {
                    if (event.candidate) {
                        rp("ICE Candidate", event);
                        const pe = event.currentTarget;
                        this.socket.emit("data", {
                            from: pe.from,
                            to: pe.to,
                            data: {
                                candidate: event.candidate,
                            },
                        });
                    }
                };
                peer.onnegotiationneeded = async (event) => {
                    const pe = event.currentTarget;
                    try {
                        pe.makingOffer = true;
                        rp("Negotiation needed", event);
                        const offer = await pe.createOffer();
                        rp("Offer Generated", offer);
                        if (pe.signalingState != "stable")
                            return;
                        await pe.setLocalDescription(offer);
                        rp("Local Description Set", pe.localDescription);
                        pe.socket.emit("data", {
                            to: pe.to,
                            from: pe.from,
                            data: {
                                sdp: pe.localDescription,
                            },
                        });
                    }
                    catch (error) {
                        console.error(new Error(error));
                    }
                    finally {
                        pe.makingOffer = false;
                    }
                };
                peer.from = this.socket.id;
                peer.to = id;
                peer.initiator = false;
                peer.ignoreOffer = false;
                peer.makingOffer = false;
                peer.socket = this.socket;
            }
        });
        this.socket.on("data", async ({ to, from, data: { sdp, candidate } }) => {
            if (this.peers.has(from) && to === this.socket.id) {
                try {
                    const peer = this.peers.get(from);
                    if (sdp) {
                        const offerCollision = sdp.type === "offer" &&
                            (peer.makingOffer || peer.signalingState !== "stable");
                        peer.ignoreOffer = !peer.initiator && offerCollision;
                        if (peer.ignoreOffer)
                            return;
                        if (offerCollision) {
                            await Promise.all([
                                peer.setLocalDescription({ type: "rollback" }),
                                peer.setRemoteDescription(sdp),
                            ]);
                        }
                        else {
                            p("Answer Recieved", sdp);
                            await peer.setRemoteDescription(sdp);
                        }
                        if (sdp.type === "offer") {
                            const answer = await peer.createAnswer();
                            p("Answer Created", answer);
                            await peer.setLocalDescription(answer);
                            p("Local description set as answer", peer.localDescription);
                            this.socket.emit("data", {
                                to: from,
                                from: to,
                                data: {
                                    sdp: peer.localDescription,
                                },
                            });
                        }
                    }
                    else if (candidate) {
                        try {
                            await peer.addIceCandidate(candidate);
                            p("Added Ice Candidate", candidate);
                        }
                        catch (e) {
                            if (!peer.ignoreOffer)
                                p("Error adding IceCandidate", e);
                            else
                                p("Should be ignored", e, candidate, this.peers.has(from), to === this.socket.id);
                        }
                    }
                }
                catch (error) {
                    s("Socket Error", error);
                }
            }
        });
        this.socket.on("track-update", ({ id, update }) => {
            s("Track Update Recieved", id, update);
            switch (update) {
                case "mute":
                    this.emit("remote-peer-track-muted", id);
                    break;
                case "unmute":
                    this.emit("remote-peer-track-unmuted", id);
                    break;
                case "end":
                    this.emit("remote-peer-track-ended", id);
                    break;
                default:
                    break;
            }
        });
        this.socket.on("peer-disconneted", (id) => {
            let peer = this.peers.get(id);
            s("Socket Disconnected", peer);
            this.emit("peer-left", peer.to);
            peer.close();
            rp("Remote Peer Connection Closed");
            this.peers.delete(id);
            rp("Remote Peer Removed");
        });
    }
}
export default Bun;
//# sourceMappingURL=index.js.map