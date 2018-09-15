import React, { PureComponent } from "react";
import { NoteCard, EditNoteModal } from "./components";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: 20
  },
  card: {
    color: theme.palette.text.secondary
  },
  noNotes: {
    textAlign: "center",
    margin: 20
  }
});

class AppContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      note: ""
    };
  }
  render() {
    const { classes, data } = this.props;
    const { open, note } = this.state;
    if (!data.length) {
      return (
        <div className={classes.noNotes}>
          <Chip label="No notes available!" />
        </div>
      );
    }
    return (
      <main className={classes.root}>
        <Grid container spacing={16} justify="center">
          {data &&
            data.map(note => (
              <Grid item xs key={note.id}>
                <NoteCard
                  cardClass={classes.card}
                  key={note.id}
                  data={note}
                  onClick={() => this.setState({ open: true, note })}
                />
              </Grid>
            ))}
        </Grid>

        <EditNoteModal
          isOpen={open}
          data={note}
          isEdit={true}
          onUpdateNote={this.props.onUpdateNote}
          onClose={() => this.setState({ open: false })}
        />
      </main>
    );
  }
}

export default withStyles(styles)(AppContainer);
