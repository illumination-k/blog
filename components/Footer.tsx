import Link from "next/link";
import Copyright from "./Copyright";

const Footer = () => {
  return (
    <div style={{ marginTop: "1rem" }}>
      <div style={{ textAlign: "center" }}>
        <Link href="/privacypolicy">
          <a>Privacy Policy</a>
        </Link>
      </div>
      <Copyright />
      <style jsx>{`
        a {
          text-decoration: none;
          font-size: 1em;
          color: gray;
        }
      `}</style>
    </div>
  );
};

export default Footer;
