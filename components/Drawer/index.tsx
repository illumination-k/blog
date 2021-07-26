import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";

import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";

import AmpSearchForm from "@components/amp/AmpSearchForm";
import Ofuse from "@components/Ofuse";
import Sitemap from "@components/Drawer/Sitemap";

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
          <AmpSearchForm />
          {listitems}
          <br></br>
          <Ofuse />
        </div>
      </Drawer>
      <style jsx>{`
        a {
          text-decoration: none;
          font-size: 1.2em;
        }
      `}</style>
    </div>
  );
};

ClippedDrawer.defaultProps = {
  listitems: <></>,
};

export default ClippedDrawer;
