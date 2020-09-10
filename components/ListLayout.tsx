import Layout from "@components/Layout";
import Drawer from "@components/Drawer";

const ListLayout = ({ children }) => {
  return (
    <Layout>
      {children}
      <Drawer />
    </Layout>
  );
};

export default ListLayout;
