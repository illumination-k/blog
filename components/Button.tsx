import React from "react";
import MaterialButton, { ButtonProps } from "@mui/material/Button";

interface OnProps {
  on: string;
}

type Props = ButtonProps & OnProps;

const Button: React.FC<Props> = (props) => {
  return <MaterialButton {...props} />;
};

export default Button;
