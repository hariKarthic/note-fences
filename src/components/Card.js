import React, { PureComponent } from "react";
import PropTypes from "prop-types";

class Card extends PureComponent {
  render() {
    return (
      <div className="card" onClick={this.props.onClick}>
        {this.props.data && this.props.data.text}
      </div>
    );
  }
}

Card.propTypes = {
  text: PropTypes.string
};

export default Card;
