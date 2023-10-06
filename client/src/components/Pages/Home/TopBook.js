import * as React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

function TopBook(props) {
  const { book } = props;

  return (
    <Paper
      sx={{
        marginBottom: 2,
        position: "relative",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url(${book.image})`,
      }}
    >
      {
        <img
          style={{ display: "none" }}
          src={book.image}
        />
      }
      <Box
        sx={{
          position: "absolute",
        }}
      />
      <Grid container>
        <Grid item md={6}>
          <Box
            sx={{
              position: "relative",
              p: { xs: 3, md: 6 },
              pr: { md: 0 },
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
            <Typography variant="h5" paragraph>
              {book.description}
            </Typography>
            <Button
              component={Link}
              to={`/books/${book.title}`}
              variant="outlined"
            >
              Continue reading...
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

TopBook.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default TopBook;
