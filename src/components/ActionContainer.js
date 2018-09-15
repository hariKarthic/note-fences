import React, { PureComponent } from "react";
import EditNoteModal from "./EditNoteModal";

class ActionContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }
  render() {
    const { open } = this.state;
    return (
      <div className="actionContainer">
        <button
          className="actionContainers__addButton"
          onClick={() => this.setState({ open: true })}
        >
          +
        </button>
        <EditNoteModal
          isOpen={open}
          onAddNote={this.props.onAddNote}
          onClose={() => this.setState({ open: false })}
        />
      </div>
    );
  }
}

export default ActionContainer;
