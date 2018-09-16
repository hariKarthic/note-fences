import { CssBaseline } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React, { Component, Fragment } from "react";
import io from "socket.io-client";
import { ActionContainer, Header } from "./components";
import MainContent from "./MainContent";
//import worker from "workerize-loader!./web.worker"; //eslint-disable-line
//let webworker = worker();
import { FENCE } from "./utils/Fencery";
import "./utils/storageUtils";

const socket = io();
socket.on("connect", () => {
  console.info("Socked has connected", socket.connected);
});
const uuidv1 = require("uuid/v1");

class App extends Component {
  state = {};
  locationWatchId = {};
  otherFences = null;
  locationOpts = {
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

    socket.on("INIT_CONN_EV", data => {
      console.log("Network fences");
      this.setOtherFences(data.message);
    });

    socket.on("SEND_NOTE", data => {
      console.log("Notes received");
      this.setLocalGuids(data.notes.map(item => item.guid));
      this.showReceivedNotesOnScreen(data.notes);
    });
  }

  setLocalGuids(guids) {
    guids.forEach(item => {
      localStorage.setArrayItem("my_notes", item);
    });
  }

  setOtherFences(datafromsocket) {
    if (datafromsocket.length) {
      const localNoteGuids = localStorage.getArray();
      const noteCoordsFromSocket = datafromsocket.filter(item => {
        return !localNoteGuids.includes(item.guid);
      });

      noteCoordsFromSocket.forEach(element => {
        element.radius = 5;
      });

      this.otherFences = new FENCE(noteCoordsFromSocket);
    }
  }

  getLocation(data) {
    const success = position => {
      var random_guid = uuidv1();
      this.setLocalGuids([random_guid]);
      console.log(position);
      this.setCurrentNoteFence(position.coords, random_guid);
      this.broadCastPayLoad(position.coords, random_guid, data);
    };
    const failure = err => {
      console.error("Failed to get current location");
      console.error(err);
      console.error("Note not pushed to server!");
    };
    navigator.geolocation.getCurrentPosition(
      success,
      failure,
      this.locationOpts
    );
  }

  broadCastPayLoad(coords, fenceId, message) {
    //TODO : Emit a socket event with payload
    socket.emit("PUSH_NODE", {
      note: {
        guid: fenceId,
        message,
        ...coords,
      }
    });
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
  }

  watchsuccess(pos) {
    const coords = pos.coords;
    console.log("Inside WatchSuccess", coords);
    //TODO: filter the notefence array and return only the non-matchings ones
    const enteredFences =
      this.otherFences &&
      this.otherFences.isInside({
        latitude: coords.latitude,
        longitude: coords.longitude
      });
    //TODO: loop through the set of lat/long and trigger
    if (enteredFences && enteredFences.length) {
      console.log("Entered into the some other fence and picked up a note");
      //TODO : Make socket call
      socket.emit("FETCH_NOTE_EV", {
        guids: [enteredFences.map(item => item.guid)]
      });
      this.setState({ hasEntered: true });
      navigator.geolocation.clearWatch(this.locationWatchId);
    }
  }

  watcherror(err) {
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
        <Typography variant="caption" align="center">
          {this.state.hasEntered ? "Hurrah ! Found a note" : "No Notes Yet..."}
        </Typography>
        <ActionContainer data={notes} onAddNote={this.addNewNote} />
      </Fragment>
    );
  }
}

export default App;

// WEBPACK FOOTER //
// ./src/App.js