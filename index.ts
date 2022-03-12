import { io, Socket, SocketOptions } from "socket.io-client";
import debug from "debug";
import { config } from "./src/config";
import EventEmitter from "events";

const s: debug.Debugger = debug("Socket");
const p: debug.Debugger = debug("Peer");
const rp: debug.Debugger = debug("Remote");

class Bun extends EventEmitter {
  apiKey: String;
  hasVideo?: boolean;
  hasAudio?: boolean;
  room: string;
  socket: Socket;
  peers: Map<string, CustomPeerConnection>;
  iceServers: Array<{
    urls: [];
  }>;
  streams: MediaStream;
  remoteStreams: Map<string, MediaStream>

  constructor({ apiKey, hasVideo, hasAudio }) {
    super();
  }

  join = async (room: string) => {
    this.room = room;

    await new Promise<void>((resolve, reject) => {
      s("Joining Room");
      this.socket.emit("join-room", room, (peerList: Array<keyof Socket>) => {
        s("Room Joined", peerList);
        if (peerList.length > 1) {
          s("Peers List Recieved");
          peerList.forEach((pid) => {
            if (pid !== this.socket.id) {
              this.peers.set(
                pid,
                new CustomPeerConnection(
                  {
                    iceServers: this.iceServers,
                  },
                  {
                    from: this.socket.id,
                    to: pid,
                    initiator: true,
                    ignoreOffer: false,
                    socket: this.socket,
                  }
                )
              );

              const newPeer = this.peers.get(pid);

              rp("Adding Tracks");
              this.streams.getTracks().forEach((track) => {
                newPeer.addTrack(track, this.streams);
              });
              rp("Tracks Added");

              newPeer.ontrack = (event) => {
                //   this.remoteStreams.set(event.target, event.streams)
              }
            }
          });
          rp("Establishing Peer Connection to Remote Peer.");
          resolve();
        }
      });
    });
  };
}

class CustomPeerConnection extends RTCPeerConnection {
  from: string;
  to: string;
  initiator: boolean;
  ignoreOffer: boolean;
  socket: Socket;

  constructor(options: object, { from, to, initiator, ignoreOffer, socket }) {
    super(options);
    this.from = from;
    this.to = to;
    this.initiator = initiator;
    this.ignoreOffer = ignoreOffer;
    this.socket = socket;

    this.onicecandidate = (event: RTCPeerConnectionIceEvent) => {
      if (event.candidate) {
        rp("ICE Candidate", event);
        this.socket.emit("data", {
          from: this.to,
          to: this.to,
          data: {
            candidate: event.candidate,
          },
        });
      }
    };
  }
}
