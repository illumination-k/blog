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
    </>
  );
};

export default AmpSearchForm;
