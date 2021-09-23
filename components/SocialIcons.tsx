import IconButton from "@mui/material/IconButton";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";

import { Theme } from "@mui/material/styles";
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
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
  return <>
    <IconButton
      href="https://twitter.com/IlluminationK"
      color="inherit"
      aria-label="mytwitter"
      edge="end"
      size="large">
      <TwitterIcon
        style={{ color: "deepskyblue" }}
        className={classes.icons}
      />
    </IconButton>
    <IconButton
      href="https://github.com/illumination-k"
      aria-label="mygithub"
      edge="end"
      size="large">
      <GitHubIcon style={{ color: "black" }} className={classes.icons} />
    </IconButton>
    <IconButton
      href="https://www.facebook.com/profile.php?id=100022204034661"
      aria-label="myfacebook"
      edge="end"
      size="large">
      <FacebookIcon
        style={{ color: "midnightblue" }}
        className={classes.icons}
      />
    </IconButton>
  </>;
};

export default SocialIcons;
