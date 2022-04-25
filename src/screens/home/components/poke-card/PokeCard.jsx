import { Box, Button, Card, CardContent, CardMedia, Typography } from "@mui/material";
import React, { Component } from "react";
import { localStrings } from "../../../../shared/constants";
import PokeDialog from "../poke-dialog/PokeDialog";

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
      <div
      style={{
        display:"flex",
        justifyContent:"space-around",
      }}
    >
      <CardMedia
      component='img'
          image={this.props.data.sprites.front_default}
          alt={this.props.data.name}
         sx={{width:120, height:120}}
        />
        <Box sx={{display:'flex', flexDirection:'column'}}>
          <CardContent sx={{flex:'1 0 auto'}}>
        <Typography variant="h6" gutterBottom>
         {this.props.data.name}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {localStrings.xp}: {this.props.data.base_experience}
        </Typography>
        <Button size="small" onClick={this.handleClickOpen}>
          {localStrings.more}
        </Button>
        </CardContent>
        </Box>
      </div>
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
        <Card>
          {this.renderPokeDetail()}
          {this.renderPokeDialog()}
        </Card>
    );
  }
}

export default PokeCard;
