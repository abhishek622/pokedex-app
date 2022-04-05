import { Typography } from "@mui/material";
import React from "react";

function Header() {
  return (
    <div
      style={{
        marginBottom: "1rem",
        textAlign: "center",
      }}
    >
      <Typography variant="h3" gutterBottom>
        POKEDEX
      </Typography>
    </div>
  );
}

export default Header;
