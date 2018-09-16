import { CssBaseline } from "@material-ui/core";
import React, { Component, Fragment } from "react";
import io from "socket.io-client";
import { ActionContainer, Header } from "./components";
import MainContent from "./MainContent";
//import worker from "workerize-loader!./web.worker"; //eslint-disable-line
//let webworker = worker();
import { FENCE } from "./utils/Fencery";
import "./utils/storageUtils";
import Loader from "./components/loader";

const socket = io();
socket.on("connect", () => {
  console.info("Socked has connected", socket.connected);
});
const uuidv1 = require("uuid/v1");

class App extends Component {
  state = {};
  locationWatchId = {};
  otherFences = null;
  newPositionDetected = false;
  locationOpts = {
    enableHighAccuracy: true,
    timeout: 3000,
    maximumAge: 0
  };

  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      hasEntered: false
    };
    this.locationWatchId = {};
    this.watchsuccess = this.watchsuccess.bind(this);
    this.watcherror = this.watcherror.bind(this);
    this.getLocation = this.getLocation.bind(this);
    this.setGeoFence = this.setCurrentNoteFence.bind(this);
    this.setOtherFences = this.setOtherFences.bind(this);
    this.showReceivedNotesOnScreen = this.showReceivedNotesOnScreen.bind(this);

    socket.on("INIT_CONN_EV", data => {
      console.log("Network fences");
      this.setOtherFences(data.notes);
    });

    socket.on("SEND_NOTE", data => {
      console.log("Notes received");
      this.setLocalGuids(data.notes.map(item => item.guid));
      this.showReceivedNotesOnScreen(data.notes);
    });
  }

  showReceivedNotesOnScreen(notes){
    let existingArr = this.state.notes.map(item => item.note);
    
    let newArr = existingArr
    .concat(notes.map(item => item.note))
    .filter((value, index, self) => { 
      return self.indexOf(value) === index;
    });

    this.setState({
      notes: newArr
    });
  }

  setLocalGuids(guids) {
    guids.forEach(item => {
      localStorage.setArrayItem("my_notes", item);
    });
  }

  setOtherFences(datafromsocket) {
    if (datafromsocket.length) {
      const localNoteGuids = localStorage.getArray('my_notes') || [];
      const noteCoordsFromSocket = datafromsocket.filter(item => {
        return !localNoteGuids.includes(item.guid);
      })
      .map(item => {
        return {
            center:{ 
            latitude: item.latitude,
            longitude: item.longitude  
          },
          name: item.guid,
          radius: 5
        };
      });

      this.otherFences = new FENCE(noteCoordsFromSocket);
    }
  }

  getLocation(data) {
    const random_guid = uuidv1();
    const onLocationSuccess = position => {
      localStorage.setItem("cachedLocation", JSON.stringify({
        'latitude': position.coords.latitude,
        'longitude': position.coords.longitude
      })); //updating localstorage with new position
      this.setCurrentNoteFence(position.coords, random_guid);
      this.broadCastPayLoad(position.coords, random_guid, data);
    };
    const onLocationFailure = err => {
      console.error(
        "Failed to get current location,passing prev known location"
      );
      console.error(err);
      let cachedPos = localStorage.getItem("cachedLocation");
      cachedPos = JSON.parse(cachedPos);
      this.setCurrentNoteFence(cachedPos, random_guid);
      this.broadCastPayLoad(cachedPos, random_guid, data);
    };
    navigator.geolocation.getCurrentPosition(
      onLocationSuccess,
      onLocationFailure,
      this.locationOpts
    );
  }

  broadCastPayLoad(coords, fenceId, message) {
    //TODO : Emit a socket event with payload
    socket.emit("PUSH_NOTE", {
      guid: fenceId,
      message: message.note,
      latitude: coords.latitude,
      longitude: coords.longitude
    });
    this.setLocalGuids([fenceId]);
    console.info("Note pushed to server");
  }

  setCurrentNoteFence(coords, random_guid) {
    this.notefence = new FENCE([
      {
        name: random_guid,
        center: {
          latitude: coords.latitude,
          longitude: coords.longitude
        },
        radius: 5
      }
    ]);
  }
  addNewNote = data => {
    console.log("add new data: ", data);
    const len = this.state.notes.length;
    data.id = len + 1;

    this.setState({ notes: [...this.state.notes, data] }, () => {
      this.getLocation(data);
    });
  };
  updateNote = data => {
    console.log("data: ", data.id);
    const index = this.state.notes.findIndex(note => note.id === data.id);
    this.state.notes.splice(index, 1, { ...data });
  };

  componentDidMount() {
    console.log(
      "Mounted look for pending sockets and watch for location changes!!"
    );
    //TODO:  Receive pending note information by communicating to sockets
    if (!navigator.geolocation) return;
    this.locationWatchId = navigator.geolocation.watchPosition(
      this.watchsuccess,
      this.watcherror,
      this.locationOpts
    );
    this.locationTime = setInterval(() => {
      if(!this.newPositionDetected){
        this.newPositionDetected = true;
        navigator.geolocation.getCurrentPosition(
          this.watchsuccess,
          this.watcherror,
          this.locationOpts
        );
      }
    }, 2000);
  }

  watchsuccess(pos) {
    this.newPositionDetected = false;
    console.log("Watched location", pos.coords);
    const coords = pos.coords;
    localStorage.setItem("cachedLocation", JSON.stringify({
      'latitude': coords.latitude, 
      'longitude': coords.longitude
    }));
    const enteredFences =
      this.otherFences &&
      this.otherFences.isInside({
        latitude: coords.latitude,
        longitude: coords.longitude
      });
    if (enteredFences && enteredFences.length) {
      console.log("Entered into the some other fence and picked up a note");
      socket.emit("FETCH_NOTE_EV", {
        guids: enteredFences.map(item => item.name)
      });
      this.setState({ hasEntered: true });
      //navigator.geolocation.clearWatch(this.locationWatchId);
    }
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.locationWatchId);
  }

  watcherror(err) {
    this.newPositionDetected = false;
    console.log("Error while tracking user location");
    console.error(err);
  }

  render() {
    const { notes } = this.state;
    return (
      <Fragment>
        <CssBaseline />
        <Header />
        <MainContent data={notes} onUpdateNote={this.updateNote} />
          {!this.state.hasEntered && <Loader/>}
        <ActionContainer data={notes} onAddNote={this.addNewNote} />
      </Fragment>
    );
  }
}

export default App;

// WEBPACK FOOTER //
// ./src/App.js
