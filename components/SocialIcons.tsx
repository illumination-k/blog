import IconButton from "@material-ui/core/IconButton";
import GitHubIcon from "@material-ui/icons/GitHub";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";

import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icons: {
      width: theme.spacing(3),
      height: theme.spacing(3),
      paddingLeft: "auto",
    },
  })
);
const SocialIcons = () => {
  const classes = useStyles();
  return (
    <>
      <IconButton
        href="https://twitter.com/IlluminationK"
        color="inherit"
        aria-label="mytwitter"
        edge="end"
      >
        <TwitterIcon
          style={{ color: "deepskyblue" }}
          className={classes.icons}
        />
      </IconButton>
      <IconButton
        href="https://github.com/illumination-k"
        aria-label="mygithub"
        edge="end"
      >
        <GitHubIcon style={{ color: "black" }} className={classes.icons} />
      </IconButton>
      <IconButton
        href="https://www.facebook.com/profile.php?id=100022204034661"
        aria-label="myfacebook"
        edge="end"
      >
        <FacebookIcon
          style={{ color: "midnightblue" }}
          className={classes.icons}
        />
      </IconButton>
    </>
  );
};

export default SocialIcons;
