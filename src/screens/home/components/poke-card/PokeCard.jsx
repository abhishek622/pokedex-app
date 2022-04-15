import { Button, Typography } from "@mui/material";
import React, { Component } from "react";
import { localStrings } from "../../../../shared/constants";
import PokeDialog from "../poke-dialog/PokeDialog";

const pokeCardStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

class PokeCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  renderPokeDetail = () => {
    return (
      <>
        <img
          src={this.props.data.sprites.front_default}
          alt={this.props.data.name}
          height={160}
          width={160}
        />
        <Typography variant="h6" gutterBottom>
          {this.props.data.id}: {this.props.data.name}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {localStrings.xp}: {this.props.data.base_experience}
        </Typography>
        <Button size="small" onClick={this.handleClickOpen}>
          {localStrings.more}
        </Button>
      </>
    );
  };

  renderPokeDialog = () => {
    return (
      <PokeDialog
        open={this.state.open}
        handleClose={this.handleClose}
        pokeDex={this.props.data}
      />
    );
  };

  render() {
    return (
      <>
        <div style={pokeCardStyle}>
          {this.renderPokeDetail()}
          {this.renderPokeDialog()}
        </div>
      </>
    );
  }
}

export default PokeCard;
