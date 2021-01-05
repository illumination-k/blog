import Layout from "@components/Layout";
import { Paper, Typography } from "@material-ui/core";
export const config = { amp: true };

const About: React.FC<{}> = () => {
  return (
    <Layout>
      <h1 style={{ textAlign: "center" }}>About Me</h1>
      <Paper style={{ textAlign: "center" }}>
        <h2 style={{ textAlign: "center" }}>Profile</h2>
        <Typography>Name: illumination-k</Typography>
        <Typography>University: Kyoto University</Typography>
        <Typography>Faculty: Graduate School of Biostudies</Typography>
        <Typography>Mail: illumination.k.27|gmail.com (| {"->"} @)</Typography>
      </Paper>
      <Paper>
        <h2 style={{ textAlign: "center" }}>Skills</h2>
      </Paper>
    </Layout>
  );
};

export default About;
