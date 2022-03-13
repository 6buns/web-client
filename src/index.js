"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
exports.__esModule = true;
var socket_io_client_1 = require("socket.io-client");
var debug_1 = require("debug");
var events_1 = require("events");
var s = debug_1["default"]("Socket");
var p = debug_1["default"]("Peer");
var rp = debug_1["default"]("Remote");
var Bun = /** @class */ (function (_super) {
    __extends(Bun, _super);
    function Bun(_a) {
        var apiKey = _a.apiKey, hasVideo = _a.hasVideo, hasAudio = _a.hasAudio;
        var _this = _super.call(this) || this;
        _this.join = function (room) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.room = room;
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                s("Joining Room");
                                _this.socket.emit("join-room", room, function (peerList) {
                                    s("Room Joined", peerList);
                                    if (peerList.length > 1) {
                                        s("Peers List Recieved");
                                        peerList.forEach(function (pid) {
                                            if (pid !== _this.socket.id) {
                                                try {
                                                    _this.peers.set(pid, new RTCPeerConnection({
                                                        iceServers: _this.iceServers
                                                    }));
                                                }
                                                catch (error) {
                                                    throw new Error(error);
                                                }
                                                var newPeer_1 = _this.peers.get(pid);
                                                p("Adding Tracks");
                                                _this.streams.getTracks().forEach(function (track) {
                                                    newPeer_1.addTrack(track, _this.streams);
                                                });
                                                p("Tracks Added");
                                                newPeer_1.ontrack = function (event) {
                                                    var to = event.target.to;
                                                    _this.remoteStreams.set(to, event.streams);
                                                    _this.emit("new-remote-track", event);
                                                };
                                                newPeer_1.onicecandidate = function (event) {
                                                    if (event.candidate) {
                                                        p("ICE Candidate", event);
                                                        var pe = event.currentTarget;
                                                        _this.socket.emit("data", {
                                                            from: pe.from,
                                                            to: pe.to,
                                                            data: {
                                                                candidate: event.candidate
                                                            }
                                                        });
                                                    }
                                                };
                                                newPeer_1.onnegotiationneeded = function (event) { return __awaiter(_this, void 0, void 0, function () {
                                                    var pe, offer, error_1;
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0:
                                                                pe = event.currentTarget;
                                                                _a.label = 1;
                                                            case 1:
                                                                _a.trys.push([1, 4, 5, 6]);
                                                                pe.makingOffer = true;
                                                                p("Negotiation needed", event);
                                                                return [4 /*yield*/, pe.createOffer()];
                                                            case 2:
                                                                offer = _a.sent();
                                                                p("Offer Generated", offer);
                                                                if (pe.signalingState != "stable")
                                                                    return [2 /*return*/];
                                                                return [4 /*yield*/, pe.setLocalDescription(offer)];
                                                            case 3:
                                                                _a.sent();
                                                                p("Local Description Set", pe.localDescription);
                                                                pe.socket.emit("data", {
                                                                    to: pe.to,
                                                                    from: pe.from,
                                                                    data: {
                                                                        sdp: pe.localDescription
                                                                    }
                                                                });
                                                                return [3 /*break*/, 6];
                                                            case 4:
                                                                error_1 = _a.sent();
                                                                console.error(new Error(error_1));
                                                                return [3 /*break*/, 6];
                                                            case 5:
                                                                pe.makingOffer = false;
                                                                return [7 /*endfinally*/];
                                                            case 6: return [2 /*return*/];
                                                        }
                                                    });
                                                }); };
                                                newPeer_1.from = _this.socket.id;
                                                newPeer_1.to = pid;
                                                newPeer_1.initiator = true;
                                                newPeer_1.ignoreOffer = false;
                                                newPeer_1.makingOffer = false;
                                                newPeer_1.socket = _this.socket;
                                            }
                                        });
                                        p("Establishing Peer Connection to Remote Peer.");
                                        resolve();
                                    }
                                });
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        _this.addMediaTrack = function (track) {
            var e_1, _a;
            _this.streams.addTrack(track);
            if (_this.peers.size > 0) {
                try {
                    for (var _b = __values(_this.peers), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var _d = __read(_c.value, 2), id = _d[0], peer = _d[1];
                        peer.addTrack(track);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
        };
        _this.addMedia = function (stream) {
            stream.getTracks().forEach(function (track) { return _this.addMediaTrack(track); });
            p("Added new Stream", _this.peers);
        };
        _this.removeMediaTrack = function (track) {
            var e_2, _a;
            var _loop_1 = function (id, peer) {
                peer.getSenders().forEach(function (rtpSender) {
                    var _a;
                    if (((_a = rtpSender === null || rtpSender === void 0 ? void 0 : rtpSender.track) === null || _a === void 0 ? void 0 : _a.kind) === track.kind) {
                        peer.removeTrack(rtpSender);
                        _this.socket.emit("track-update", {
                            id: peer.from,
                            update: "end",
                            room: _this.room
                        });
                    }
                });
            };
            try {
                for (var _b = __values(_this.peers), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var _d = __read(_c.value, 2), id = _d[0], peer = _d[1];
                    _loop_1(id, peer);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
            _this.streams.removeTrack(track);
        };
        _this.removeMedia = function (stream) {
            stream.getTracks().forEach(function (track) { return _this.removeMediaTrack(track); });
            p("Removed Stream", stream);
        };
        _this.getMedia = function (video, audio) {
            return navigator.mediaDevices
                .getUserMedia({
                video: video,
                audio: audio
            })
                .then(function (stream) {
                p(stream);
                _this.addStream(stream);
                _this.addMedia(stream);
            })["catch"](console.error);
        };
        _this.screenShare = function () {
            return navigator.mediaDevices
                // @ts-ignore
                .getDisplayMedia({
                video: true,
                audio: true
            })
                .then(function (stream) {
                var track = stream.getVideoTracks()[0];
                p("Sharing Screen", track);
                track.onended = function (ev) {
                    p("Stop Sharing Screen");
                    _this.emit("screen-share-ended", ev);
                    _this.switchToCam();
                };
                _this.removeMedia(_this.streams);
                _this.addMedia(stream);
                _this.addStream(stream);
            })["catch"](console.error);
        };
        _this.switchToCam = function () {
            _this.removeMedia(_this.streams);
            _this.getMedia(_this.media.video, _this.media.audio);
        };
        _this.addStream = function (stream) {
            var video = document.querySelector(".self");
            video.srcObject = stream;
            video.onloadedmetadata = function (ev) {
                video.play();
            };
        };
        _this.stopMedia = function (mediaType, peerId) {
            if (mediaType) {
                switch (mediaType) {
                    case "video":
                        _this.streams.getVideoTracks().forEach(function (track) {
                            _this.removeMediaTrack(track);
                            var video = document.querySelector(".self");
                            video.srcObject = null;
                            track.stop();
                        });
                        break;
                    case "audio":
                        _this.streams.getAudioTracks().forEach(function (track) {
                            _this.removeMediaTrack(track);
                            track.stop();
                        });
                        break;
                    case "screen":
                        _this.streams.getVideoTracks().forEach(function (track) {
                            _this.removeMediaTrack(track);
                            track.stop();
                        });
                        break;
                    case "all":
                        _this.streams.getTracks().forEach(function (track) {
                            _this.removeMediaTrack(track);
                            var video = document.querySelector(".self");
                            video.srcObject = null;
                            track.stop();
                        });
                        break;
                }
            }
            if (peerId) {
                _this.peers
                    .get(peerId)
                    .getSenders()
                    .forEach(function (rtpSender) {
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
        _this.createPoster = function (name) {
            var canv = document.createElement("canvas");
            canv.id = "canv";
            canv.height = 600;
            canv.width = 800;
            document.body.appendChild(canv);
            var canve = document.getElementById("canv");
            var ctx = canve.getContext("2d");
            ctx.fillStyle = "#1C1917";
            ctx.fillRect(0, 0, 800, 600);
            ctx.fillStyle = "#FAFAF9";
            ctx.textAlign = "center";
            ctx.font = "64px sans-serif";
            ctx.fillText(name, 400, 300);
            var uri = canv.toDataURL();
            document.body.removeChild(canv);
            return uri;
        };
        _this.apiKey = apiKey;
        _this.hasAudio = hasAudio || true;
        _this.hasVideo = hasVideo || true;
        _this.media = {
            video: _this.hasVideo,
            audio: _this.hasAudio
        };
        _this.getMedia(_this.hasVideo, _this.hasAudio);
        _this.name = btoa(Math.random().toString()).substring(10, 5);
        _this.poster = _this.createPoster(_this.name);
        _this.streams = new MediaStream();
        _this.room = "";
        _this.buffer = 50;
        _this.remoteStreams = new Map();
        _this.peers = new Map();
        _this.iceServers = [];
        _this.socket = socket_io_client_1.io("https://p2p.6buns.com/", {
            transports: ["websocket", "polling"],
            auth: {
                key: _this.apiKey
            }
        });
        _this.socket.on("connection", function (id, users, iceServers) {
            s("Socket Connected", { id: id, users: users, iceServers: iceServers });
            _this.iceServers = __spread(iceServers);
        });
        _this.socket.on("new-peer-connected", function (id) {
            if (id !== _this.socket.id) {
                s("New Peer Connected. Waiting for an offer");
                _this.peers.set(id, new RTCPeerConnection({
                    iceServers: _this.iceServers
                }));
                var peer_1 = _this.peers.get(id);
                rp("Adding Tracks");
                _this.streams.getTracks().forEach(function (track) {
                    peer_1.addTrack(track, _this.streams);
                });
                rp("Tracks Added");
                peer_1.ontrack = function (event) {
                    var to = event.target.to;
                    _this.remoteStreams.set(to, event.streams);
                    _this.emit("new-remote-track", event);
                };
                peer_1.onicecandidate = function (event) {
                    if (event.candidate) {
                        rp("ICE Candidate", event);
                        var pe = event.currentTarget;
                        _this.socket.emit("data", {
                            from: pe.from,
                            to: pe.to,
                            data: {
                                candidate: event.candidate
                            }
                        });
                    }
                };
                peer_1.onnegotiationneeded = function (event) { return __awaiter(_this, void 0, void 0, function () {
                    var pe, offer, error_2;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                pe = event.currentTarget;
                                _a.label = 1;
                            case 1:
                                _a.trys.push([1, 4, 5, 6]);
                                pe.makingOffer = true;
                                rp("Negotiation needed", event);
                                return [4 /*yield*/, pe.createOffer()];
                            case 2:
                                offer = _a.sent();
                                rp("Offer Generated", offer);
                                if (pe.signalingState != "stable")
                                    return [2 /*return*/];
                                return [4 /*yield*/, pe.setLocalDescription(offer)];
                            case 3:
                                _a.sent();
                                rp("Local Description Set", pe.localDescription);
                                pe.socket.emit("data", {
                                    to: pe.to,
                                    from: pe.from,
                                    data: {
                                        sdp: pe.localDescription
                                    }
                                });
                                return [3 /*break*/, 6];
                            case 4:
                                error_2 = _a.sent();
                                console.error(new Error(error_2));
                                return [3 /*break*/, 6];
                            case 5:
                                pe.makingOffer = false;
                                return [7 /*endfinally*/];
                            case 6: return [2 /*return*/];
                        }
                    });
                }); };
                peer_1.from = _this.socket.id;
                peer_1.to = id;
                peer_1.initiator = false;
                peer_1.ignoreOffer = false;
                peer_1.makingOffer = false;
                peer_1.socket = _this.socket;
            }
        });
        _this.socket.on("data", function (_a) {
            var to = _a.to, from = _a.from, _b = _a.data, sdp = _b.sdp, candidate = _b.candidate;
            return __awaiter(_this, void 0, void 0, function () {
                var peer, offerCollision, answer, e_3, error_3;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            if (!(this.peers.has(from) && to === this.socket.id)) return [3 /*break*/, 15];
                            _c.label = 1;
                        case 1:
                            _c.trys.push([1, 14, , 15]);
                            peer = this.peers.get(from);
                            if (!sdp) return [3 /*break*/, 9];
                            offerCollision = sdp.type === "offer" &&
                                (peer.makingOffer || peer.signalingState !== "stable");
                            peer.ignoreOffer = !peer.initiator && offerCollision;
                            if (peer.ignoreOffer)
                                return [2 /*return*/];
                            if (!offerCollision) return [3 /*break*/, 3];
                            return [4 /*yield*/, Promise.all([
                                    peer.setLocalDescription({ type: "rollback" }),
                                    peer.setRemoteDescription(sdp),
                                ])];
                        case 2:
                            _c.sent();
                            return [3 /*break*/, 5];
                        case 3:
                            p("Answer Recieved", sdp);
                            return [4 /*yield*/, peer.setRemoteDescription(sdp)];
                        case 4:
                            _c.sent();
                            _c.label = 5;
                        case 5:
                            if (!(sdp.type === "offer")) return [3 /*break*/, 8];
                            return [4 /*yield*/, peer.createAnswer()];
                        case 6:
                            answer = _c.sent();
                            p("Answer Created", answer);
                            return [4 /*yield*/, peer.setLocalDescription(answer)];
                        case 7:
                            _c.sent();
                            p("Local description set as answer", peer.localDescription);
                            this.socket.emit("data", {
                                to: from,
                                from: to,
                                data: {
                                    sdp: peer.localDescription
                                }
                            });
                            _c.label = 8;
                        case 8: return [3 /*break*/, 13];
                        case 9:
                            if (!candidate) return [3 /*break*/, 13];
                            _c.label = 10;
                        case 10:
                            _c.trys.push([10, 12, , 13]);
                            return [4 /*yield*/, peer.addIceCandidate(candidate)];
                        case 11:
                            _c.sent();
                            p("Added Ice Candidate", candidate);
                            return [3 /*break*/, 13];
                        case 12:
                            e_3 = _c.sent();
                            if (!peer.ignoreOffer)
                                p("Error adding IceCandidate", e_3);
                            else
                                p("Should be ignored", e_3, candidate, this.peers.has(from), to === this.socket.id);
                            return [3 /*break*/, 13];
                        case 13: return [3 /*break*/, 15];
                        case 14:
                            error_3 = _c.sent();
                            s("Socket Error", error_3);
                            return [3 /*break*/, 15];
                        case 15: return [2 /*return*/];
                    }
                });
            });
        });
        _this.socket.on("track-update", function (_a) {
            var id = _a.id, update = _a.update;
            s("Track Update Recieved", id, update);
            switch (update) {
                case "mute":
                    _this.emit("remote-peer-track-muted", id);
                    break;
                case "unmute":
                    _this.emit("remote-peer-track-unmuted", id);
                    break;
                case "end":
                    _this.emit("remote-peer-track-ended", id);
                    break;
                default:
                    break;
            }
        });
        _this.socket.on("peer-disconneted", function (id) {
            var peer = _this.peers.get(id);
            s("Socket Disconnected", peer);
            _this.emit("peer-left", peer.to);
            peer.close();
            rp("Remote Peer Connection Closed");
            _this.peers["delete"](id);
            rp("Remote Peer Removed");
        });
        return _this;
    }
    return Bun;
}(events_1.EventEmitter));
exports["default"] = Bun;
