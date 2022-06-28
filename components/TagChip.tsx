import Chip from "@mui/material/Chip";
import { ChipProps } from "@mui/material/Chip";

type TagChipProps = {
  tag: string;
  tag_count?: string;
};

type Props = ChipProps & TagChipProps;

const TagChip = (props: Props) => {
  const { tag, tag_count, ...rest } = props;
  const tagURL = `/techblog/tags/${tag}/1`;
  let label = tag;

  if (tag_count) {
    label += ` ${tag_count}`;
  }

  return (
    //@ts-ignore
    <Chip
      {...rest}
      label={label}
      clickable
      component="a"
      href={tagURL}
      variant="outlined"
      color="info"
    />
  );
};

export default TagChip;
