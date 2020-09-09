import React from "react";

const Toc = ({ headings }) => {
  return (
    <>
      <div>
        {headings.map((heading, idx) => {
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
      </div>
    </>
  );
};

export default Toc;
