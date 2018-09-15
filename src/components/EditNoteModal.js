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
    if (this.props.isEdit) {
      this.props.onUpdateNote({
        text: this.state.note,
        id: this.props.data.id
      });
    } else {
      this.props.onAddNote({
        text: this.state.note
      });
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
        <textarea
          onChange={this.handleChange}
          value={note.text}
          style={{ minWidth: 300, minHeight: 80 }}
        />
        <div style={{ textAlign: "right", marginTop: 20 }}>
          <Button
            style={styles.cancelBtn}
            variant="outlined"
            color="primary"
            size="small"
            onClick={this.closeModal}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={this.handleSendClick}
          >
            Send
          </Button>
        </div>
      </Modal>
    );
  }
}

export default EditNoteModal;
