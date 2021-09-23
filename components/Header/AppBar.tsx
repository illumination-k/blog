import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Theme } from "@mui/material/styles";
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import HomeIcon from "@mui/icons-material/Home";
import Container from "@mui/material/Container";

import Link from "@components/Link";
import AmpAvator from "@components/amp/AmpAvator";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexGrow: 1,
      marginBottom: "1rem",
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      height: "3.8rem",
    },
    menuButton: {
      textAlign: "left",
      flexGrow: 1,
      display: "block",
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
    title: {
      flexGrow: 1,
      textAlign: "left",
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
  })
);

const IconButtons = () => {
  return <>
    <Link href="/about">
      <Typography style={{ color: "white" }}>About</Typography>
    </Link>
    <IconButton href="/about" aria-label="about" edge="end" size="large">
      <AmpAvator
        width="27"
        height="27"
        src="/avatar/avatar_54x.webp"
        srcset="/avatar/avatar_54x.webp"
        alt="illumination-k"
      />
    </IconButton>
  </>;
};

export default function HeaderAppBar() {
  const classes = useStyles();

  const title = (
    <Link href="/" className={classes.title}>
      <Typography style={{ color: "white", fontSize: "2em" }}>
        illumination-dev
      </Typography>
    </Link>
  );
  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        className={classes.appBar}
        style={{ backgroundColor: "black" }}
      >
        <Container>
          <Toolbar>
            <div className={classes.menuButton}>
              <IconButton edge="start" color="inherit" aria-label="menu" href="/" size="large">
                <HomeIcon />
              </IconButton>
            </div>
            {title}
            <IconButtons />
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
