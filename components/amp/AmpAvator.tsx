const AmpAvator = ({ width, height, src, srcset, alt }) => {
  return (
    <amp-img
      width={width}
      height={height}
      src={src}
      srcset={srcset}
      className="avator"
      alt={alt}
    />
  );
};

export default AmpAvator;
