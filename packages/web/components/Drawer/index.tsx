import { Theme } from "@mui/material/styles";
import React from "react";

import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";

import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";

import Sitemap from "@components/Drawer/Sitemap";
import Ofuse from "@components/Ofuse";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    drawer: {
      width: drawerWidth,
      display: "none",
      flexShrink: 0,
      whiteSpace: "nowrap",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    drawerPaper: {
      backgroundColor: "whitesmoke",
      width: drawerWidth,
    },
    drawerContainer: {
      overflow: "auto",
      padding: "1rem",
    },
  })
);

const ClippedDrawer = ({ listitems }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="right"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <Sitemap />
          {listitems}
          <br></br>
          <Ofuse />
        </div>
      </Drawer>
      <style jsx>
        {`
        a {
          text-decoration: none;
          font-size: 1.2em;
        }
      `}
      </style>
    </div>
  );
};

ClippedDrawer.defaultProps = {
  listitems: <></>,
};

export default ClippedDrawer;
