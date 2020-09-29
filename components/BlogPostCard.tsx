import Card from "@material-ui/core/Card";
import Link from "@components/Link";
import Buttun from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const BlogPostCard = ({ meta, url }) => {
  const maxLength = 120;
  let description: string = meta.description;
  if (description.length > maxLength) {
    description = description.substring(0, maxLength) + "...";
  }
  const title = (
    //@ts-ignore
    <Link href={url} rel="canonical">
      <Typography
        variant="h2"
        style={{ color: "black", fontSize: "1.8em", marginBottom: "0.5rem" }}
      >
        {meta.title}
      </Typography>
    </Link>
  );
  return (
    <Card variant="outlined">
      <CardContent>
        {title}
        <Typography>{description}</Typography>
        <Typography style={{ color: "gray", fontSize: "1em" }}>
          published: {meta.published} update: {meta.update}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BlogPostCard;
