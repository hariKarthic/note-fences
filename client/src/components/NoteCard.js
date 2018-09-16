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
          <Typography variant="subheading"  color="textPrimary">
            {this.props.data && this.props.data.text}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

Card.propTypes = {
  text: PropTypes.string
};

export default NoteCard;
