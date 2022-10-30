import { Card, CardContent, Typography } from "@mui/material";
import Ofuse from "../Ofuse";

const ModificationRequest = () => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography style={{ fontSize: 15, marginBottom: "" }}>
          記事に間違い等ありましたら、お気軽に以下までご連絡ください
        </Typography>
        <p style={{ margin: 0 }}>
          E-mail: illumination.k.27|gmail.com (&quot;|&quot; replaced to &quot;@&quot;)
        </p>
        <p style={{ margin: 0 }}>Twitter: @illuminationK</p>
        <Ofuse />
      </CardContent>
    </Card>
  );
};

export default ModificationRequest;
