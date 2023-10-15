import * as React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function CurrentBook(props) {
  const { book } = props;

  return (
          <Box
            sx={{
              position: "relative",
              p: { xs: 1, md: 2 },
            }}
          >
            <Typography
              variant="h3"
              gutterBottom
            >
              {book.title}
            </Typography>
            <Typography
              variant="h5"
              gutterBottom
            >
              {book.author}
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              {book.description}
            </Typography>
          </Box>
  );
}

CurrentBook.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default CurrentBook;
