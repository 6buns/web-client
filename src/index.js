"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var socket_io_client_1 = require("socket.io-client");
var debug_1 = require("debug");
var events_1 = require("events");
// ts-ignore
var s = (0, debug_1["default"])("Socket");
var p = (0, debug_1["default"])("Peer");
var rp = (0, debug_1["default"])("Remote");
/**
 * Initializes the Peer with auth variables, and media types.
 * @param {string} apiKey API key provided, is available on dashboard.
 * @param {boolean} hasVideo If true, peer to peer session has camera on.
 * @param {boolean} hasAudio If true, session has microphone on.
 */
var Bun = /** @class */ (function (_super) {
    __extends(Bun, _super);
    function Bun(_a) {
        var secret = _a.secret, room = _a.room, hasVideo = _a.hasVideo, hasAudio = _a.hasAudio;
        var _this = _super.call(this) || this;
        _this.handleMessage = function (_a) {
            var type = _a.type, from = _a.from, to = _a.to, room = _a.room, token = _a.token;
            return __awaiter(_this, void 0, void 0, function () {
                var data, error;
                return __generator(this, function (_b) {
                    // decode message using token
                    try {
                        data = this.decrypt(token);
                        if (data) {
                            // switch to event type
                            switch (type) {
                                // invoke required function
                                case "peer-connection-request": {
                                    this.onPeerConnectRequest({ from: from, to: to, data: data });
                                    break;
                                }
                                case "data": {
                                    this.handlePeerData({ from: from, to: to, data: data });
                                    break;
                                }
                                case "track-update": {
                                    this.handleTrackUpdate(data);
                                    break;
                                }
                                case "socket-update": {
                                    this.handleSocketUpdate(data);
                                    break;
                                }
                                case "error": {
                                    error = data.error;
                                    s("Socket Server Error", error);
                                    this.emit("error", error);
                                    break;
                                }
                                // case "ping": {
                                //   s(`PING from socket server.`);
                                //   const data = await this.getStats();
                                //   p(data);
                                //   // this.sendMessage("PONG", { data });
                                //   break;
                                // }
                                default: {
                                    s("Unknown Event Type", { type: type, from: from, to: to, room: room, data: data });
                                    break;
                                }
                            }
                        }
                    }
                    catch (error) {
                        // error in decoding
                        s("Token Decoding Error", error);
                    }
                    return [2 /*return*/];
                });
            });
        };
        _this.onPeerConnectRequest = function (_a) {
            var from = _a.from, to = _a.to, _b = _a.data, response = _b.response, peerName = _b.peerName;
            if (response) {
                _this.sendMessage("connection-request", {
                    from: to,
                    to: from,
                    data: {
                        response: false,
                        peerName: _this.name
                    }
                });
            }
            s("New Peer Connected. Waiting for an offer");
            _this.peers.set(peerName, new RTCPeerConnection({
                iceServers: _this.iceServers
            }));
            var peer = _this.peers.get(peerName);
            rp("Adding Tracks", _this.streams);
            _this.streams.getTracks().forEach(function (track) {
                peer.addTrack(track, _this.streams);
            });
            rp("Tracks Added");
            peer.ontrack = function (event) {
                var to = event.currentTarget.to;
                _this.remoteStreams.set(to.name, event.streams);
                _this.emit("new-remote-track", event);
            };
            peer.onicecandidate = function (event) {
                if (event.candidate) {
                    rp("ICE Candidate", event);
                    var pe = event.currentTarget;
                    _this.sendMessage("data", {
                        from: pe.from.socket,
                        to: pe.to.socket,
                        data: {
                            name: peer.from.name,
                            candidate: event.candidate
                        }
                    });
                }
            };
            peer.onnegotiationneeded = function (event) { return __awaiter(_this, void 0, void 0, function () {
                var pe, offer, error_1;
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
                            this.sendMessage("data", {
                                to: pe.to.socket,
                                from: pe.from.socket,
                                data: {
                                    name: pe.from.name,
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
            peer.ondatachannel = function (event) {
                _this.recieveDataChannels.set(peerName, event.channel);
                event.channel.onmessage = function (event) {
                    _this.emit("peer-data-recieved", event.data);
                    p("Recieve Data Channel Message Recieved : ", event.data);
                };
                event.channel.onopen = function (event) {
                    _this.emit("peer-data-open", event);
                    p("Recieve Data Channel Open : ", event);
                };
                event.channel.onclose = function (event) {
                    _this.emit("peer-data-closed", event);
                    p("Recieve Data Channel Closed : ", event);
                };
            };
            var sendChannel = peer.createDataChannel("sendChannel");
            sendChannel.onopen = function (event) {
                p("Send Data Channel Open : ", event);
            };
            sendChannel.onclose = function (event) {
                p("Send Data Channel Closed : ", event);
            };
            _this.sendDataChannels.set(peerName, sendChannel);
            peer.onconnectionstatechange = function (ev) {
                switch (peer.connectionState) {
                    case "new":
                    case "connecting":
                        rp("Connecting...");
                        break;
                    case "connected":
                        rp("Connected.");
                        _this.emit("new-peer", peer);
                        peer.checkConnection();
                        break;
                    case "disconnected":
                        rp("Disconnecting...");
                        peer.checkConnection();
                        break;
                    case "closed":
                        rp("Offline");
                        break;
                    case "failed":
                        rp("Error");
                        peer.checkConnection();
                        break;
                }
            };
            peer.checkConnection = function () {
                var connectionState = peer.connectionState, iceConnectionState = peer.iceConnectionState, iceGatheringState = peer.iceGatheringState, signalingState = peer.signalingState;
                if (connectionState === "connected" &&
                    iceConnectionState === "connected" &&
                    iceGatheringState === "complete" &&
                    signalingState === "stable") {
                    rp("Connection Established.");
                }
                else if ((connectionState === "disconnected" ||
                    connectionState === "closed" ||
                    connectionState === "failed") &&
                    (iceConnectionState === "disconnected" ||
                        iceConnectionState === "failed" ||
                        iceConnectionState === "closed")) {
                    rp("Error in Connection Establishment");
                    _this.emit("peer-left", peer.to.name);
                    _this.removePeer(peer.to.name);
                }
            };
            peer.from = {
                name: _this.name,
                socket: _this.socket.id
            };
            peer.to = {
                name: peerName,
                socket: from
            };
            peer.initiator = response;
            peer.ignoreOffer = false;
            peer.makingOffer = false;
            peer.socket = _this.socket;
            peer.poster = _this.createPoster(peerName);
        };
        _this.handlePeerData = function (_a) {
            var to = _a.to, from = _a.from, data = _a.data;
            return __awaiter(_this, void 0, void 0, function () {
                var name, sdp, candidate, peer, offerCollision, answer, e_1, error_2;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            name = data.name, sdp = data.sdp, candidate = data.candidate;
                            if (!(this.peers.has(name) && to === this.socket.id)) return [3 /*break*/, 15];
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 14, , 15]);
                            peer = this.peers.get(name);
                            p("Data recieved", { name: name, sdp: sdp, candidate: candidate });
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
                            _b.sent();
                            return [3 /*break*/, 5];
                        case 3:
                            p("Answer Recieved", sdp);
                            return [4 /*yield*/, peer.setRemoteDescription(sdp)];
                        case 4:
                            _b.sent();
                            _b.label = 5;
                        case 5:
                            if (!(sdp.type === "offer")) return [3 /*break*/, 8];
                            return [4 /*yield*/, peer.createAnswer()];
                        case 6:
                            answer = _b.sent();
                            p("Answer Created", answer);
                            return [4 /*yield*/, peer.setLocalDescription(answer)];
                        case 7:
                            _b.sent();
                            p("Local description set as answer", peer.localDescription);
                            this.sendMessage("data", {
                                to: from,
                                from: to,
                                data: {
                                    name: this.name,
                                    sdp: peer.localDescription
                                }
                            });
                            _b.label = 8;
                        case 8: return [3 /*break*/, 13];
                        case 9:
                            if (!candidate) return [3 /*break*/, 13];
                            _b.label = 10;
                        case 10:
                            _b.trys.push([10, 12, , 13]);
                            return [4 /*yield*/, peer.addIceCandidate(candidate)];
                        case 11:
                            _b.sent();
                            p("Added Ice Candidate", candidate);
                            return [3 /*break*/, 13];
                        case 12:
                            e_1 = _b.sent();
                            if (!peer.ignoreOffer)
                                p("Error adding IceCandidate", e_1);
                            else
                                p("Should be ignored", e_1, candidate, this.peers.has(name), to === this.socket.id);
                            return [3 /*break*/, 13];
                        case 13: return [3 /*break*/, 15];
                        case 14:
                            error_2 = _b.sent();
                            s("Socket Error", error_2);
                            return [3 /*break*/, 15];
                        case 15: return [2 /*return*/];
                    }
                });
            });
        };
        _this.handleTrackUpdate = function (_a) {
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
                    _this.remoteStreams
                        .get(id)
                        .forEach(function (mediaStream) { return mediaStream.getVideoTracks()[0].stop(); });
                    _this.emit("remote-peer-track-ended", id);
                    break;
                default:
                    break;
            }
        };
        _this.handleSocketUpdate = function (_a) {
            var id = _a.id, name = _a.name;
            var peer = _this.peers.get(name);
            peer.to.socket = id;
            s("Socket ID updated for peer.");
        };
        _this.getStatsData = function () {
            return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                var statsData, _loop_1, _i, _a, _b, id, peer;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            statsData = {};
                            _loop_1 = function (id, peer) {
                                var stats;
                                return __generator(this, function (_d) {
                                    switch (_d.label) {
                                        case 0:
                                            statsData[id] = {};
                                            return [4 /*yield*/, peer.getStats(null)];
                                        case 1:
                                            stats = _d.sent();
                                            stats.forEach(function (report) {
                                                statsData[id][report.type] = {
                                                    id: report.id,
                                                    timestamp: report.timestamp
                                                };
                                                Object.keys(report).forEach(function (statName) {
                                                    if (statName !== "id" &&
                                                        statName !== "timestamp" &&
                                                        statName !== "type") {
                                                        statsData[id][report.type][statName] = report[statName];
                                                    }
                                                });
                                            });
                                            return [2 /*return*/];
                                    }
                                });
                            };
                            _i = 0, _a = this.peers;
                            _c.label = 1;
                        case 1:
                            if (!(_i < _a.length)) return [3 /*break*/, 4];
                            _b = _a[_i], id = _b[0], peer = _b[1];
                            return [5 /*yield**/, _loop_1(id, peer)];
                        case 2:
                            _c.sent();
                            _c.label = 3;
                        case 3:
                            _i++;
                            return [3 /*break*/, 1];
                        case 4:
                            resolve(statsData);
                            return [2 /*return*/];
                    }
                });
            }); });
        };
        _this.sendMessage = function (type, _a, func) {
            var from = _a.from, to = _a.to, room = _a.room, data = _a.data;
            return __awaiter(_this, void 0, void 0, function () {
                var token;
                return __generator(this, function (_b) {
                    token = this.crypt(data);
                    this.socket.emit("message", { type: type, from: from, to: to, room: room, token: token }, func);
                    return [2 /*return*/];
                });
            });
        };
        /**
         * Join the room with the provided room_id.
         */
        _this.join = function () { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Promise(function (resolve, reject) {
                            s("Joining Room");
                            _this.sendMessage("room-join", { room: _this.room, data: { name: _this.name } }, function (_a) {
                                var res = _a.res, room = _a.room, error = _a.error;
                                if (error) {
                                    _this.emit("error", error);
                                    s("Room Join Error", error);
                                }
                                else if (res) {
                                    _this.room = room;
                                    s("Room Joined", res);
                                    if (res.length > 1) {
                                        _this.emit("room-joined", { res: res, room: room });
                                        s("Peers List Recieved");
                                        res.forEach(function (pid) {
                                            if (pid !== _this.socket.id) {
                                                _this.sendMessage("connection-request", {
                                                    from: _this.socket.id,
                                                    to: pid,
                                                    data: {
                                                        response: true,
                                                        peerName: _this.name
                                                    }
                                                });
                                            }
                                        });
                                        p("Establishing Peer Connection to Remote Peer.");
                                        resolve();
                                    }
                                }
                            });
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        _this.startMedia = function (start) { return __awaiter(_this, void 0, void 0, function () {
            var stream;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getMedia()];
                    case 1:
                        stream = (_a.sent());
                        this.addStream(stream);
                        if (start) {
                            this.streams = stream;
                        }
                        else {
                            this.streams = stream;
                            this.replaceMedia(stream);
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        _this.getMedia = function () {
            return new Promise(function (resolve, reject) {
                navigator.mediaDevices
                    .getUserMedia({
                    video: _this.media.video,
                    audio: _this.media.audio
                })
                    .then(function (stream) {
                    p(stream);
                    resolve(stream);
                })["catch"](reject);
            });
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
                track.onended = function (ev) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        p("Stop Sharing Screen");
                        this.emit("screen-share-ended", ev);
                        this.replaceMedia(this.streams);
                        this.addStream(this.streams);
                        return [2 /*return*/];
                    });
                }); };
                _this.replaceMedia(stream);
                _this.addStream(stream);
            })["catch"](function (e) {
                _this.emit("screen-share-error", e);
                console.error(e);
            });
        };
        _this.addStream = function (stream) {
            var video = document.querySelector(".self");
            video.srcObject = stream;
            video.onloadedmetadata = function (ev) {
                video.play();
            };
        };
        _this.toggleMedia = function (mediaType, peerId) {
            if (mediaType) {
                switch (mediaType) {
                    case "video":
                        _this.streams.getVideoTracks().forEach(function (track) {
                            track.enabled = !track.enabled;
                        });
                        break;
                    case "audio":
                        _this.streams.getAudioTracks().forEach(function (track) {
                            track.enabled = !track.enabled;
                        });
                        break;
                    case "all":
                        _this.streams.getTracks().forEach(function (track) {
                            track.enabled = !track.enabled;
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
        _this.getLocalMedia = function (id) {
            return _this.peers.get(id).getLocalStream();
        };
        _this.getRemoteStream = function (id) {
            return _this.peers.get(id).getRemoteStream();
        };
        /**
         * Replace Media Track
         *
         * @param track
         * @param id
         * @returns
         */
        _this.replaceMediaTrack = function (track, id) {
            if (id) {
                _this.peers
                    .get(id)
                    .getSenders()
                    .forEach(function (rtpSender) {
                    var _a;
                    if (((_a = rtpSender === null || rtpSender === void 0 ? void 0 : rtpSender.track) === null || _a === void 0 ? void 0 : _a.kind) === track.kind) {
                        track.enabled = true;
                        rtpSender.replaceTrack(track);
                    }
                });
            }
            else {
                for (var _i = 0, _a = _this.peers; _i < _a.length; _i++) {
                    var _b = _a[_i], id_1 = _b[0], peer = _b[1];
                    peer.getSenders().forEach(function (rtpSender) {
                        var _a;
                        if (((_a = rtpSender === null || rtpSender === void 0 ? void 0 : rtpSender.track) === null || _a === void 0 ? void 0 : _a.kind) === track.kind) {
                            rtpSender.replaceTrack(track);
                        }
                    });
                }
            }
        };
        _this.replaceMedia = function (media, id) {
            return new Promise(function (resolve, reject) {
                try {
                    if (id) {
                        for (var _i = 0, _a = media.getTracks(); _i < _a.length; _i++) {
                            var track = _a[_i];
                            id
                                ? _this.replaceMediaTrack(track, id)
                                : _this.replaceMediaTrack(track);
                            p("Replacing Track", track, id);
                        }
                    }
                    else {
                        for (var _b = 0, _c = _this.peers; _b < _c.length; _b++) {
                            var _d = _c[_b], id_2 = _d[0], peer = _d[1];
                            if (peer.getSenders().length > 0) {
                                for (var _e = 0, _f = media.getTracks(); _e < _f.length; _e++) {
                                    var track = _f[_e];
                                    _this.replaceMediaTrack(track, id_2);
                                    p("Replacing Track", track, id_2);
                                }
                            }
                        }
                    }
                    resolve(true);
                }
                catch (error) {
                    reject(error);
                }
            });
        };
        _this.addMediaTrack = function (track, id) {
            _this.streams.addTrack(track);
            if (id) {
                _this.peers.get(id).addTrack(track);
            }
            else {
                if (_this.peers.size > 0) {
                    for (var _i = 0, _a = _this.peers; _i < _a.length; _i++) {
                        var _b = _a[_i], id_3 = _b[0], peer = _b[1];
                        peer.addTrack(track);
                    }
                }
            }
        };
        _this.addMedia = function (stream, id) {
            stream
                .getTracks()
                .forEach(function (track) {
                return id ? _this.addMediaTrack(track, id) : _this.addMediaTrack(track);
            });
            p("Added new Stream", _this.peers);
        };
        _this.removeMediaTrack = function (track) {
            var _loop_2 = function (id, peer) {
                peer.getSenders().forEach(function (rtpSender) {
                    var _a;
                    if (((_a = rtpSender === null || rtpSender === void 0 ? void 0 : rtpSender.track) === null || _a === void 0 ? void 0 : _a.kind) === track.kind) {
                        peer.removeTrack(rtpSender);
                        s("Track Update Request Sent.");
                        _this.sendMessage("track-update", {
                            room: _this.room,
                            data: {
                                id: peer.from.name,
                                update: "end"
                            }
                        });
                    }
                });
            };
            for (var _i = 0, _a = _this.peers; _i < _a.length; _i++) {
                var _b = _a[_i], id = _b[0], peer = _b[1];
                _loop_2(id, peer);
            }
            _this.streams.removeTrack(track);
        };
        _this.removeMedia = function (stream) {
            stream.getTracks().forEach(function (track) { return _this.removeMediaTrack(track); });
            p("Removed Stream", stream);
        };
        _this.sendData = function (message, id, type) {
            if (id) {
                _this.sendDataChannels.get(id).send(message);
            }
            else {
                for (var _i = 0, _a = _this.sendDataChannels; _i < _a.length; _i++) {
                    var _b = _a[_i], id_4 = _b[0], sendChannel = _b[1];
                    sendChannel.send(message);
                }
            }
        };
        _this.removePeer = function (id) {
            var peer = _this.peers.get(id);
            peer.close();
            rp("Remote Peer Connection Closed");
            _this.peers["delete"](id);
            rp("Remote Peer Removed");
            _this.remoteStreams["delete"](id);
            rp("Remote Peer Stream Removed");
        };
        _this.close = function () {
            for (var _i = 0, _a = _this.peers; _i < _a.length; _i++) {
                var _b = _a[_i], id = _b[0], peer = _b[1];
                _this.removePeer(id);
            }
        };
        _this.secret = secret;
        _this.hasAudio = hasAudio || true;
        _this.hasVideo = hasVideo || true;
        _this.media = {
            video: _this.hasVideo,
            audio: _this.hasAudio
        };
        _this.streams = new MediaStream();
        _this.startMedia(true);
        _this.name = btoa(Math.random().toString()).substring(10, 5);
        _this.poster = _this.createPoster(_this.name);
        _this.room = room || "";
        _this.buffer = 50;
        _this.remoteStreams = new Map();
        _this.sendDataChannels = new Map();
        _this.recieveDataChannels = new Map();
        _this.peers = new Map();
        _this.iceServers = [];
        _this.id = btoa(Math.random().toString())
            .substring(16, 4)
            .split("")
            .map(function (x) {
            return "-_0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"[~~(64 * Math.random())];
        })
            .join("");
        _this.socket = (0, socket_io_client_1.io)("https://p2p.6buns.com", {
            transports: ["websocket", "polling"],
            auth: {
                key: _this.secret
            }
        });
        _this.socket.on("connection", function (id, users, iceServers) {
            s("Socket Connected", { id: id, users: users, iceServers: iceServers });
            _this.iceServers = __spreadArray([], iceServers, true);
            if (_this.peers.size > 0) {
                _this.sendMessage("update-socket-id", {
                    room: _this.room,
                    data: {
                        id: _this.socket.id,
                        name: _this.name
                    }
                });
            }
            else {
                _this.join();
            }
        });
        _this.socket.on("message", function (_a) {
            var type = _a.type, from = _a.from, to = _a.to, room = _a.room, token = _a.token;
            return _this.handleMessage({ type: type, from: from, to: to, room: room, token: token });
        });
        _this.socket.on("peer-disconnected", function (id) {
            s("Socket Disconnected", id);
            _this.removePeer(id);
        });
        return _this;
    }
    Bun.prototype.crypt = function (obj) {
        var text = JSON.stringify(obj);
        return btoa(text);
    };
    Bun.prototype.decrypt = function (encoded) {
        return JSON.parse(atob(encoded));
    };
    return Bun;
}(events_1.EventEmitter));
exports["default"] = Bun;
