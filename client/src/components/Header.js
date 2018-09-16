import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const Header = () => (
  <AppBar position="static" color="primary">
    <Toolbar>
      <Typography variant="title" color="inherit">
        Notes Fencer
      </Typography>
    </Toolbar>
  </AppBar>
);

export default Header;
