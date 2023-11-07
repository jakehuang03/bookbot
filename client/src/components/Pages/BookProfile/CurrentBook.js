import * as React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

/**
 * A component that displays the current book's information.
 * @param {Object} props.book - The book object containing the book's id, name, author, and content.
 * @param {number} props.book.BookId - The id of the book.
 * @param {string} props.book.BookName - The name of the book.
 * @param {string} props.book.Author - The author of the book.
 * @param {string} props.book.BookContent - The content of the book.
 * @returns {JSX.Element} - The JSX code for the component.
 */

function CurrentBook(props) {
  const { book } = props;

  return (
    <Box
      className="profile-top bg-primary"
      sx={{
        position: "relative",
        p: { xs: 1, md: 2 },
        mt: { xs: 2, md: 4 },
      }}
    >
      <Typography variant="h3" gutterBottom>
        {book.BookName}
      </Typography>
      <Typography variant="h5" gutterBottom>
        {book.Author}
      </Typography>
      <Typography variant="h6" color="inherit" paragraph>
        {book.BookContent}
      </Typography>
    </Box>
  );
}

CurrentBook.propTypes = {
  book: PropTypes.shape({
    BookId: PropTypes.number.isRequired,
    BookName: PropTypes.string.isRequired,
    Author: PropTypes.string.isRequired,
    BookContent: PropTypes.string.isRequired,
  }).isRequired,
};

export default CurrentBook;
