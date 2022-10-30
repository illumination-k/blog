import AmpDisplay from "@components/amp/AmpDisplay";
import Drawer from "@components/Drawer";
import Layout from "@components/Layout";
import { Grid } from "@mui/material";
import Container from "@mui/material/Container";
import { Theme } from "@mui/material/styles";
import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";
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

const TechblogLayout = ({ children }) => {
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

export default TechblogLayout;
