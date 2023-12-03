import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import defaultCover from '../../../images/Default Book Cover.jpg';
import { updateBook, deleteBook, getMyBooks } from "../../../actions/books";

function Book(props) {
  const { book } = props;
  const user = JSON.parse(localStorage.getItem("profile"));
  const image = book?.image ? book.image : defaultCover;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleImageError = (e) => {
    e.target.onerror = null; 
    e.target.src = defaultCover;
  }

  const handleCardClick = () => {
    if(!anchorEl) {
      navigate(`/books/${book.BookId}`);
    }
  };

  const handleIconClick = (event) => {
    event.preventDefault();
    event.stopPropagation(); 
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = async (action) => {
    handleMenuClose();
    if(action === "Publish" || action === "Unpublish") {
      await dispatch(updateBook(user.user, book.BookId, !book.Published));
      dispatch(getMyBooks(user.user));
    }
    else if(action === "Delete") {
      await dispatch(deleteBook(user.user, book.BookId));
      dispatch(getMyBooks(user.user));
    }
  };
  
  return (
    <Grid item xs={6} md={3}>
      <CardActionArea onClick={handleCardClick}>
        <Card>
          <CardMedia
            component="img"
            alt={book.BookName}
            height='160'
            image={image}
            onError={handleImageError}
          />
          <CardContent>
            <Typography variant="h5" component="div">
              {book.BookName}
            </Typography>
            <div
              style={{
                position: "absolute",
                top: "0",
                right: "0",
                backgroundColor: "white",
                padding: "5px",
                borderRadius: "5px",
                display: "inline-block",
              }}
            >
              <Typography
                variant="body2"
                color="textSecondary"
                style={{ color: "darkblue", fontWeight: "bold" }}
              >
                {book.Published ? "Published" : "Unpublished"}
              </Typography>
            </div>
            <IconButton
              aria-label="more"
              aria-controls="book-menu"
              aria-haspopup="true"
              onClick={handleIconClick}
              style={{ position: "absolute", bottom: 15, right: 0 }}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="book-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={() => handleMenuClick('Publish')}>
                {book.Published ? "Unpublish" : "Publish"}
              </MenuItem>
              <MenuItem onClick={() => handleMenuClick('Delete')}>Delete</MenuItem>
            </Menu>
          </CardContent>
        </Card>
      </CardActionArea>
    </Grid>
  );
}

export default Book;
