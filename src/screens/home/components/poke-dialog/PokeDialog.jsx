import React, { Component } from "react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { POKE_IMAGE_BY_ID } from "../../../../services/api/Api.constant";
import { localStrings } from "../../../../shared/constants";

const pokeDialogContentStyle = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
};

class PokeDialog extends Component {
  constructor(props) {
    super(props);
  }

  renderDialogHeader = () => {
    return (
      <>
        <IconButton aria-label="close" onClick={this.props.handleClose}>
          <CloseIcon />
        </IconButton>
        <DialogTitle id="alert-dialog-title">
          {this.props.pokeDex.name}
        </DialogTitle>
      </>
    );
  };

  renderDialogContent = () => {
    return (
      <DialogContent>
        <img src={POKE_IMAGE_BY_ID(this.props.pokeDex.id)} alt="" />
        <div style={pokeDialogContentStyle}>
          {this.props.pokeDex.abilities.map((poke) => (
            <Typography
              variant="subtitle2"
              sx={{
                border: "1px solid black",
                padding: "5px",
              }}
              key={poke.ability.name}
            >
              {poke.ability.name}
            </Typography>
          ))}
        </div>
        <List dense>
          {this.props.pokeDex.stats.map((poke, idx) => (
            <ListItem key={idx}>
              <ListItemText primary={poke.stat.name + " : " + poke.base_stat} />
            </ListItem>
          ))}
        </List>
      </DialogContent>
    );
  };

  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {!this.props.pokeDex ? (
          <h6>{localStrings.noData}</h6>
        ) : (
          <>
            {this.renderDialogHeader()}
            {this.renderDialogContent()}
          </>
        )}
      </Dialog>
    );
  }
}

export default PokeDialog;
