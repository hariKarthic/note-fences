import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

class NoteCard extends PureComponent {
  render() {
    return (
      <Card className={this.props.cardClass}>
        <CardContent>
          <Typography color="textSecondary">
            {this.props.data && this.props.data.note}
          </Typography>
        </CardContent>
        {/*<CardActions>
          <IconButton
            onClick={this.props.onClick}
            style={{ marginLeft: "auto" }}
          >
            <EditIcon />
          </IconButton>
        </CardActions>*/}
      </Card>
    );
  }
}

Card.propTypes = {
  note: PropTypes.string
};

export default NoteCard;
