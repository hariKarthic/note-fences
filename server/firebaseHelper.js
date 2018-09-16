import Firestore from '@google-cloud/firestore';

const firestore = new Firestore({
    projectId: "note-fence",
    keyFilename: './serviceaccount.json'
});
const settings = { timestampsInSnapshots: true };

firestore.settings(settings);

const dataExtractionCallback = data => {
    let colln = [];
    data.forEach(datum => {
        colln.push(datum.data());
    })
    return colln;
};

export default class FirebaseHelper {
    constructor(){
        this.notesRef = firestore.collection('notes');
    }
    postNote(docId, lat, long, note) {
        this.notesRef
        .doc(docId)
        .set({ note, lat, long });
    }
    getAllLocations(docIdColln){
        return this.notesRef
        .get()
        .then(dataExtractionCallback);
    }
    getNote(docId){
        return this.notesRef
        .doc(docId)
        .get()
        .then(dataExtractionCallback);
    }
};
