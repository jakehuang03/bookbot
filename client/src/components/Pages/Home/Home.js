import * as React from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import TopBook from "./TopBook";
import Book from "../SharedComponents/Book";
import FileUpload from "./FileUpload";

// TODO: 1) get the top 1 and recommended books, 2) calculate the top 1 and recommended books
const Top1Book = {
  title: "The Element of Scrum",
  author: "Chris Sims",
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: "https://source.unsplash.com/random?wallpapers",
};

const RecommendBooks = [
  {
    title: "Analysis of Algorithms",
    author: "Robert Sedgewick",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    image: "https://source.unsplash.com/random?wallpapers",
  },
  {
    title: "The Art of Computer Programming",
    author: "AAA",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    image: "https://source.unsplash.com/random?wallpapers",
  },
  {
    title: "Analysis of Algorithms",
    author: "Robert Sedgewick",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    image: "https://source.unsplash.com/random?wallpapers",
  },
  {
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
      <main>
        <div className="bottomhalf">
          <FileUpload />
        </div>
        <div className="tophalf">
          <div className="topbookintro">
            <TopBook post={Top1Book} />
          </div>
          <div className="topbookcover">
            <img src="https://source.unsplash.com/random?wallpapers" alt="" />
          </div>
        </div>
        <div className="middlehalf">
          <Grid container spacing={4}>
            {RecommendBooks.map((post) => (
              <Book key={post.title} post={post} />
            ))}
          </Grid>
        </div>
      </main>
    </Container>
  );
}
