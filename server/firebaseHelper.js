const Firestore = require('@google-cloud/firestore');
// import '@firebase/firestore';
// import serviceAccount from './serviceaccount';

const fb = new Firestore({
    projectId: "note-fence",
    keyFilename: './serviceaccount.json'
});

export default class FirebaseHelper {
    constructor(){
        // this.database = fb.database();
        // this.storage = fb.storage();

        this.notesRef = fb.collection('notes').doc();
        // this.usersRef = this.database.ref('note-fence').child('users');
    }
    postNote(note) {
        console.log(note);
        this.notesRef.set({
            note: note,
            date: new Date()
        });
    }
    getNotes(){

    }
};
