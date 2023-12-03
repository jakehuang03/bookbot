import { Box, Pagination } from "@mui/material";
import { useState, useEffect } from "react";
import { useStore } from "react-redux";

/**
 * Renders a pagination component for a list of sources.
 * @param {Function} props.setSources - The function to set the sources to display.
 * @param {Array} props.fullSources - The full list of sources to paginate.
 * @param {number} [props.pageSize=3] - The number of sources to display per page.
 * @returns {JSX.Element} - The pagination component.
 */
export default function SourcePagination({setSources, fullSources, pageSize=3}) {

    const count = fullSources?.length;
    const [page, setPage] = useState({
        from: 0,
        to: pageSize,
    });

    /**
     * Updates the displayed sources when the page changes.
     * @param {Object} event - The event object.
     * @param {number} value - The new page number.
     */
    const handlePageChange = (event, value) => {
        setPage({...page, from: (value - 1) * pageSize, to: value * pageSize});
    }

    useEffect(() => {
        const sliceSources = fullSources?.slice(page.from, page.to)
        setSources(sliceSources);
    },[page.from, page.to]);

  return (
    <Box sx={{ mt: 1, display: "flex", justifyContent: "center" }}>
      <Pagination count={Math.ceil(count/pageSize)} 
      onChange={handlePageChange}
      />
    </Box>
  );
}
