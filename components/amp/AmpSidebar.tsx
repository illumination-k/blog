import React from "react";
import Link from "next/link";

import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Typography from "@material-ui/core/Typography";

import HomeIcon from "@material-ui/icons/Home";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

import AmpSearchForm from "@components/amp/AmpSearchForm";
import AmpFab from "./AmpFab";
import Sitemap from "@components/Drawer/Sitemap";

import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";

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
        <div style={{ padding: "1rem" }}>
          <Toolbar />
          <AmpSearchForm />
          <Sitemap />
          <Ofuse />
          {listitems}
        </div>
      </amp-sidebar>
      <style jsx>{`
        .ampsidebar {
          background-color: white;
        }
      `}</style>
    </>
  );
};

AmpSidebar.defaultProps = {
  listitems: <></>,
};

export default AmpSidebar;
