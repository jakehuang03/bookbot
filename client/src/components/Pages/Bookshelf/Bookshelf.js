import React, {useEffect} from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Book from "../SharedComponents/Book";
import SearchGenre from "./Search_Genre";
import { useSelector, useDispatch } from "react-redux";
import {getBooks} from "../../../actions/books"

export default function BookShelf() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  const {books} = useSelector((state) => state.books);
  // console.log("books: " + JSON.stringify(books));

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
        <Typography variant="h2" align="center" marginTop='30px'>
          Bookshelf
        </Typography>
      </Container>
      <div>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <SearchGenre />
          </Grid>
        </Grid>
      </div>
      <Container sx={{ py: 8 }} maxWidth="lg">
        <Grid container spacing={4}>
          {books.map((book) => (
            <Book key={book.BookId} book={book} />
          ))}
        </Grid>
      </Container>
    </>
  );
}
