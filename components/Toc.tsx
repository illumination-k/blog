import React from "react";
import Typography from "@mui/material/Typography";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

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
              {heading.value}
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
