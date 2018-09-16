import React, { PureComponent } from "react";
import { NoteCard } from "./components";
import Grid from "@material-ui/core/Grid";
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
      note: ""
    };
  }
  render() {
    const { classes, data } = this.props;
    return (
      <main className={classes.root}>
        <Grid container spacing={16} justify="center">
          {data &&
            data.filter(item => item.note.length).map(note => (
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
