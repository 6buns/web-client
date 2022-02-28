import { config } from "./config";
import { debug } from "debug";

const pc = debug('RTCPeerConnection')

class PeerConnect extends RTCPeerConnection {
    constructor(sid) {
        super(config);
        this.id = sid;
        this.iceCandidates = []
    }

    onconnectionstatechange = (connectionState) => {
        switch (connectionState) {
            case "connected":
                pc('The connection has become fully connected.')
                break;
            case "disconnected":
                pc('The connection has been disconnected.')
                break;
            case "failed":
                pc('One or more transports has terminated unexpectedly or in an error.')
                break;
            case "closed":
                pc('The connection has been closed.')
                break;
        }
    }

    ondatachannel = (event) => {
        pc('Data channel is created!');
        event.channel.onopen = function () {
            pc('Data channel is open and ready to be used.');
        }
    }

    onicecandidate = (event) => {
        if (event.candidate) {
            iceCandidates.push(event.candidate)
        }
    }

    onicecandidateerror = (event) => {
        if (event.errorCode >= 300 && event.errorCode <= 699) {
            // STUN errors are in the range 300-699. See RFC 5389, section 15.6
            // for a list of codes. TURN adds a few more error codes; see
            // RFC 5766, section 15 for details.
            switch (event.errorCode) {
                case 300:
                    console.error('STUN Server Error : 300 : (Try Alternate) The client should contact an alternate server for this request.  This error response MUST only be sent if the request included a USERNAME attribute and a valid MESSAGE- INTEGRITY attribute; otherwise, it MUST NOT be sent and error code 400 (Bad Request) is suggested.  This error response MUST be protected with the MESSAGE-INTEGRITY attribute, and receivers MUST validate the MESSAGE-INTEGRITY of this response before redirecting themselves to an alternate server.');
                    break;
                case 400:
                    console.error('STUN Server Error : 400 : (Bad Request) The request was malformed.  The client SHOULD NOT retry the request without modification from the previous attempt.  The server may not be able to generate a valid MESSAGE-INTEGRITY for this error, so the client MUST NOT expect a valid MESSAGE-INTEGRITY attribute on this response.');
                    break;
                case 401:
                    console.error('STUN Server Error : 401 : (Unauthorized) The request did not contain the correct credentials to proceed.  The client should retry the request with proper credentials.');
                    break;
                case 420:
                    console.error('STUN Server Error : 420 : (Unknown Attribute) The server received a STUN packet containing a comprehension-required attribute that it did not understand. The server MUST put this unknown attribute in the UNKNOWN- ATTRIBUTE attribute of its error response.');
                    break;
                case 438:
                    console.error('STUN Server Error : 438 : (Stale Nonce) The NONCE used by the client was no longer valid. The client should retry, using the NONCE provided in the response.');
                    break;
                case 500:
                    console.error('STUN Server Error : 500 : (Server Error) The server has suffered a temporary error.  The client should try again.');
                    break;
                case 403:
                    console.error('TURN Server Error: 403 : (Forbidden): The request was valid but cannot be performed due to administrative or similar restrictions.');
                    break;
                case 437:
                    console.error('TURN Server Error: 437 : (Allocation Mismatch): A request was received by the server that requires an allocation to be in place, but no allocation exists, or a request was received that requires no allocation, but an allocation exists.');
                    break;
                case 441:
                    pc('TURN Server Error: 441 : (Wrong Credentials): The credentials in the (non-Allocate) request do not match those used to create the allocation.')
                    break;
                case 442:
                    console.error('TURN Server Error: 442 : (Unsupported Transport Protocol): The Allocate request asked the server to use a transport protocol between the server and the peer that the server does not support.  NOTE: This does NOT refer to the transport protocol used in the 5-tuple.');
                    break;
                case 486:
                    console.error('TURN Server Error: 486 : (Allocation Quota Reached): No more allocations using this username can be created at the present time.');
                    break;
                case 508:
                    console.error('TURN Server Error: 508 : (Insufficient Capacity): The server is unable to carry out the request due to some capacity limit being reached.  In an Allocate response, this could be due to the server having no more relayed transport addresses available at that time, having none with the requested properties, or the one that corresponds to the specified reservation token is not available.');
                    break;
            }
        } else if (event.errorCode >= 700 && event.errorCode <= 799) {
            // Server could not be reached; a specific error number is
            // provided but these are not yet specified.
            console.error(new Error(event))
        }
    }

    oniceconnectionstatechange = (event) => {
        switch (event) {
            case "failed":
                console.error('ICE Connection Failed');
                break;
            case "disconnected":
                console.error('ICE Connection Disconnected');
                break;
            case "closed":
                console.error('ICE Connection Closed');
                break;
        }
    }

    onicegatheringstatechange = (event) => {
        switch (event) {
            case "new":
                pc("ICE gathering state started.")
                break;
            case "complete":
                pc("ICE gathering state completed.")
                break;
            case "gathering":
                pc("ICE gathering.")
                break;
        }
    }

    onnegotiationneeded = () => { }

    onsignalingstatechange = () => { }

    ontrack = (event) => {
        pc(`TRACK RECIEVED : ${event}`)
    }
}

export { PeerConnect }
