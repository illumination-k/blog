import { NextSeo } from "next-seo";
import Head from "next/head";

import {
  Card,
  CardContent,
  CardHeader,
  Chip,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

import { Theme } from "@mui/material/styles";

import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";

export const config = { amp: true };

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    partTitle: {
      textAlign: "center",
      color: "#4682b4",
      borderBottom: "solid #b0c4de",
    },
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

const SimpleList = ({ list }) => {
  return (
    <>
      <List>
        {list.map((item, index) => (
          <>
            <ListItem key={index}>
              <ListItemText primary={item} style={{ textAlign: "center" }} />
            </ListItem>
            <Divider />
          </>
        ))}
      </List>
    </>
  );
};

const Educations = ({ education }) => {
  return (
    <List>
      {education.map((item, index) => (
        <>
          <ListItem key={index}>
            <ListItemText
              primary={item.name}
              secondary={item.date}
              style={{ textAlign: "center" }}
            />
            <Divider />
          </ListItem>
        </>
      ))}
    </List>
  );
};

const Careers = ({ careers }) => {
  return (
    <>
      <List>
        {careers.map((item, index) => (
          <>
            <ListItem key={index}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <ListItemText
                    primary={item.name}
                    secondary={`${item.period}, ${item.type}`}
                  />
                </Grid>
                <Grid item xs={6}>
                  <ListItemText primary={item.title} />
                </Grid>
              </Grid>
            </ListItem>
            <Divider />
          </>
        ))}
      </List>
    </>
  );
};

const Skills = ({ skills }) => {
  const { programingLanguages, database, frameworks, bioinfomatics } = skills;

  return (
    <>
      <SkillCard title="Programming Language">
        {programingLanguages.map((v, i) => <Chip label={v} key={i} color="primary" />)}
      </SkillCard>
      <SkillCard title="DataBase">
        {database.map((v, i) => <Chip label={v} key={i} variant="outlined" color="default" />)}
      </SkillCard>
      <SkillCard title="Framework">
        {frameworks.map((v, i) => <Chip label={v} key={i} color="default" />)}
      </SkillCard>
      <SkillCard title="Bioinformatics">
        {bioinfomatics.map((v, i) => <Chip label={v} key={i} color="secondary" />)}
      </SkillCard>
    </>
  );
};

const Resume = (props) => {
  const classes = useStyles();

  const { profile } = props;

  const education = profile.education.en;
  const careers = profile.careers.en;
  return (
    <>
      <Head>
        <link rel="canonical" href="https://illumination-k.dev/about/resume" />
      </Head>
      <NextSeo title="Resume" description="Resume" />
      <Container maxWidth="md">
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <div style={{ textAlign: "center", marginTop: "5rem" }}>
              <Typography variant="h4">
                {profile.basicInfomation.en.name}
              </Typography>
              <Typography>illumination.k.27|gmail.com (| {"->"} @)</Typography>
              <Typography>{`${profile.place.en}`}</Typography>
            </div>
          </Grid>

          <Grid item sm={6}>
            <Typography variant="h3" className={classes.partTitle}>
              Educations
            </Typography>
            <Educations education={education} />
          </Grid>

          <Grid item sm={6}>
            <Typography variant="h3" className={classes.partTitle}>
              Careers
            </Typography>
            <Careers careers={careers} />
          </Grid>
          <Grid item sm={6}>
            <Grid>
              <Typography variant="h3" className={classes.partTitle}>
                Quantifications
              </Typography>
              <SimpleList list={profile.quantifications.en} />
            </Grid>
          </Grid>
          <Grid item sm={6} style={{ textAlign: "center" }}>
            <Typography variant="h3" className={classes.partTitle}>
              Skills
            </Typography>
            <Skills skills={profile.skills} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export async function getStaticProps() {
  const fs = require("fs");
  const path = require("path");
  const yaml = require("js-yaml");
  const profilePath = path.join(process.cwd(), "data", "profiles.yaml");
  const profilesFile = fs.readFileSync(profilePath);
  const profile = yaml.load(profilesFile);

  return {
    props: { profile: profile },
  };
}

export default Resume;
