import React from "react";

import Fab, { FabProps } from "@mui/material/Fab";

interface AmpOnProps {
  on: string;
}

type Props = FabProps & AmpOnProps;

const AmpFab: React.FC<Props> = (props) => {
  return <Fab {...props} />;
};

export default AmpFab;
