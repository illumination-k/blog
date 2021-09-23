import { Grid } from "@mui/material";

const AmpDisplay = (props) => {
  return (
    <Grid item {...props}>
      <amp-ad
        width="100vw"
        height="320"
        type="adsense"
        data-ad-client="ca-pub-3483824909024831"
        data-ad-slot="9343059166"
        data-auto-format="rspv"
        data-full-width=""
      >
        {/* @ts-ignore */}
        <div overflow=""></div>
      </amp-ad>
    </Grid>
  );
};

export default AmpDisplay;
