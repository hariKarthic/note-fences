import { CssBaseline } from "@material-ui/core";
import {  MuiThemeProvider } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import React, { Component, Fragment } from "react";
import io from "socket.io-client";
import { ActionContainer, Header } from "./components";
import MainContent from "./MainContent";
//import worker from "workerize-loader!./web.worker"; //eslint-disable-line
//let webworker = worker();
import { FENCE } from "./utils/Fencery";
import theme from './utils/themes';
import "./utils/storageUtils";
const uuidv1 = require("uuid/v1");


const socket = io();
socket.on("connect", () => {
  console.info("Socked has connected", socket.connected);
});


class App extends Component {
  state = {};
  locationWatchId = {};
  otherFences = null;
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
    const random_guid = uuidv1();
    const onLocationSuccess = position => {
      localStorage.setItem("cachedLocation", JSON.stringify(position.coords)); //updating localstorage with new position
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
      message: message.text,
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
  }

  watchsuccess(pos) {
    console.log("Watched location", pos.coords);
    const coords = pos.coords;
    localStorage.setItem("cachedLocation", JSON.stringify(coords.coords));
    const enteredFences =
      this.otherFences &&
      this.otherFences.isInside({
        latitude: coords.latitude,
        longitude: coords.longitude
      });
    if (enteredFences && enteredFences.length) {
      console.log("Entered into the some other fence and picked up a note");
      socket.emit("FETCH_NOTE_EV", {
        guids: enteredFences.map(item => item.guid)
      });
      this.setState({ hasEntered: true });
      //navigator.geolocation.clearWatch(this.locationWatchId);
    }
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.locationWatchId);
  }

  watcherror(err) {
    console.log("Error while tracking user location");
    console.error(err);
  }

  render() {
    const { notes } = this.state;
    return (
      <MuiThemeProvider theme ={theme}>
        <CssBaseline />
        <Header />
        <MainContent data={notes} onUpdateNote={this.updateNote} />
        <Typography variant="caption" align="center">
          {this.state.hasEntered ? "Hurrah ! Found a new note" : ""}
        </Typography>
        <ActionContainer data={notes} onAddNote={this.addNewNote} />
      </MuiThemeProvider>
    );
  }
}

export default App;

// WEBPACK FOOTER //
// ./src/App.js
