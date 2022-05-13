import { Grid, Typography } from "@mui/material";
import { Theme } from "@mui/material/styles";

import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";

import ModificationRequest from "@components/BlogPostLayout/ModificationRequest";
import AmpAdsense from "@components/amp/AmpAdsense";
import RecommendPost from "@components/RecommendPost";

import { basePath } from "@libs/api";

import { Meta } from "./Props";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    contents: {
      [theme.breakpoints.up("sm")]: {
        marginRight: 240,
      },
    },
    socialshare_container: {
      textAlign: "left",
      [theme.breakpoints.up("sm")]: {
        textAlign: "right",
      },
    },
    socialshare_button: {
      borderRadius: "30px",
      margin: "0.1rem",
    },
  })
);

const BlogPostContentFooter: React.VFC<Meta> = (meta) => {
  const classes = useStyles();
  const { category, uuid } = meta;

  return (
    <Grid container spacing={2} className="markdown-body">
      <Grid item xs={12}>
        <div className={classes.socialshare_container}>
          <amp-social-share
            type="twitter"
            className={classes.socialshare_button}
            aria-label="twitterShare"
            width="40"
            height="40"
          />
          <amp-social-share
            className={classes.socialshare_button}
            type="facebook"
            aria-label="facebookShare"
            width="40"
            height="40"
          />
          <amp-social-share
            className={classes.socialshare_button}
            type="line"
            aria-label="lineShare"
            width="40"
            height="40"
          />
        </div>
      </Grid>

      <Grid item xs={12}>
        <AmpAdsense />
      </Grid>
      <Grid item md={6} />
      <Grid item xs={12} md={6}>
        <ModificationRequest />
      </Grid>
    </Grid>
  );
};

export default BlogPostContentFooter;
