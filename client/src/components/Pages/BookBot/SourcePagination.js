import { Box, Pagination } from "@mui/material";
import { useState, useEffect } from "react";

export default function SourcePagination({setSources}) {
    const fullSources = JSON.parse(sessionStorage.getItem("extractedpar"));
    const count = fullSources.length;
    console.log(count);
    const pageSize = 3;
    const [page, setPage] = useState({
        from: 0,
        to: pageSize,
    });
    useEffect(() => {
        const sliceSources = fullSources.slice(page.from, page.to)
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
