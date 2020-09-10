import React from "react";
import Typography from "@material-ui/core/Typography";
const Toc = ({ headings }) => {
  return (
    <>
      {headings.map((heading, idx) => {
        return (
          <Typography key={idx}>
            <a href={heading.url}>
              {`\xa0`.repeat((heading.depth - 1) * 2) + "-"}
              &nbsp;
              {heading.text}
            </a>
          </Typography>
        );
      })}
      <style jsx>{`
        a {
          text-decoration: none;
          fontsize: 20;
          color: gray;
        }
      `}</style>
    </>
  );
};

export default Toc;
