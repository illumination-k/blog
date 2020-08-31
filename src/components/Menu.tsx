import Link from "next/link";

const Menu = () => {
  return (
    <div>
      <Link href="/" className="linkStyle">
        <a>Home</a>
      </Link>
      <ul className="linkStyle">
        <li>
          <Link href="/programming">
            <a>Programming</a>
          </Link>
        </li>
      </ul>

      <Link href="/about" className="linkStyle">
        <a>About</a>
      </Link>
    </div>
  );
};

export default Menu;
