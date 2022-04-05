/// <reference types="node" />
import { Socket } from "socket.io-client";
import { EventEmitter } from "events";
declare class Bun extends EventEmitter {
    apiKey: String;
    hasVideo?: boolean;
    hasAudio?: boolean;
    media: {
        video: boolean;
        audio: boolean;
    };
    room: string;
    name: string;
    poster: string;
    buffer: number;
    socket: Socket;
    peers: Map<string, CustomPeerConnection>;
    iceServers: Array<RTCIceServer>;
    streams: MediaStream;
    remoteStreams: Map<string, readonly MediaStream[]>;
    constructor({ apiKey, hasVideo, hasAudio, }: {
        apiKey: string;
        hasVideo?: boolean;
        hasAudio?: boolean;
    });
    join: (room: string) => Promise<void>;
    addMediaTrack: (track: MediaStreamTrack) => void;
    addMedia: (stream: MediaStream) => void;
    removeMediaTrack: (track: MediaStreamTrack) => void;
    removeMedia: (stream: MediaStream) => void;
    getMedia: (video: boolean, audio: boolean) => Promise<void>;
    screenShare: () => Promise<void>;
    switchToCam: () => void;
    addStream: (stream: MediaStream) => void;
    stopMedia: (mediaType?: string | undefined, peerId?: string | undefined) => void;
    createPoster: (name: string) => string;
}
interface CustomPeerConnection extends RTCPeerConnection {
    from: string;
    to: string;
    initiator: boolean;
    ignoreOffer: boolean;
    makingOffer: boolean;
    socket: Socket;
}
export default Bun;
