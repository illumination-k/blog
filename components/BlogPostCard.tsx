import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Theme } from "@mui/material/styles";

import makeStyles from "@mui/styles/makeStyles";
import createStyles from "@mui/styles/createStyles";

import Link from "@components/Link";
import CategoryChip from "./CategoryChip";
import { getFormattedDate, trimDescription } from "@libs/utils";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      flexGrow: 1,
    },
    title: { color: "black", fontSize: "1.8em", marginBottom: "0.5rem" },
    date: {
      color: "gray",
      fontSize: "1em",
    },
  })
);

const BlogPostCard = ({ meta, url }) => {
  const classes = useStyles();

  // description settings
  const maxLength = 120;
  const description = trimDescription(meta.description, maxLength);

  const category = meta.category;

  // title settings
  const title = (
    <>
      <Grid item>
        <CategoryChip category={category} style={{ marginTop: "0.1rem" }} />
      </Grid>
      <Grid item>
        <Link href={url} rel="canonical">
          <Typography variant="h2" className={classes.title}>
            {meta.title}
          </Typography>
        </Link>
      </Grid>
    </>
  );

  // date settings
  const published = getFormattedDate(meta.published);
  const update = getFormattedDate(meta.update);

  return (
    <Card variant="outlined">
      <CardContent>
        <Grid container spacing={1}>
          {title}
          <Grid item xs={12}>
            <Typography>{description}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.date}>
              published: {published} update: {update}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default BlogPostCard;
