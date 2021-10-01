import BlogPostContentHeader from "./BlogPostContentHeader";
import BlogPostContentFooter from "./BlogPostContentFooter";
import Grid from "@mui/material/Grid";

const BlogPostContent = ({ meta, children }) => {
  return (
    <>
      <BlogPostContentHeader meta={meta} />
      <Grid container className="markdown-body">
        <Grid item xs={12}>
          {children}
        </Grid>
      </Grid>
      <BlogPostContentFooter meta={meta} />
    </>
  );
};

export default BlogPostContent;
