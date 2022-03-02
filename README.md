# web-client

### Installation

- Using npm,

```js
npm i 6buns-client
```

- Using CDN,

```html
<script src="https://unpkg.com/6buns@1.0.0"></script>
```

### Usage

You create bun object, which handles all the webrtc things for you,

```js
const options = {
  accountSid: "",
  apiKey: "",
  maxParticipants: "",
};

const bun = new Bun(options);
```

Join a room, by providing an id, and password key if required.

```js
bun.join({
  roomId: "abcdef",
  roomPass: 45678,
});
```

Add Media, like microphone, or webcam, or screen

```js
bun.setMedia({
	video: false, // camera or screen share
	audio: true,
	screen: true,
})
```

Stop live stream of your webcam, or other user's webcam.

```js
bun.stop({
	mediaType: '',
	peerId: ''
})
```

Whenever a new user joins, new-peer event is fired, which can be handled on frontend.

```js
bun.on("new-peer", (event) => {
  // Do something whenever a new user joins.
});
```

Whenever a new media track is available, new-remote-track event is fired. This event is usually fired when a user in room switched on/off their webcam/mic/screenshare

```js
bun.on("new-remote-track", (event) => {
  // Add remote user's track
});
```

Whenever a user leaves, peer-left event is fired.

```js
bun.on("peer-left", (id) => {
	// Do something when user leaves
});
```

### Process for WEBRTC Peer to Peer

#### INITIATOR

- [x] Get User Media
- [x] Add Stream
- [x] Create Offer
- [x] Set Local SDP, `Send Offer`
- [ ] On Answer
- [ ] Set Remote Description
- [ ] Send Candidates
- [ ] Add Candidates

#### PARTICIPANT

- [x] Get User Media
- [x] Add Stream
- [x] On Offer
- [x] Set Remote Description
- [x] Create Answer
- [ ] Set Local Description, `Send Answer`
- [ ] Add Ice Candidates
- [ ] Send Ice Candidates
