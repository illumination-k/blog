import Layout from "@components/Layout";
import Drawer from "@components/Drawer";
import AmpDisplay from "@components/amp/AmpDisplay";
import Container from "@material-ui/core/Container";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import AmpSidebar from "./amp/AmpSidebar";
import { Grid } from "@material-ui/core";

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
        <div className={classes.contents}>{children}</div>
        <Grid container className={classes.contents}>
          <div style={{ marginBottom: "0.5rem" }}></div>
          <AmpDisplay xs={12} className={classes.contents} />
        </Grid>
      </Container>
      <AmpSidebar />
      <Drawer />
    </Layout>
  );
};

export default ListLayout;
