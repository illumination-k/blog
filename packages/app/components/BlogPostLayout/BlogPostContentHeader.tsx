import { getFormattedDate } from "@libs/utils";
import { Grid, Typography } from "@mui/material";
import { Meta } from "./Props";

const BlogPostContentHeader: React.VFC<Meta> = (meta) => {
  // date settings
  const published = getFormattedDate(meta.created_at);
  const update = getFormattedDate(meta.updated_at);
  return (
    <Grid container className="markdown-body">
      <Grid item xs={12}>
        <h1>{meta.title}</h1>
        <Typography style={{ color: "gray" }}>
          <b>published:</b> {published} <b>update:</b> {update}
        </Typography>
        <details>
          <summary>Table of Contents</summary>
          {meta.headings.map((heading, idx) => {
            return (
              <div key={idx}>
                <a href={heading.url}>
                  {`\xa0`.repeat((heading.depth - 1) * 2) + "-"}
                  &nbsp;
                  {heading.value}
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
