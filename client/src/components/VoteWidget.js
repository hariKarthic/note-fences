import React, { PureComponent } from "react";
import Chip from "@material-ui/core/Chip";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import IconButton from "@material-ui/core/IconButton";
const voteAPI =
  "https://www.reactriot.com/entries/114-ladiz-was-haroom/vote/stats";

class VoteWidget extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      vote_count: 0,
      voted: false
    };
  }
  componentDidMount() {
    fetch(voteAPI)
      .then(response => {
        return response.json();
      })
      .then(voteJson => {
        console.log("json: ", voteJson);
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
    const { vote_count, voted } = this.state;
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
