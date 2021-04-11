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

import AmpSearchForm from "@components/amp/AmpSearchForm";

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
          <AmpSearchForm />
          {listitems}
          <br></br>
          <p>
            当HPを応援してくれる方は下のリンクからお布施をいただけると非常に励みになります。
          </p>
          <b>
            <a
              href="https://ofuse.me/illuminationk"
              style={{ textAlign: "center" }}
            >
              ofuse
            </a>
          </b>
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
