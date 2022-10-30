import Link from "@components/Link";
import Copyright from "./Copyright";

const Footer = () => {
  return (
    <div
      style={{
        marginTop: "1rem",
        textAlign: "center",
        textDecoration: "none",
        color: "gray",
      }}
    >
      <Link href="/privacypolicy" rel="canonical">
        Privacy Policy
      </Link>
      <Copyright />
    </div>
  );
};

export default Footer;
