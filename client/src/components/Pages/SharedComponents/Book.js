import * as React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Link as RouterLink } from "react-router-dom";

function Book(props) {
  const { book } = props;

  return (
    <Grid item xs={6} md={3}>
      {/* TODO: Change to book profile for each book */}
      <CardActionArea component={RouterLink} to={`/books/${book.id}`}>
        <Card>
          <CardMedia
            component="img"
            alt={book.title}
            height='160'
            image={book.image}
          />
          <CardContent>
            <Typography variant="h5" component="div">
              {book.title}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              {book.author}
            </Typography>
            <Typography variant="h6" noWrap>
              {book.description}
            </Typography>
          </CardContent>
        </Card>
      </CardActionArea>
    </Grid>
  );
}

Book.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default Book;
