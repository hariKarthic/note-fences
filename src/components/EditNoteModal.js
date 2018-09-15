import React, { PureComponent } from "react";
import Modal from "react-responsive-modal";

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
        <textarea onChange={this.handleChange} value={note.text} />
        <div style={{ textAlign: "right" }}>
          <button onClick={this.closeModal}>Cancel</button>
          <button onClick={this.handleSendClick}>Send</button>
        </div>
      </Modal>
    );
  }
}

export default EditNoteModal;
