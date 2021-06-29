import Chip from "@material-ui/core/Chip";

const CategoryChip = (props) => {
  const { category, ...rest } = props;
  const categoryURL = `/categories/${category}/1`;

  return (
    <Chip
      label={category}
      clickable
      component="a"
      size="small"
      href={categoryURL}
      variant="outlined"
      color="primary"
      {...rest}
    />
  );
};

export default CategoryChip;
