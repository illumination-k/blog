import Layout from "@components/Layout";
import Drawer from "@components/Drawer";
import AmpDisplay from "@components/amp/AmpDisplay";
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
  return (
    <Layout>
      <Container>
        <AmpDisplay xs={12} />
        <div className={classes.contents}> {children}</div>
        <div style={{ marginBottom: "0.5rem" }}></div>
        <AmpDisplay xs={12} />
      </Container>
      <AmpSidebar />
      <Drawer />
    </Layout>
  );
};

export default ListLayout;
