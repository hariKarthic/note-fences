'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Firestore = require('@google-cloud/firestore');
// import '@firebase/firestore';
// import serviceAccount from './serviceaccount';

var fb = new Firestore({
    projectId: "note-fence",
    keyFilename: './serviceaccount.json'
});

var FirebaseHelper = function () {
    function FirebaseHelper() {
        _classCallCheck(this, FirebaseHelper);

        // this.database = fb.database();
        // this.storage = fb.storage();

        this.notesRef = fb.collection('notes').doc();
        // this.usersRef = this.database.ref('note-fence').child('users');
    }

    _createClass(FirebaseHelper, [{
        key: 'postNote',
        value: function postNote(note) {
            console.log(note);
            this.notesRef.set({
                note: note,
                date: new Date()
            });
        }
    }, {
        key: 'getNotes',
        value: function getNotes() {}
    }]);

    return FirebaseHelper;
}();

exports.default = FirebaseHelper;
;