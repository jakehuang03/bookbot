import * as React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateBook, deleteBook, getMyBooks } from "../../../actions/books";
import { useNavigate } from "react-router-dom";

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
  const { book, fetchUpdatedBook } = props;
  const user = JSON.parse(localStorage.getItem("profile"));
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleIconClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = async (action) => {
    handleMenuClose();
    if(action === "Publish" || action === "Unpublish") {
      await dispatch(updateBook(user.user, book.BookId, !book.Published));
      await fetchUpdatedBook();
      // dispatch(getMyBooks(user.user));
    }
    else if(action === "Delete") {
      await dispatch(deleteBook(user.user, book.BookId));
      // dispatch(getMyBooks(user.user));
      navigate("/mybooks");
    }
  };

  return (
    <Box
      className="profile-top bg-primary"
      sx={{
        position: "relative",
        p: { xs: 1, md: 2 },
        mt: { xs: 2, md: 4 },
      }}
    >
    {(user?.user === book.UserId) ? (
     <div>
        <IconButton
            aria-label="more"
            aria-controls="book-menu"
            aria-haspopup="true"
            onClick={handleIconClick}
            style={{ position: "absolute", bottom: 40, right: 0, color: "white" } }
          >
            <MoreVertIcon  sx={{ fontSize: 40 }}/>
          </IconButton>
      </div>) : null }
      <div>
        <Typography variant="h3" gutterBottom style={{ color: "white" }}>
          {book.BookName}
        </Typography>
      </div>

      {(user?.user === book.UserId) ? (<Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleMenuClick('Publish')}>
        {book.Published ? "Unpublish" : "Publish"}
          </MenuItem>
        <MenuItem onClick={() => handleMenuClick('Delete')}>Delete</MenuItem>
      </Menu>) : (<div></div>)}
        
        
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
    BookId: PropTypes.number,
    BookName: PropTypes.string,
    Author: PropTypes.string,
    BookContent: PropTypes.string,
  }),
};

export default CurrentBook;
