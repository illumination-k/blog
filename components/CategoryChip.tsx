import Chip from "@mui/material/Chip";

const CategoryChip = (props) => {
  const { category, ...rest } = props;
  const categoryURL = `/techblog/categories/${category}/1`;

  return (
    <Chip
      {...rest}
      label={category}
      clickable
      component="a"
      size="small"
      href={categoryURL}
      variant="outlined"
      color="primary"
    />
  );
};

export default CategoryChip;
