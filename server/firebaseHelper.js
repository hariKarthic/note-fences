import Firestore from '@google-cloud/firestore';
import serviceAccountDetails from './serviceAccount'; 

const firestore = new Firestore({
    projectId: "note-fence",
    credentials: {
        private_key: serviceAccountDetails.private_key,
        client_email: serviceAccountDetails.client_email
    }
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
    postNote(guid, latitude, longitude, note) {
        console.log(guid, latitude, longitude, note);
        return this.notesRef
        .doc()
        .set({ note, latitude, longitude, guid });
    }
    getAllLocations(guids){
        return this.notesRef
        .get()
        .then(data => {
            let colln = [];
            data.forEach(datum => {
                colln.push(datum.data());
            })
            // console.log('all conns received: ', colln);
            return colln;
        });
    }
    getNote(guids){
        return this.notesRef
        .get()
        .then(data => {
            let colln = [];
            data.forEach(datum => {
                console.log('guids: ', guids);
                
                if(guids.includes(datum.data().guid)){
                    colln.push(datum.data());
                }
            })
            console.log('fetched msgs: ', colln);
            return colln;
        });
    }
};
