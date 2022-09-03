import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import { Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";

import Link from "@components/Link";

type Props = {
  title: string;
  description: string;
  url: string;
  category: string;
  category_url: string;
  created_at: string;
  updated_at: string;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      flexGrow: 1,
    },
    chip: { marginTop: "0.1rem" },
    title: { color: "black", fontSize: "1.8em", marginBottom: "0.5rem" },
    date: {
      color: "gray",
      fontSize: "1em",
    },
  })
);

const SearchResultPost: React.VFC<Props> = ({
  title,
  description,
  url,
  category,
  category_url,
  created_at,
  updated_at,
}) => {
  const classes = useStyles();
  const chip = (
    <Chip
      label={category}
      clickable
      component="a"
      size="small"
      href={category_url}
      variant="outlined"
      color="primary"
      className={classes.chip}
    />
  );

  // title settings
  const titleChips = (
    <>
      <Grid item>{chip}</Grid>
      <Grid item>
        <Link href={url} rel="canonical">
          <Typography variant="h2" className={classes.title}>
            {title}
          </Typography>
        </Link>
      </Grid>
    </>
  );

  return (
    <Card variant="outlined">
      <CardContent>
        <Grid container spacing={1}>
          {titleChips}
          <Grid item xs={12}>
            <Typography>{description}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.date}>
              published: {created_at} update: {updated_at}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default SearchResultPost;
