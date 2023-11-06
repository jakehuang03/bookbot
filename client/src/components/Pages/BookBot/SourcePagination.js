import { Box, Pagination } from "@mui/material";
import { useState, useEffect } from "react";

export default function SourcePagination({setSources, fullSources, pageSize=3}) {
    const count = fullSources?.length;
    const [page, setPage] = useState({
        from: 0,
        to: pageSize,
    });
    useEffect(() => {
        const sliceSources = fullSources?.slice(page.from, page.to)
        setSources(sliceSources);
    },[page.from, page.to]);

    const handlePageChange = (event, value) => {
        setPage({...page, from: (value - 1) * pageSize, to: value * pageSize});
    }

  return (
    <Box sx={{ mt: 1, display: "flex", justifyContent: "center" }}>
      <Pagination count={Math.ceil(count/pageSize)} 
      onChange={handlePageChange}
      />
    </Box>
  );
}
