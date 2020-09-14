import Layout from "@components/Layout";
import Drawer from "@components/Drawer";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";

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
      <Drawer />
    </Layout>
  );
};

export default ListLayout;
