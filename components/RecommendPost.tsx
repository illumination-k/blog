import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";

import CategoryChip from "./CategoryChip";
import Link from "@components/Link";
import { Typography } from "@material-ui/core";
import { trimDescription } from "@libs/utils";

const RecommendPost = ({ title, url, category, description }) => {
  const maxLength = 120;
  return (
    <Card variant="outlined" style={{ margin: "1rem" }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item>
            <CategoryChip category={category} />
          </Grid>
          <Grid item>
            <Link href={url} rel="canonical">
              <Typography
                variant="h3"
                style={{ color: "black", marginTop: "0.15rem" }}
              >
                {title}
              </Typography>
            </Link>
          </Grid>
          <Grid item xs={12}>
            <p>{trimDescription(description, maxLength)}</p>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default RecommendPost;
