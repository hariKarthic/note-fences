import Firestore from '@google-cloud/firestore';

const firestore = new Firestore({
    projectId: "note-fence",
    keyFilename: './serviceaccount.json'
});
const settings = { timestampsInSnapshots: true };

firestore.settings(settings);

const dataExtractionCallback = (data, guids) => () => {
    let colln = [];
    data.forEach(datum => {
        if(guids.length && guids.includes(datum.data().guid)){
            colln.push(datum.data());
        }else{
            colln.push(datum.data());
        }
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
        .set({ note, lat, long, guid });
    }
    getAllLocations(guids){
        return this.notesRef
        .get()
        .then(data => {
            let colln = [];
            data.forEach(datum => {
                colln.push(datum.data());
            })
            return colln;
        });
    }
    getNote(guids){
        return this.notesRef
        .doc(docId)
        .get()
        .then(data => {
            let colln = [];
            data.forEach(datum => {
                if(guids.includes(datum.data().guid)){
                    colln.push(datum.data());
                }
            })
            return colln;
        });
    }
};
