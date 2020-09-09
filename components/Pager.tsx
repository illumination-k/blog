import Link from "@components/Link";
import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";

const Pager = ({ path, page, total_pages }) => {
  return (
    <Pagination
      page={page}
      count={total_pages}
      renderItem={(item) => (
        // @ts-ignore
        <PaginationItem
          component={Link}
          href={`${path}/${item.page === 1 ? "1" : `${item.page}`}`}
          {...item}
        />
      )}
    />
  );
};

export default Pager;
