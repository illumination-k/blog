import React from "react";
import Typography from "@material-ui/core/Typography";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
const Toc = ({ headings }) => {
  return (
    <>
      {headings.map((heading, idx) => {
        return (
          <Typography key={idx}>
            <a href={heading.url}>
              {`\xa0`.repeat((heading.depth - 1) * 2)}{" "}
              <FiberManualRecordIcon
                color="primary"
                style={{ paddingTop: "0.7rem" }}
              />
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
