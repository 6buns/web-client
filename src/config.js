const urls = [
    "stun:stun.infra.net:3478",
    "stun:stun.crononauta.com:3478",
    "stun:stun.xtratelecom.es:3478",
    "stun:stun3.l.google.com:19305",
    "stun:stun.coffee-sen.com:3478",
    "stun:stun.futurasp.es:3478",
    "stun:stun.millenniumarts.org:3478",
    "stun:stun.uls.co.za:3478",
    "stun:stun.oncloud7.ch:3478",
    "stun:stun1.l.google.com:19302",
    "stun:stun.telbo.com:3478",
    "stun:stun.fitauto.ru:3478",
    "stun:stun.edwin-wiegele.at:3478",
    "stun:stun.marble.io:3478",
    "stun:stun.lineaencasa.com:3478",
    "stun:stun.jumblo.com:3478",
    "stun:stun4.3cx.com:3478",
];

export const config = {
    iceServers: [{
        urls,
    }],
    iceCandidatePoolSize: 10,
    bundlePolicy: 'max-compat',
}
