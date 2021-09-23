import React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Link from "@components/Link";
import Typography from "@mui/material/Typography";

const AtCoderLog: React.FC<{ title: string; submissions: string[] }> = ({
  title,
  submissions,
  children,
}) => {
  const Ids = title.toLocaleLowerCase().split(/-|_/);
  const contestId = Ids[0];
  const problemId = Ids[1];

  const links = submissions.map((s, i) => (
    <li key={i}>
      <Link
        href={`https://atcoder.jp/contests/${contestId}/submissions/${s}`}
      >{`submission: ${s}`}</Link>
    </li>
  ));

  return (
    <Card style={{ marginBottom: "0.5rem" }}>
      <CardContent>
        <Link
          href={`https://atcoder.jp/contests/${contestId}/tasks/${contestId}_${problemId}`}
        >
          <Typography variant="h2">{title.toUpperCase()}</Typography>
        </Link>
        <ul>{links}</ul>

        {children}
      </CardContent>
    </Card>
  );
};

export default AtCoderLog;
