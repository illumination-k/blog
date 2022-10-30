import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import { Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";

import Link from "@components/Link";
import { getFormattedDate, trimDescription } from "@libs/utils";
import TagChip from "./TagChip";

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

type Props = {
  title: string;
  category: string;
  description: string;
  created_at: string;
  updated_at: string;
  slug: string;
  tags: string[];
};

const BlogPostCard: React.VFC<Props> = ({
  title,
  slug,
  category,
  description,
  created_at,
  updated_at,
  tags,
}) => {
  const classes = useStyles();

  // description settings
  const maxLength = 120;
  const trimedDescription = trimDescription(description, maxLength);
  const url = `/techblog/posts/${slug}`;

  const tagChips = tags.map((tag, i) => {
    return <TagChip tag={tag} key={i} style={{ margin: "0.1rem" }} />;
  });

  // title settings
  const titleChips = (
    <>
      <Grid item>
        <Link href={url} rel="canonical">
          <Typography variant="h2" className={classes.title}>
            {title}
          </Typography>
        </Link>
        <Grid item>{tagChips}</Grid>
      </Grid>
    </>
  );

  // date settings
  const published = getFormattedDate(created_at);
  const update = getFormattedDate(updated_at);

  return (
    <Card variant="outlined">
      <CardContent>
        <Grid container spacing={1}>
          {titleChips}
          <Grid item xs={12}>
            <Typography>{trimedDescription}</Typography>
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
