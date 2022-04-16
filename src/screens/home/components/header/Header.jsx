import { Typography } from "@mui/material";
import React from "react";
import { localStrings } from "../../../../shared/constants";

const headerStyle = {
  marginBottom: "1rem",
  textAlign: "center",
};

function Header() {
  return (
    <div style={headerStyle}>
      <Typography variant="h3" gutterBottom>
        {localStrings.header}
      </Typography>
    </div>
  );
}

export default Header;
