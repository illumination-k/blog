import Card from "@material-ui/core/Card";
import Link from "@components/Link";
import Buttun from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import { CardHeader, CardActions } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const BlogPostCard = ({ meta, url }) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Link href={url}>
          <Buttun color="inherit">
            <Typography variant="h5" style={{ color: "black" }}>
              {meta.title}
            </Typography>
          </Buttun>
        </Link>
        <Typography>{meta.description}</Typography>
      </CardContent>
    </Card>
  );
};

export default BlogPostCard;
