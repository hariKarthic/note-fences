import React, { PureComponent } from "react";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import EditNoteModal from "./EditNoteModal";

const styles = {
  container: {
    position: "fixed",
    bottom: 20,
    right: 20
  }
};
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
      <div style={styles.container}>
        <Button
          variant="fab"
          color="primary"
          aria-label="Add"
          onClick={() => this.setState({ open: true })}
        >
          <AddIcon />
        </Button>
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
