const AmpAvator = ({ width, height, src, srcset, alt }) => {
  return (
    <>
      <amp-img
        width={width}
        height={height}
        src={src}
        srcset={srcset}
        className="avator"
        alt={alt}
      />
      <style jsx>{`
        .avator {
          border-radius: 50%; /* 角丸半径を50%にする(=円形にする) */
          width: 180rem; /* ※縦横を同値に */
          height: 180rem; /* ※縦横を同値に */
        }
      `}</style>
    </>
  );
};

export default AmpAvator;
