export const P5 = ({ children }) => {
  return (
    <>
      <span style={{ color: "#08519c" }}>{children}</span>
    </>
  );
};

export const T7 = ({ children }) => {
  return (
    <>
      <span style={{ color: "blue" }}>{children}</span>
    </>
  );
};

export const S5 = ({ children }) => {
  return (
    <>
      <span style={{ color: "#6baed6" }}>{children}</span>
    </>
  );
};

export const P7 = ({ children }) => {
  return (
    <>
      <span style={{ color: "#a50f15" }}>{children}</span>
    </>
  );
};

export const S7 = ({ children }) => {
  return (
    <>
      <span style={{ color: "#fc9272" }}>{children}</span>
    </>
  );
};

export const Me = ({ children }) => {
  return (
    <>
      <span style={{ color: "#969696" }}>{children}</span>
    </>
  );
};

const Seq = ({ fchain, rchain, annotation }) => {
  return (
    <>
      <pre
        style={{
          backgroundColor: "#fffff0",
          color: "#000000",
          overflowX: "scroll",
          whiteSpace: "pre",
          maxWidth: "80em",
        }}
      >
        <span>5&apos;- </span>
        {fchain} - 3&apos;
        <br />
        <span>3&apos;- </span>
        {rchain} - 5&apos;
        <br />
        <span></span>
        {annotation} <br />
      </pre>
      <style jsx>
        {`
        span {
          display: inline-block;
          width: 2.2em;
        }
      `}
      </style>
    </>
  );
};

export default Seq;
