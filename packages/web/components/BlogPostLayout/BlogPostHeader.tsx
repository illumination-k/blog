import TagChip from "@components/TagChip";
import { Breadcrumbs, Grid } from "@mui/material";
import AmpAdsense from "../amp/AmpAdsense";
import Link from "../Link";
import { Meta } from "./Props";

const BlogPostHeader: React.VFC<Meta> = (meta) => {
  const tags = meta.tags.map((tag, i) => <TagChip style={{ margin: "0.1rem" }} key={i} tag={tag} />);

  return (
    <Grid container className="markdown-body">
      <Grid item xs={12}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link href="/">Home</Link>
          <Link href="/techblog/page/1">Techblog</Link>
          <p>{meta.title}</p>
        </Breadcrumbs>
      </Grid>
      <Grid item xs={12}>
        <AmpAdsense />
      </Grid>
      <Grid item xs={12}>
        {tags}
      </Grid>
    </Grid>
  );
};

export default BlogPostHeader;
