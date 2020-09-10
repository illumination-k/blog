import Card from "@material-ui/core/Card";
import Link from "@components/Link";
import Buttun from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const BlogPostCard = ({ meta, url }) => {
  const title = (
    //@ts-ignore
    <Link href={url} rel={url}>
      <Buttun color="inherit">
        <Typography variant="h5" style={{ color: "black" }}>
          {meta.title}
        </Typography>
      </Buttun>
    </Link>
  );
  return (
    <Card variant="outlined">
      <CardContent>
        {title}
        <Typography>{meta.description}</Typography>
      </CardContent>
    </Card>
  );
};

export default BlogPostCard;
