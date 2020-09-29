import Layout from "@components/Layout";
import Drawer from "@components/Drawer";
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
      <div className={classes.contents}> {children}</div>
      <AmpSidebar />
      <Drawer />
    </Layout>
  );
};

export default ListLayout;
