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

import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import NavigationIcon from "@material-ui/icons/Navigation";

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
        <NavigationIcon>Navigation</NavigationIcon>
      </AmpFab>
      <amp-sidebar id="ampsidebar" className="ampsidebar" layout="nodisplay">
        <div style={{ padding: "1rem" }}>
          <Toolbar />
          <AmpSearchForm />
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
