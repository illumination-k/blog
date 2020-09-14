import React from "react";
import Link from "next/link";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";

import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";

import Typography from "@material-ui/core/Typography";

import HomeIcon from "@material-ui/icons/Home";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

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
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerContainer: {
      overflow: "auto",
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
        <div className={classes.drawerContainer} style={{ padding: "1rem" }}>
          <Typography variant="h5">Site Map</Typography>
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
              <Link href={"/archive/1"}>
                <a>Archive</a>
              </Link>
            </ListItem>
          </List>
          <form
            method="get"
            action="/search"
            target="_top"
            className="search_container"
            style={{ marginBottom: "1rem", marginTop: "1rem" }}
          >
            <input
              type="text"
              name="q"
              placeholder=" search..."
              className="search"
            ></input>
          </form>
          {listitems}
        </div>
      </Drawer>
      <style jsx>{`
        a {
          text-decoration: none;
          font-size: 1.2em;
        }
        .search_container {
          box-sizing: border-box;
          position: relative;
          border: 1px solid #999;
          display: block;
          border-radius: 2.5px;
          height: 1.8rem;
          width: 10rem;
          overflow: hidden;
        }
        .search_container input[type="text"] {
          border: none;
          height: 2em;
        }
        .search::placeholder {
          position: relative;
        }
      `}</style>
    </div>
  );
};

ClippedDrawer.defaultProps = {
  listitems: <></>,
};

export default ClippedDrawer;
