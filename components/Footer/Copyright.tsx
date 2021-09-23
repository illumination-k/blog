import React from "react";
import Typography from "@mui/material/Typography";

export default function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © illumination-k 2020-"}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
