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
  Stack,
  Chip
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { POKE_IMAGE_BY_ID } from "../../../../services/api/Api.constant";
import { localStrings } from "../../../../shared/constants";

const pokeDialogContentStyle = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
};

const FlexBox = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0rem 0.8rem",
  color: "white",
};

function capitalizeLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

class PokeDialog extends Component {
  constructor(props) {
    super(props);
  }

  renderDialogHeader = () => {
    return (
      <div style={FlexBox}>
        <DialogTitle id="alert-dialog-title">
          {capitalizeLetter(this.props.pokeDex.name)}
        </DialogTitle>
        <IconButton aria-label="close" onClick={this.props.handleClose}>
          <CloseIcon color="default" />
        </IconButton>
      </div>
    );
  };

  renderDialogContent = () => {
    return (
      <DialogContent>
        <Stack direction="row" spacing={5} sx={{ marginBottom: "1rem" }}>
          <img
            src={POKE_IMAGE_BY_ID(this.props.pokeDex.id)}
            alt=""
            height="120"
            width="120"
          />
          <Stack spacing={1} justifyContent="center">
              {this.props.pokeDex.abilities.map(poke => (
                <Chip
                  label={poke.ability.name}
                  key={poke.ability.name}
                  color="primary"

                />
              ))}
          </Stack>
        </Stack>
          {this.props.pokeDex.stats.map((poke, idx) => (
            <div style={FlexBox}>
            <Typography variant="subtitle1">
              {capitalizeLetter(poke.stat.name)}:
            </Typography>
            <Typography variant="subtitle2">
              {poke.base_stat}
            </Typography>
            </div>

          ))}
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
        sx={{'& .MuiPaper-root':{borderRadius: "1rem",backgroundColor: "#595761"},'& .MuiDialogContent-root':{padding:"10px 24px"}}}
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
