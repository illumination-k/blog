import React from "react";
import Toolbar from "@mui/material/Toolbar";

import AmpFab from "./AmpFab";
import Sitemap from "@components/Drawer/Sitemap";

import { Theme } from "@mui/material/styles";
import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";
import MenuIcon from "@mui/icons-material/Menu";

import Ofuse from "@components/Ofuse";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      display: "block",
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
      margin: 0,
      top: "auto",
      right: 20,
      bottom: 20,
      left: "auto",
      position: "fixed",
    },
  })
);

const AmpSidebar = ({ listitems }) => {
  const classes = useStyles();
  return (
    <>
      <AmpFab
        on="tap:ampsidebar.toggle"
        variant="extended"
        aria-label="amp-fab"
        className={classes.fab}
      >
        <MenuIcon />
      </AmpFab>
      <amp-sidebar id="ampsidebar" className="ampsidebar" layout="nodisplay">
        <div style={{ padding: "1rem", backgroundColor: "white" }}>
          <Toolbar />
          <Sitemap />
          <Ofuse />
          {listitems}
        </div>
      </amp-sidebar>
    </>
  );
};

AmpSidebar.defaultProps = {
  listitems: <></>,
};

export default AmpSidebar;
