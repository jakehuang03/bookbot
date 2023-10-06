import * as React from "react";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Book from "../SharedComponents/Book";

import TopBook from "./TopBook";
import FileUpload from "./FileUpload";

// TODO: 1) get the top 1 and recommended books, 2) calculate the top 1 and recommended books
const Top1Book = {
  id: 1,
  title: "The Element of Scrum",
  author: "Chris Sims",
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: "https://source.unsplash.com/random?wallpapers",
};

const RecommendBooks = [
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
];

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Container className="bottomhalf">
        <FileUpload />
      </Container>
      <Container className="tophalf">
        <TopBook book={Top1Book} />
      </Container>
      <Container className="middlehalf">
        <Grid container spacing={4}>
          {RecommendBooks.map((post) => (
            <Book key={post.id} post={post} /> //Grid item as card
          ))}
        </Grid>
      </Container>
    </Container>
  );
}
