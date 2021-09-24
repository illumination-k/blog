import BlogPostContentHeader from "./BlogPostContentHeader";
import Grid from "@mui/material/Grid";

const BlogPostContent = ({meta, children}) => {
    return <>
      <BlogPostContentHeader meta={meta} />
      <Grid container className="markdown-body">
        <Grid item xs={12}>
          {children}
        </Grid>
      </Grid>
    </>
}

export default BlogPostContent;