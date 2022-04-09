import { Grid, Breadcrumbs } from "@mui/material";
import Link from "../Link";
import AmpAdsense from "../amp/AmpAdsense";
import { Meta } from "./Props";

const BlogPostHeader: React.VFC<Meta> = (meta) => {
  return (
    <Grid container className="markdown-body">
      <Grid item xs={12}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link href="/"> Home </Link>
          <Link href="/techblog/categories">Categories</Link>
          <Link href={`/techblog/categories/${meta.category}/1`}>
            {meta.category}
          </Link>
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
