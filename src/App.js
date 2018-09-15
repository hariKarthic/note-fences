import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
//import worker from "workerize-loader!./web.worker"; //eslint-disable-line
import CreateNote from "./components/createNote";
import AppContainer from "./AppContainer";
//let webworker = worker();

class App extends Component {
  state = {};
  locationWatchId = {};

  constructor(props) {
    super(props);
    this.watchsuccess = this.watchsuccess.bind(this);
  }
  componentDidMount() {
    console.log("Mounted!!");
    if (!navigator.geolocation) return;
    this.locationWatchId = navigator.geolocation.watchPosition(
      this.watchsuccess,
      this.watcherror
    );
  }

  watchsuccess(pos) {
    const coords = pos.coords;
    //TODO: loop through the set of lat/long and trigger

    navigator.geolocation.clearWatch(this.locationWatchId);
  }

  render() {
    return <AppContainer className="App" />;
  }
}

export default App;
