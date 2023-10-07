import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Book from "../SharedComponents/Book";
import SearchBar from "./SearchBar";
import GenreFilter from "./GenreFilter";

export default function BookShelf() {
  //TODO: get book list from database
  //TODO: change book list based on search query and genre filter
  const BookList = [
    {
      id: 1,
      title: "Analysis of Algorithms",
      author: "Robert Sedgewick",
      description:
        "This is a wider card with supporting text below as a natural lead-in to additional content.",
      image: "https://source.unsplash.com/random?wallpapers",
    },
    {
      id: 2,
      title: "The Art of Computer Programming",
      author: "AAA",
      description:
        "This is a wider card with supporting text below as a natural lead-in to additional content.",
      image: "https://source.unsplash.com/random?wallpapers",
    },
    {
      id: 3,
      title: "Analysis of Algorithms",
      author: "Robert Sedgewick",
      description:
        "This is a wider card with supporting text below as a natural lead-in to additional content.",
      image: "https://source.unsplash.com/random?wallpapers",
    },
    {
      id: 4,
      title: "The Art of Computer Programming",
      author: "AAA",
      description:
        "This is a wider card with supporting text below as a natural lead-in to additional content.",
      image: "https://source.unsplash.com/random?wallpapers",
    },
    {
      id: 5,
      title: "Analysis of Algorithms",
      author: "Robert Sedgewick",
      description:
        "This is a wider card with supporting text below as a natural lead-in to additional content.",
      image: "https://source.unsplash.com/random?wallpapers",
    },
    {
      id: 6,
      title: "The Art of Computer Programming",
      author: "AAA",
      description:
        "This is a wider card with supporting text below as a natural lead-in to additional content.",
      image: "https://source.unsplash.com/random?wallpapers",
    },
    {
      id: 7,
      title: "Analysis of Algorithms",
      author: "Robert Sedgewick",
      description:
        "This is a wider card with supporting text below as a natural lead-in to additional content.",
      image: "https://source.unsplash.com/random?wallpapers",
    },
    {
      id: 8,
      title: "The Art of Computer Programming",
      author: "AAA",
      description:
        "This is a wider card with supporting text below as a natural lead-in to additional content.",
      image: "https://source.unsplash.com/random?wallpapers",
    },
  ];

  return (
    <>
      <Container>
        <Typography variant="h2" align="center">
          Bookshelf
        </Typography>
      </Container>
      <div>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <SearchBar />
            <GenreFilter />
          </Grid>
        </Grid>
      </div>
      <Container sx={{ py: 8 }} maxWidth="lg">
        <Grid container spacing={4}>
          {BookList.map((book) => (
            <Book key={book.id} book={book} />
          ))}
        </Grid>
      </Container>
    </>
  );
}
