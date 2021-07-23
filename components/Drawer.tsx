import React from "react";
import Link from "next/link";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";

import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";

import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

import Typography from "@material-ui/core/Typography";

import HomeIcon from "@material-ui/icons/Home";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

import AmpSearchForm from "@components/amp/AmpSearchForm";
import Ofuse from "@components/Ofuse";
import { Book } from "@material-ui/icons";

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
          <Typography variant="h2" style={{ fontSize: "1.7em" }}>
            Site Map
          </Typography>
          <List>
            <ListItem button>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <Link href={"/"}>
                <a>Top</a>
              </Link>
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <Book />
              </ListItemIcon>
              <Link href={"/posts"}>
                <a>Blog</a>
              </Link>
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <NavigateNextIcon />
              </ListItemIcon>
              <Link href={"/categories"}>
                <a>Categories</a>
              </Link>
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <NavigateNextIcon />
              </ListItemIcon>
              <Link href={"/archive"}>
                <a>Archive</a>
              </Link>
            </ListItem>
          </List>
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
