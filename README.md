# web-client

## Installation

- Using npm,
```js
npm i 6buns-client
```
- Using CDN,
```html
    <script src="https://unpkg.com/6buns@1.0.0"></script>
```

## Process for WEBRTC Peer to Peer
### INITIATOR
- [x] Get User Media
- [x] Add Stream
- [x] Create Offer
- [x] Set Local SDP, `Send Offer`
- [ ] On Answer
- [ ] Set Remote Description
- [ ] Send Candidates
- [ ] Add Candidates


### PARTICIPANT
- [x] Get User Media
- [x] Add Stream
- [x] On Offer
- [x] Set Remote Description
- [x] Create Answer
- [ ] Set Local Description, `Send Answer`
- [ ] Add Ice Candidates
- [ ] Send Ice Candidates
