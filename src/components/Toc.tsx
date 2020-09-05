import React from "react";

const Toc = ({ headings }) => {
  return (
    <details>
      <summary>Table of Contents</summary>
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
    </details>
  );
};

export default Toc;
