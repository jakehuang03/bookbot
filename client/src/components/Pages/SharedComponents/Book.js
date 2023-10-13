import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Link as RouterLink } from 'react-router-dom'
function Book(props) {
  const { book } = props;
 
  return (
    <Grid item xs={12} md ={6}>
      {/* TODO: Change to book profile for each book */}
      <CardActionArea component={RouterLink} to={`/books/${book.bookid}`}>
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {book.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {book.author}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {book.description}
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
            image={book.image}
          />
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