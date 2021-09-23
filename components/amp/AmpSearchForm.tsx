const AmpSearchForm = () => {
  return (
    <>
      <form
        method="get"
        action="/search"
        target="_top"
        className="search_container"
        style={{ marginBottom: "1rem", marginTop: "1rem" }}
      >
        <input
          type="text"
          name="q"
          placeholder=" search..."
          className="search"
        ></input>
      </form>
      {/* <style jsx>{`
        .search_container {
          box-sizing: border-box;
          position: relative;
          border: 1px solid #999;
          display: block;
          border-radius: 2.5px;
          height: 1.8rem;
          width: 10rem;
          overflow: hidden;
        }
        .search_container input[type="text"] {
          border: none;
          height: 2em;
        }
        .search::placeholder {
          position: relative;
        }
      `}</style> */}
    </>
  );
};

export default AmpSearchForm;
