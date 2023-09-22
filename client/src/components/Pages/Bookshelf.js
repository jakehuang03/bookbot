import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import {
  Box,
  Button,
  CardContent,
  Card,
  CardMedia,
  CardActions,
} from "@mui/material";
import { ClassNames } from "@emotion/react";
import Book from "./Book";

export default function BookShelf() {
  const RecommendBooks = [
    {
      title: "Analysis of Algorithms",
      author: "Robert Sedgewick",
      description:
        "This is a wider card with supporting text below as a natural lead-in to additional content.",
      image: "https://source.unsplash.com/random?wallpapers",
      imageLabel: "Image Text",
    },
    {
      title: "The Art of Computer Programming",
      author: "AAA",
      description:
        "This is a wider card with supporting text below as a natural lead-in to additional content.",
      image: "https://source.unsplash.com/random?wallpapers",
      imageLabel: "Image Text",
    },
    {
      title: "Analysis of Algorithms",
      author: "Robert Sedgewick",
      description:
        "This is a wider card with supporting text below as a natural lead-in to additional content.",
      image: "https://source.unsplash.com/random?wallpapers",
      imageLabel: "Image Text",
    },
    {
      title: "The Art of Computer Programming",
      author: "AAA",
      description:
        "This is a wider card with supporting text below as a natural lead-in to additional content.",
      image: "https://source.unsplash.com/random?wallpapers",
      imageLabel: "Image Text",
    },
    {
      title: "Analysis of Algorithms",
      author: "Robert Sedgewick",
      description:
        "This is a wider card with supporting text below as a natural lead-in to additional content.",
      image: "https://source.unsplash.com/random?wallpapers",
      imageLabel: "Image Text",
    },
    {
      title: "The Art of Computer Programming",
      author: "AAA",
      description:
        "This is a wider card with supporting text below as a natural lead-in to additional content.",
      image: "https://source.unsplash.com/random?wallpapers",
      imageLabel: "Image Text",
    },
  ];

  return (
    <>
      <Container maxWidth="sm">
        <Typography variant="h2" align="center" color="text.primary">
          Bookshelf
        </Typography>
      </Container>
      <div>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Typography>Search Bar & Genre Filter</Typography>
          </Grid>
        </Grid>
      </div>
      <Container sx={{ py: 8 }} maxWidth="lg">
        <Grid container spacing={4}>
          {RecommendBooks.map((post) => (
            <Book key={post.title} post={post} />
          ))}
        </Grid>
      </Container>
    </>
  );
}
