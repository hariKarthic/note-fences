import React, { Fragment, PureComponent } from "react";
import "./App.css";
import MainContent from "./MainContent";
import { Header, ActionContainer } from "./components";
class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      notes: []
    };
  }
  addNewNote = data => {
    console.log("add new data: ", data);
    const len = this.state.notes.length;
    data.id = len + 1;
    this.setState({ notes: [...this.state.notes, data] });
  };
  updateNote = data => {
    console.log("data: ", data.id);
    const index = this.state.notes.findIndex(note => note.id === data.id);
    this.state.notes.splice(index, 1, { ...data });
  };
  render() {
    const { notes } = this.state;
    return (
      <Fragment>
        <Header />
        <MainContent data={notes} onUpdateNote={this.updateNote} />
        <ActionContainer data={notes} onAddNote={this.addNewNote} />
      </Fragment>
    );
  }
}

export default App;
