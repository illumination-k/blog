import AboutMe from "@components/AboutMe";
import Link from "@components/Link";

export const config = { amp: true };

const About = () => {
  return (
    <AboutMe>
      <h1>About Me</h1>
      <p>
        Hi, I am a Ph.D. student majoring in plant molecular biology in{" "}
        <a href="http://www.plantmb.lif.kyoto-u.ac.jp">
          Laboratory of Plant Molecular Biology, Graduate School of Biostudies,
          Kyoto University
        </a>
        . My research themes are to develop the expression database and
        elucidate the gibberellin system in the basal land plant, the liverwort{" "}
        <i>Marchantia polymorpha</i>. I love both biology and programing,
        especially bioinformatics. I have skills both of wet and dry. In
        biology, I am interested in the evolution, development, and omics
        analysis. In programming, I am interested in machine learning and web
        development.
      </p>
      <ul>
        <li>
          My techblog is <Link href="/techblog/page/1">here</Link>
        </li>
        <li>
          My resume is <Link href="/about/resume">here</Link>
        </li>
      </ul>
    </AboutMe>
  );
};

export default About;
