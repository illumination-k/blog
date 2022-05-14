export default function AmpAnalytics(props) {
  const { type, script, ...rest } = props;
  return (
    <>
      <amp-analytics type={type} {...rest}>
        {script && (
          <script
            type="application/json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(script),
            }}
          />
        )}
      </amp-analytics>
    </>
  );
}
