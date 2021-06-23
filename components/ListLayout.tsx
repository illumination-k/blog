import Layout from "@components/Layout";
import Drawer from "@components/Drawer";
import Container from "@material-ui/core/Container";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import AmpSidebar from "./amp/AmpSidebar";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    contents: {
      [theme.breakpoints.up("sm")]: {
        marginRight: 240,
      },
    },
  })
);

const ListLayout = ({ children }) => {
  const classes = useStyles();
  const ampDisplay = (
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
  );
  return (
    <Layout>
      <Container>
        {ampDisplay}
        <div className={classes.contents}> {children}</div>
        <div style={{ marginBottom: "0.5rem" }}></div>
        {ampDisplay}
      </Container>
      <AmpSidebar />
      <Drawer />
    </Layout>
  );
};

export default ListLayout;
