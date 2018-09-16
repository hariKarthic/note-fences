import React, { PureComponent } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import VoteWidget from "./VoteWidget";

const styles = theme => ({
  grow: {
    flexGrow: 1
  }
});

class Header extends PureComponent {
  render() {
    const { classes } = this.props;
    return (
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="title" color="inherit" className={classes.grow}>
            Notes Fencer
          </Typography>
          <VoteWidget />
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(Header);
