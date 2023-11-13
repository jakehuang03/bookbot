import * as React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Link as RouterLink } from "react-router-dom";
import defaultCover from '../../../images/Default Book Cover.jpg';

function Book(props) {
  const { book } = props;
  const image = book?.image ? book.image : defaultCover;

  const handleImageError = (e) => {
    e.target.onerror = null; 
    e.target.src = defaultCover;
  }
  
  return (
    <Grid item xs={6} md={3}>
      <CardActionArea component={RouterLink} to={`/books/${book.BookId}`}>
        <Card >
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
            {/* <Typography variant="h6" color="text.secondary">
              {book.Author}
            </Typography>
            <Typography variant="h6" noWrap>
              {book.BookContent}
            </Typography> */}
          </CardContent>
        </Card>
      </CardActionArea>
    </Grid>
  );
}

Book.propTypes = {
  book: PropTypes.shape({
    BookId: PropTypes.number.isRequired,
    BookName: PropTypes.string.isRequired,
    Author: PropTypes.string,
    BookContent: PropTypes.string,
    // image: PropTypes.string.isRequired,
  }).isRequired,
};

export default Book;
