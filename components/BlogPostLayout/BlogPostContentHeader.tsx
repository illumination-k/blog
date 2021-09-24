import { Grid, Typography } from "@mui/material";
import { get_formatted_date } from "@libs/utils";

const BlogPostContentHeader = ({ meta }) => {
  // date settings
  const published = get_formatted_date(meta.published);
  const update = get_formatted_date(meta.update);
  return (
    <Grid container className="markdown-body">
      <Grid item xs={12}>
        <h1>{meta.title}</h1>
        <Typography style={{ color: "gray" }}>
          <b>published:</b> {published} <b>update:</b> {update}
        </Typography>
        <details>
          <summary>Table of Contents</summary>
          {meta.toc.map((heading, idx) => {
            return (
              <div key={idx}>
                <a href={heading.url}>
                  {`\xa0`.repeat((heading.depth - 1) * 2) + "-"}
                  &nbsp;
                  {heading.text}
                </a>
              </div>
            );
          })}
        </details>
      </Grid>
    </Grid>
  );
};

export default BlogPostContentHeader;
