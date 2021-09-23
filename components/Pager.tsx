import Link from "@components/Link";
import { Box } from "@mui/material";

import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";

const Pager = ({ path, page, total_pages }) => {
  return (
    <Box sx={{ marginTop: "0.5rem" }}>
      <Pagination
        variant="outlined"
        page={page}
        count={total_pages}
        renderItem={(item) => (
          <PaginationItem
            component={Link}
            href={`${path}/${item.page === 1 ? "1" : `${item.page}`}`}
            rel="canonical"
            {...item}
          />
        )}
      />
    </Box>
  );
};

export default Pager;
