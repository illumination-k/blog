import Layout from "@components/Layout";
import { Paper } from "@material-ui/core";
export const config = { amp: true };

const About: React.FC<{}> = () => {
  return (
    <Layout>
      <h1 style={{ textAlign: "center" }}>About Me</h1>
      <Paper>
        <h2 style={{ textAlign: "center" }}>Profile</h2>
      </Paper>
      <Paper>
        <h2 style={{ textAlign: "center" }}>Skills</h2>
      </Paper>
    </Layout>
  );
};

export default About;
