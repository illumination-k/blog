import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import { Grid, IconButton } from "@mui/material";

import Link from "@components/Link";

const BlogPostContentFooter = ({ meta }) => {
  const { prev, next } = meta;

  if (!(prev || next)) {
    return <></>;
  }

  const nextNav = meta.next ? (
    <Link href={next.path}>
      {next.name}
      <IconButton>
        <NavigateNext fontSize="large" color="primary" />
      </IconButton>
    </Link>
  ) : (
    <></>
  );
  const prevNav = prev ? (
    <Link href={prev.path}>
      <IconButton>
        <NavigateBefore fontSize="large" color="primary" />
      </IconButton>
      {prev.name}
    </Link>
  ) : (
    <></>
  );

  return (
    <Grid container sx={{ marginBottom: "1rem", background: "whitesmoke" }}>
      <Grid item xs={6}>
        {prevNav}
      </Grid>
      <Grid item xs={6} sx={{ textAlign: "right" }}>
        {nextNav}
      </Grid>
    </Grid>
  );
};

export default BlogPostContentFooter;
