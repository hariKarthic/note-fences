import React, { PureComponent } from "react";
import Button from "@material-ui/core/Button";
import ReactModal from 'react-modal'
import SendIcon from '@material-ui/icons/SendRounded';
import ChevronLeft from '@material-ui/icons/ChevronLeft';

const reactModalStyles = {
  overlay: {
    background: "rgba(0, 0, 0, 0.75)",
    display: "flex",
    alignItems: "flex-start",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflowY: "auto",
    overflowX: "hidden",
    zIndex: 1000
  },
  modal: {
    width: "100%",
    height: "100vh",
    position: "relative",
    padding: "1.2rem",
    background: "#ffffff",
    backgroundClip: "padding-box",
    boxShadow: " 0 12px 15px 0 rgba(0, 0, 0, 0.25)",
    margin: "auto"
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
      <ReactModal
        isOpen={open}
        className='rm-content'
        overlayClassName='rm-overlay'
        onRequestClose={this.closeModal}
      >
      <Button onClick={this.closeModal} style={{width: 90, padding: 0, maxWidth: 20}}>
      <ChevronLeft ></ChevronLeft>
      Back
      </Button>

        <textarea
          onChange={this.handleChange}
          value={note.note}
          placeholder='You have 160 characters to express yourself :)'
          maxLength="160"
          style={{ minWidth: 300,marginTop:20, minHeight: 100 ,border:'1px solid #ccc'}}
          autoFocus
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            marginTop: 20
          }}
        >
          <Button variant="extendedFab" color="secondary" onClick={this.handleSendClick}>
            Send
            <SendIcon style={{marginLeft: 10}}/>

          </Button>
        </div>
      </ReactModal>
    );
  }
}

export default EditNoteModal;
