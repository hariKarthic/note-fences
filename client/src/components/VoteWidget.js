import React, { PureComponent } from "react";
import fetchJsonp from "fetch-jsonp";
import Chip from "@material-ui/core/Chip";
import Favorite from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";
const voteAPI =
  "https://www.reactriot.com/entries/114-ladiz-was-haroom/vote/stats.jsonp";

class VoteWidget extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      vote_count: 0
    };
  }
  componentDidMount() {
    fetchJsonp(voteAPI)
      .then(response => {
        return response.json();
      })
      .then(voteJson => {
        this.setState({ ...voteJson });
      })
      .catch(error => {
        throw new Error("Vote api failed: ", error);
      });
  }
  handleVote = () => {
    window.location.href =
      "https://www.reactriot.com/entries/114-ladiz-was-haroom/vote";
  };
  render() {
    const { vote_count } = this.state;
    return (
      <Chip
        onClick={this.handleVote}
        style={{ fontSize: 14, fontWeight: "bold" }}
        avatar={
          <IconButton>
            <Favorite style={{ color: "red" }} />
          </IconButton>
        }
        label={vote_count}
      />
    );
  }
}

export default VoteWidget;
