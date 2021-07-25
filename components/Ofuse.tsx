import Link from "@components/Link";

const Ofuse = () => {
  return (
    <>
      <p style={{ whiteSpace: "normal" }}>
        当HPを応援してくれる方は下のリンクからお布施をいただけると非常に励みになります。
      </p>

      <Link href="https://ofuse.me/illuminationk">
        <span style={{ textAlign: "center" }}>
          <b>Ofuse</b>
        </span>
      </Link>
    </>
  );
};

export default Ofuse;
