import firebase from 'firebase';

export default firebase.initializeApp({
    apiKey: "AIzaSyDPzWm4FgNkcHIM8gEhNSR-nTgr7gMK91U",
    authDomain: "note-fence.firebaseapp.com",
    databaseURL: "https://note-fence.firebaseio.com",
    projectId: "note-fence",
    storageBucket: "note-fence.appspot.com",
    messagingSenderId: "902393125561"
}).firestore();
