import Chip from "@material-ui/core/Chip";

const CategoryChip = ({ category }) => {
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
    />
  );
};

export default CategoryChip;
