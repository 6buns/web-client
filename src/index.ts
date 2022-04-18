import { io, Socket } from "socket.io-client";
import debug from "debug";
import { EventEmitter } from "events";
// ts-ignore

const s: debug.Debugger = debug("Socket");
const p: debug.Debugger = debug("Peer");
const rp: debug.Debugger = debug("Remote");

/**
 * Initializes the Peer with auth variables, and media types.
 * @param {string} apiKey API key provided, is available on dashboard.
 * @param {boolean} hasVideo If true, peer to peer session has camera on.
 * @param {boolean} hasAudio If true, session has microphone on.
 */
class Bun extends EventEmitter {
  secret: string;
  hasVideo?: boolean;
  hasAudio?: boolean;
  media: { video: boolean; audio: boolean };
  room: string;
  name: string;
  poster: string;
  buffer: number;
  socket: Socket;
  peers: Map<string, CustomPeerConnection>;
  iceServers: Array<RTCIceServer>;
  streams: MediaStream;
  remoteStreams: Map<string, readonly MediaStream[]>;
  sendDataChannels: Map<string, RTCDataChannel>;
  recieveDataChannels: Map<string, RTCDataChannel>;
  id: string;

  constructor({
    secret,
    room,
    hasVideo,
    hasAudio,
  }: {
    secret: string;
    room: string;
    hasVideo?: boolean;
    hasAudio?: boolean;
  }) {
    super();
    this.secret = secret;
    this.hasAudio = hasAudio || true;
    this.hasVideo = hasVideo || true;
    this.media = {
      video: this.hasVideo,
      audio: this.hasAudio,
    };
    this.streams = new MediaStream();
    this.startMedia(true);
    this.name = btoa(Math.random().toString()).substring(10, 5);
    this.poster = this.createPoster(this.name);
    this.room = room || "";
    this.buffer = 50;
    this.remoteStreams = new Map();
    this.sendDataChannels = new Map();
    this.recieveDataChannels = new Map();
    this.peers = new Map();
    this.iceServers = [];
    this.id = btoa(Math.random().toString())
      .substring(16, 4)
      .split("")
      .map(
        (x) =>
          "-_0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"[
            ~~(64 * Math.random())
          ]
      )
      .join("");

    this.socket = io("https://p2p.6buns.com", {
      transports: ["websocket", "polling"],
      auth: {
        key: this.secret,
      },
    });

    this.socket.on(
      "connection",
      (id: string, users: number, iceServers: Array<RTCIceServer>) => {
        s("Socket Connected", { id, users, iceServers });
        this.iceServers = [...iceServers];

        if (this.peers.size > 0) {
          this.sendMessage("update-socket-id", {
            room: this.room,
            data: {
              id: this.socket.id,
              name: this.name,
            },
          });
        } else {
          this.join();
        }
      }
    );

    this.socket.on("message", ({ type, from, to, room, token }) =>
      this.handleMessage({ type, from, to, room, token })
    );

    this.socket.on("peer-disconnected", (id) => {
      s("Socket Disconnected", id);
      this.removePeer(id);
    });
  }

  handleMessage = async ({ type, from, to, room, token }) => {
    // decode message using token
    try {
      const data: any = this.decrypt(token);
      if (data) {
        // switch to event type
        switch (type) {
          // invoke required function
          case "peer-connection-request": {
            this.onPeerConnectRequest({ from, to, data });
            break;
          }
          case "data": {
            this.handlePeerData({ from, to, data });
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
            const { error } = data;
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
            s("Unknown Event Type", { type, from, to, room, data });
            break;
          }
        }
      }
    } catch (error) {
      // error in decoding
      s("Token Decoding Error", error);
    }
  };

  onPeerConnectRequest = ({ from, to, data: { response, peerName } }) => {
    if (response) {
      this.sendMessage("connection-request", {
        from: to,
        to: from,
        data: {
          response: false,
          peerName: this.name,
        },
      });
    }

    s("New Peer Connected. Waiting for an offer");
    this.peers.set(
      peerName,
      new RTCPeerConnection({
        iceServers: this.iceServers,
      }) as CustomPeerConnection
    );

    const peer = this.peers.get(peerName);

    rp("Adding Tracks", this.streams);
    this.streams.getTracks().forEach((track) => {
      peer.addTrack(track, this.streams);
    });
    rp("Tracks Added");

    peer.ontrack = (event: CustomPeerConnectionTrackEvent<RTCTrackEvent>) => {
      const { to } = event.currentTarget as CustomPeerConnection;
      this.remoteStreams.set(to.name, event.streams);
      this.emit("new-remote-track", event);
    };

    peer.onicecandidate = (event: CustomPeerConnectionIceEvent) => {
      if (event.candidate) {
        rp("ICE Candidate", event);
        const pe = event.currentTarget as CustomPeerConnection;
        this.sendMessage("data", {
          from: pe.from.socket,
          to: pe.to.socket,
          data: {
            name: peer.from.name,
            candidate: event.candidate,
          },
        });
      }
    };

    peer.onnegotiationneeded = async (event: Event) => {
      const pe = event.currentTarget as CustomPeerConnection;
      try {
        pe.makingOffer = true;
        rp("Negotiation needed", event);

        const offer = await pe.createOffer();
        rp("Offer Generated", offer);

        if (pe.signalingState != "stable") return;

        await pe.setLocalDescription(offer);
        rp("Local Description Set", pe.localDescription);

        this.sendMessage("data", {
          to: pe.to.socket,
          from: pe.from.socket,
          data: {
            name: pe.from.name,
            sdp: pe.localDescription,
          },
        });
      } catch (error) {
        console.error(new Error(error));
      } finally {
        pe.makingOffer = false;
      }
    };

    peer.ondatachannel = (event: RTCDataChannelEvent) => {
      this.recieveDataChannels.set(peerName, event.channel);

      event.channel.onmessage = (event: MessageEvent) => {
        this.emit("peer-data-recieved", event.data);
        p("Recieve Data Channel Message Recieved : ", event.data);
      };

      event.channel.onopen = (event: Event) => {
        this.emit("peer-data-open", event);
        p("Recieve Data Channel Open : ", event);
      };

      event.channel.onclose = (event: Event) => {
        this.emit("peer-data-closed", event);
        p("Recieve Data Channel Closed : ", event);
      };
    };

    const sendChannel = peer.createDataChannel("sendChannel");

    sendChannel.onopen = (event) => {
      p("Send Data Channel Open : ", event);
    };

    sendChannel.onclose = (event) => {
      p("Send Data Channel Closed : ", event);
    };

    this.sendDataChannels.set(peerName, sendChannel);

    peer.onconnectionstatechange = (ev: Event) => {
      switch (peer.connectionState) {
        case "new":
        case "connecting":
          rp("Connecting...");
          break;
        case "connected":
          rp("Connected.");
          this.emit("new-peer", peer);
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

    peer.checkConnection = () => {
      const {
        connectionState,
        iceConnectionState,
        iceGatheringState,
        signalingState,
      } = peer;
      if (
        connectionState === "connected" &&
        iceConnectionState === "connected" &&
        iceGatheringState === "complete" &&
        signalingState === "stable"
      ) {
        rp("Connection Established.");
      } else if (
        (connectionState === "disconnected" ||
          connectionState === "closed" ||
          connectionState === "failed") &&
        (iceConnectionState === "disconnected" ||
          iceConnectionState === "failed" ||
          iceConnectionState === "closed")
      ) {
        rp("Error in Connection Establishment");
        this.emit("peer-left", peer.to.name);

        this.removePeer(peer.to.name);
      }
    };

    peer.from = {
      name: this.name,
      socket: this.socket.id,
    };
    peer.to = {
      name: peerName,
      socket: from,
    };
    peer.initiator = response;
    peer.ignoreOffer = false;
    peer.makingOffer = false;
    peer.socket = this.socket;
    peer.poster = this.createPoster(peerName);
  };

  handlePeerData = async ({ to, from, data }: Data) => {
    const { name, sdp, candidate }: any = data;
    if (this.peers.has(name) && to === this.socket.id) {
      try {
        const peer = this.peers.get(name);
        p("Data recieved", { name, sdp, candidate });

        if (sdp) {
          const offerCollision =
            sdp.type === "offer" &&
            (peer.makingOffer || peer.signalingState !== "stable");

          peer.ignoreOffer = !peer.initiator && offerCollision;

          if (peer.ignoreOffer) return;

          if (offerCollision) {
            await Promise.all([
              peer.setLocalDescription({ type: "rollback" }),
              peer.setRemoteDescription(sdp),
            ]);
          } else {
            p("Answer Recieved", sdp);
            await peer.setRemoteDescription(sdp);
          }
          if (sdp.type === "offer") {
            const answer = await peer.createAnswer();
            p("Answer Created", answer);

            await peer.setLocalDescription(answer);
            p("Local description set as answer", peer.localDescription);

            this.sendMessage("data", {
              to: from,
              from: to,
              data: {
                name: this.name,
                sdp: peer.localDescription,
              },
            });
          }
        } else if (candidate) {
          try {
            await peer.addIceCandidate(candidate);
            p("Added Ice Candidate", candidate);
          } catch (e) {
            if (!peer.ignoreOffer) p("Error adding IceCandidate", e);
            else
              p(
                "Should be ignored",
                e,
                candidate,
                this.peers.has(name),
                to === this.socket.id
              );
          }
        }
      } catch (error) {
        s("Socket Error", error);
      }
    }
  };

  handleTrackUpdate = ({ id, update }: { id: string; update: string }) => {
    s("Track Update Recieved", id, update);
    switch (update) {
      case "mute":
        this.emit("remote-peer-track-muted", id);
        break;
      case "unmute":
        this.emit("remote-peer-track-unmuted", id);
        break;
      case "end":
        this.remoteStreams
          .get(id)
          .forEach((mediaStream) => mediaStream.getVideoTracks()[0].stop());
        this.emit("remote-peer-track-ended", id);
        break;
      default:
        break;
    }
  };

  handleSocketUpdate = ({ id, name }) => {
    const peer = this.peers.get(name);
    peer.to.socket = id;
    s("Socket ID updated for peer.");
  };

  getStats = () => {
    return new Promise<object>(async (resolve, reject) => {
      const statsData = {};
      for (const [id, peer] of this.peers) {
        statsData[id] = await peer.getStats(null);
      }
      resolve(statsData);
    });
  };

  sendMessage = async (
    type: string,
    { from, to, room, data }: Data,
    func?: Function
  ) => {
    // const token = sign({ data }, this.secret);
    const token = this.crypt(data);
    this.socket.emit("message", { type, from, to, room, token }, func);
  };

  private crypt(obj: object) {
    const text = JSON.stringify(obj);
    return btoa(text);
  }

  private decrypt(encoded: string) {
    return JSON.parse(atob(encoded));
  }

  /**
   * Join the room with the provided room_id.
   */
  join = async () => {
    await new Promise<void>((resolve, reject) => {
      s("Joining Room");
      this.sendMessage(
        "room-join",
        { room: this.room, data: { name: this.name } },
        ({
          res,
          room,
          error,
        }: {
          res: Array<keyof Socket>;
          room: string;
          error: string;
        }) => {
          if (error) {
            this.emit("error", error);
            s("Room Join Error", error);
          } else if (res) {
            this.room = room;
            s("Room Joined", res);
            if (res.length > 1) {
              this.emit("room-joined", { res, room });
              s("Peers List Recieved");
              res.forEach((pid) => {
                if (pid !== this.socket.id) {
                  this.sendMessage("connection-request", {
                    from: this.socket.id,
                    to: pid,
                    data: {
                      response: true,
                      peerName: this.name,
                    },
                  });
                }
              });
              p("Establishing Peer Connection to Remote Peer.");
              resolve();
            }
          }
        }
      );
    });
  };

  startMedia = async (start?: boolean) => {
    const stream = (await this.getMedia()) as MediaStream;
    this.addStream(stream);
    if (start) {
      this.streams = stream;
    } else {
      this.streams = stream;
      this.replaceMedia(stream);
    }
  };

  getMedia = () =>
    new Promise((resolve, reject) => {
      navigator.mediaDevices
        .getUserMedia({
          video: this.media.video,
          audio: this.media.audio,
        })
        .then((stream) => {
          p(stream);
          resolve(stream);
        })
        .catch(reject);
    });

  screenShare = () =>
    navigator.mediaDevices
      // @ts-ignore
      .getDisplayMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        const track = stream.getVideoTracks()[0];
        p("Sharing Screen", track);

        track.onended = async (ev) => {
          p("Stop Sharing Screen");
          this.emit("screen-share-ended", ev);
          this.replaceMedia(this.streams);
          this.addStream(this.streams);
        };

        this.replaceMedia(stream);
        this.addStream(stream);
      })
      .catch(console.error);

  addStream = (stream: MediaStream) => {
    const video: HTMLVideoElement = document.querySelector(".self");
    video.srcObject = stream;
    video.onloadedmetadata = (ev) => {
      video.play();
    };
  };

  toggleMedia = (mediaType?: string, peerId?: string) => {
    if (mediaType) {
      switch (mediaType) {
        case "video":
          this.streams.getVideoTracks().forEach((track) => {
            track.enabled = !track.enabled;
          });
          break;
        case "audio":
          this.streams.getAudioTracks().forEach((track) => {
            track.enabled = !track.enabled;
          });
          break;
        case "all":
          this.streams.getTracks().forEach((track) => {
            track.enabled = !track.enabled;
          });
          break;
      }
    }

    if (peerId) {
      this.peers
        .get(peerId)
        .getSenders()
        .forEach((rtpSender) => {
          if (mediaType) {
            if (rtpSender?.track?.kind === mediaType) rtpSender.track.stop();
          } else {
            rtpSender?.track?.stop();
          }
        });
    }
  };

  createPoster = (name: string): string => {
    let canv: HTMLCanvasElement = document.createElement("canvas");

    canv.id = "canv";
    canv.height = 600;
    canv.width = 800;

    document.body.appendChild(canv);

    let canve = <HTMLCanvasElement>document.getElementById("canv");

    const ctx: CanvasRenderingContext2D = canve.getContext("2d");

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

  getLocalMedia = (id: string) => {
    return this.peers.get(id).getLocalStream();
  };

  getRemoteStream = (id: string) => {
    return this.peers.get(id).getRemoteStream();
  };

  /**
   * Replace Media Track
   *
   * @param track
   * @param id
   * @returns
   */
  replaceMediaTrack = (track: MediaStreamTrack, id?: string) => {
    if (id) {
      this.peers
        .get(id)
        .getSenders()
        .forEach((rtpSender: RTCRtpSender) => {
          if (rtpSender?.track?.kind === track.kind) {
            track.enabled = true;
            rtpSender.replaceTrack(track);
          }
        });
    } else {
      for (const [id, peer] of this.peers) {
        peer.getSenders().forEach((rtpSender: RTCRtpSender) => {
          if (rtpSender?.track?.kind === track.kind) {
            rtpSender.replaceTrack(track);
          }
        });
      }
    }
  };

  replaceMedia = (media: MediaStream, id?: string) => {
    return new Promise((resolve, reject) => {
      try {
        if (id) {
          for (const track of media.getTracks()) {
            id
              ? this.replaceMediaTrack(track, id)
              : this.replaceMediaTrack(track);
            p("Replacing Track", track, id);
          }
        } else {
          for (const [id, peer] of this.peers) {
            if (peer.getSenders().length > 0) {
              for (const track of media.getTracks()) {
                this.replaceMediaTrack(track, id);
                p("Replacing Track", track, id);
              }
            }
          }
        }
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };

  addMediaTrack = (track: MediaStreamTrack, id?: string) => {
    this.streams.addTrack(track);
    if (id) {
      this.peers.get(id).addTrack(track);
    } else {
      if (this.peers.size > 0) {
        for (const [id, peer] of this.peers) {
          peer.addTrack(track);
        }
      }
    }
  };

  addMedia = (stream: MediaStream, id?: string) => {
    stream
      .getTracks()
      .forEach((track) =>
        id ? this.addMediaTrack(track, id) : this.addMediaTrack(track)
      );
    p("Added new Stream", this.peers);
  };

  removeMediaTrack = (track: MediaStreamTrack) => {
    for (const [id, peer] of this.peers) {
      peer.getSenders().forEach((rtpSender: RTCRtpSender) => {
        if (rtpSender?.track?.kind === track.kind) {
          peer.removeTrack(rtpSender);
          s("Track Update Request Sent.");
          this.sendMessage("track-update", {
            room: this.room,
            data: {
              id: peer.from.name,
              update: "end",
            },
          });
        }
      });
    }
    this.streams.removeTrack(track);
  };

  removeMedia = (stream: MediaStream) => {
    stream.getTracks().forEach((track) => this.removeMediaTrack(track));
    p("Removed Stream", stream);
  };

  sendData = (message: string, id?: string, type?: string) => {
    if (id) {
      this.sendDataChannels.get(id).send(message);
    } else {
      for (const [id, sendChannel] of this.sendDataChannels) {
        sendChannel.send(message);
      }
    }
  };

  removePeer = (id: string) => {
    const peer = this.peers.get(id);

    peer.close();
    rp("Remote Peer Connection Closed");

    this.peers.delete(id);
    rp("Remote Peer Removed");

    this.remoteStreams.delete(id);
    rp("Remote Peer Stream Removed");
  };

  close = () => {
    for (const [id, peer] of this.peers) {
      this.removePeer(id);
    }
  };
}

interface CustomPeerConnection extends RTCPeerConnection {
  from: { name: string; socket: string };
  to: { name: string; socket: string };
  initiator: boolean;
  ignoreOffer: boolean;
  makingOffer: boolean;
  socket: Socket;
  poster: string;
  checkConnection: () => void;
  getRemoteStream: () => [MediaStreamTrack];
  getLocalStream: () => [MediaStreamTrack];
}

type CustomPeerConnectionTrackEvent<T> = RTCTrackEvent;
type CustomPeerConnectionIceEvent = RTCPeerConnectionIceEvent;

interface Data {
  to?: string;
  from?: string;
  room?: string;
  data: object;
}

export default Bun;
