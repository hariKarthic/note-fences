import React, { PureComponent } from "react";
import Modal from "react-responsive-modal";
import Button from "@material-ui/core/Button";

const styles = {
  cancelBtn: {
    marginRight: 10
  }
};

class EditNoteModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      note: ""
    };
  }
  openModal = () => {
    this.setState({ open: true });
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ note: nextProps.data || "", open: nextProps.isOpen });
  }

  closeModal = () => {
    this.setState({ open: false });
    this.props.onClose();
  };
  handleSendClick = () => {
    console.log(this.props.data);
    if (!this.state.note) return;
    if (this.props.isEdit) {
      this.props.onUpdateNote({
        note: this.state.note,
        id: this.props.data.id
      });
    } else {
      this.props.onAddNote({
        note: this.state.note
      });
      document.getElementById("audio").play();
    }
    this.setState({ open: false });
    this.props.onClose();
  };
  handleChange = e => {
    this.setState({ note: e.target.value });
  };

  render() {
    const { open, note } = this.state;
    return (
      <Modal open={open} onClose={this.closeModal} center showCloseIcon={false}>
        <audio id="audio" src="../effect.mp3" autostart="false" ></audio>
        <textarea
          onChange={this.handleChange}
          value={note.note}
          style={{ minWidth: 300, minHeight: 80 }}
          autoFocus
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            marginTop: 20
          }}
        >
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={this.handleSendClick}
          >
            Send
          </Button>
          <Button
            style={styles.cancelBtn}
            variant="outlined"
            color="primary"
            size="small"
            onClick={this.closeModal}
          >
            Cancel
          </Button>
        </div>
      </Modal>
    );
  }
}

export default EditNoteModal;
