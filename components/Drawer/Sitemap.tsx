import { Home, NavigateNext, Book } from "@material-ui/icons";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
import Link from "@components/Link";

interface sitemap {
  icon: React.ReactElement;
  href: string;
  a: string;
}

interface sitemapArr extends Array<sitemap> {}

const Sitemap = () => {
  const sitemap_elememts: sitemapArr = [
    {
      icon: <Home />,
      href: "/",
      a: "Home",
    },
    {
      icon: <Book />,
      href: "/posts",
      a: "Blog",
    },
    {
      icon: <NavigateNext />,
      href: "/categories",
      a: "Categories",
    },
    {
      icon: <NavigateNext />,
      href: "/archive",
      a: "Archive",
    },
  ];

  const sitemaps = sitemap_elememts.map((sitemap, index) => {
    return (
      <ListItem key={index}>
        <ListItemIcon>{sitemap.icon}</ListItemIcon>
        <ListItemText primary={<Link href={sitemap.href}>{sitemap.a}</Link>} />
      </ListItem>
    );
  });

  return (
    <>
      <Typography variant="h2" style={{ fontSize: "1.7em" }}>
        Site Map
      </Typography>

      <List>{sitemaps}</List>
    </>
  );
};

export default Sitemap;
