import { Grid, Breadcrumbs } from "@mui/material";
import Link from "../Link";
import AmpAdsense from "../amp/AmpAdsense";

const BlogPostHeader = ({ meta }) => {
  return (
    <Grid container className="markdown-body">
      <Grid item xs={12}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link href="/"> Home </Link>
          <Link href="/categories">Categories</Link>
          <Link href={`/categories/${meta.category}/1`}>{meta.category}</Link>
          <p>{meta.title}</p>
        </Breadcrumbs>
      </Grid>
      <Grid item xs={12}>
        <AmpAdsense />
      </Grid>
    </Grid>
  );
};

export default BlogPostHeader;
