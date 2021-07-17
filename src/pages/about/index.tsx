import Layout from "@components/Layout";
import {
  Paper,
  Typography,
  Container,
  Chip,
  Card,
  CardHeader,
  CardContent,
} from "@material-ui/core";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";

export const config = { amp: true };

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      margin: "1rem",
    },
    chips: {
      "& > *": {
        margin: theme.spacing(0.25),
      },
    },
  })
);

const SkillCard = ({ title, children }) => {
  const classes = useStyles();
  return (
    <>
      <Card className={classes.card}>
        <CardHeader title={title} />
        <CardContent className={classes.chips}>{children}</CardContent>
      </Card>
    </>
  );
};

const About: React.FC<{}> = () => {
  const classes = useStyles();

  const languages = ["Python", "R", "Rust", "Javascript", "SQL"];
  const markupLanguages = ["HTML", "CSS"];
  const database = ["MySQL", "SQLite3", "Mongo", "Redis"];
  const frameworks = ["Django", "React", "Next.js"];
  const bioinfomatics = [
    "RNA-seq",
    "Chip-seq",
    "ATAC-seq",
    "miRNA-seq",
    "single cell RNA-seq",
    "Variant Calling",
    "htslib",
    "Phylogeny",
  ];

  return (
    <Layout>
      <Container maxWidth="sm">
        <h1 style={{ textAlign: "center" }}>About Me</h1>
        <Paper style={{ textAlign: "center" }}>
          <h2 style={{ textAlign: "center" }}>Profile</h2>
          <Typography>Name: illumination-k</Typography>
          <Typography>University: Kyoto University</Typography>
          <Typography>Faculty: Graduate School of Biostudies</Typography>
          <Typography>
            Mail: illumination.k.27|gmail.com (| {"->"} @)
          </Typography>
        </Paper>
        <Paper style={{ textAlign: "center", margin: "0.2rem" }}>
          <h2>Skills</h2>
          <SkillCard title="Programming Language">
            {languages.map((v, i) => (
              <Chip label={v} key={i} color="primary" />
            ))}
          </SkillCard>

          <SkillCard title="Markup Language">
            {markupLanguages.map((v, i) => (
              <Chip label={v} key={i} variant="outlined" color="primary" />
            ))}
          </SkillCard>

          <SkillCard title="DataBase">
            {database.map((v, i) => (
              <Chip label={v} key={i} variant="outlined" color="default" />
            ))}
          </SkillCard>

          <SkillCard title="Framework">
            {frameworks.map((v, i) => (
              <Chip label={v} key={i} color="default" />
            ))}
          </SkillCard>

          <SkillCard title="Bioinformatics">
            {bioinfomatics.map((v, i) => (
              <Chip label={v} key={i} color="secondary" />
            ))}
          </SkillCard>
        </Paper>
      </Container>
    </Layout>
  );
};

export async function getStatciProps() {
  const fs = require("fs");
  const yaml = require("js-yaml");
  const profilesFile = fs.readFileSync(process.cwd(), "data", "profiles.yaml");
  console.log(profilesFile);

  return {
    props: "test",
  };
}

export default About;
