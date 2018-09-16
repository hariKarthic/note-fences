import React, { PureComponent } from "react";
import { NoteCard, EditNoteModal } from "./components";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    margin: 20
  },
  card: {
    color: "#000"
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
      note: ""
    };
  }
  render() {
    const { classes, data } = this.props;
    return (
      <main className={classes.root}>
        <Grid container spacing={16}  justify="center">
          {data &&
            data.filter(item => item.note && item.note.length).map(note => (
              <Grid item xs={12} sm={4}  key={note.id}>
                <NoteCard
                  cardClass={classes.card}

                  data={note}
                  onClick={() => this.setState({ open: true, note })}
                />
              </Grid>
            ))}
        </Grid>

        {/*<EditNoteModal
          isOpen={open}
          data={note}
          isEdit={true}
          onUpdateNote={this.props.onUpdateNote}
          onClose={() => this.setState({ open: false })}
        />*/}
      </main>
    );
  }
}

export default withStyles(styles)(AppContainer);
