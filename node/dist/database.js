"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _firebase = require("firebase");

var _firebase2 = _interopRequireDefault(_firebase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _firebase2.default.initializeApp({
    apiKey: "AIzaSyDPzWm4FgNkcHIM8gEhNSR-nTgr7gMK91U",
    authDomain: "note-fence.firebaseapp.com",
    databaseURL: "https://note-fence.firebaseio.com",
    projectId: "note-fence",
    storageBucket: "note-fence.appspot.com",
    messagingSenderId: "902393125561"
}).firestore();