import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import Link from "@components/Link";
import CategoryChip from "./CategoryChip";
import { get_formatted_date, trimDescription } from "@libs/utils";

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
        <CategoryChip category={category} />
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
  const published = get_formatted_date(meta.published);
  const update = get_formatted_date(meta.update);

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
