import Card from "@material-ui/core/Card";
import Link from "@components/Link";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import { get_formatted_date } from "@libs/utils";

const BlogPostCard = ({ meta, url }) => {
  // description settings
  const maxLength = 120;
  let description: string = meta.description;
  if (description.length > maxLength) {
    description = description.substring(0, maxLength) + "...";
  }

  // title settings
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

  // date settings
  const published = get_formatted_date(meta.published);
  const update = get_formatted_date(meta.update);

  return (
    <Card variant="outlined">
      <CardContent>
        {title}
        <Typography>{description}</Typography>
        <Typography style={{ color: "gray", fontSize: "1em" }}>
          published: {published} update: {update}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BlogPostCard;
