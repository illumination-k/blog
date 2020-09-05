import React from "react";
import { useRouter } from "next/router";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
// import InputBase from "@material-ui/core/InputBase"; !importantを生んでそう
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import TwitterIcon from "@material-ui/icons/Twitter";
import GitHubIcon from "@material-ui/icons/GitHub";
import Container from "@material-ui/core/Container";

import Link from "../components/Link";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginBottom: "1rem",
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      textAlign: "left",
      display: "block",
    },
  })
);

export default function SearchAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: "black" }}>
        <Container>
          <Toolbar>
            {/* <Button className={classes.title} onClick={onClick} color="inherit">
              <Typography>Bioinformaticsしたい！</Typography>
            </Button> */}
            <Link href="/" className={classes.title}>
              <Button color="inherit">
                <Typography style={{ color: "white" }}>
                  Bioinformaticsしたい！
                </Typography>
              </Button>
            </Link>
            <IconButton
              href="https://twitter.com/illumination27"
              color="inherit"
            >
              <TwitterIcon style={{ color: "deepskyblue" }} />
            </IconButton>
            <IconButton href="https://github.com/illumination-k">
              <GitHubIcon style={{ color: "white" }} />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
