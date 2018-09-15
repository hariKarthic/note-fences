import React, { PureComponent } from "react";
import { Card, EditNoteModal } from "./components";

class AppContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      note: ""
    };
  }
  render() {
    const { data } = this.props;
    const { open, note } = this.state;
    if (!data.length) {
      return (
        <main className="main">
          <div className="cardContainer">No notes available!</div>
        </main>
      );
    }
    return (
      <main className="main">
        <div className="cardContainer">
          {data &&
            data.map(note => (
              <Card
                key={note.id}
                data={note}
                onClick={() => this.setState({ open: true, note })}
              />
            ))}
          <EditNoteModal
            isOpen={open}
            data={note}
            isEdit={true}
            onUpdateNote={this.props.onUpdateNote}
            onClose={() => this.setState({ open: false })}
          />
        </div>
      </main>
    );
  }
}

export default AppContainer;
