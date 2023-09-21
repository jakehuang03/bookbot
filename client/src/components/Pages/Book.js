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

export default function Book() {
  const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <>
      <Container maxWidth="sm">
        <Typography
          variant="h2"
          align="center"
          color="text.primary"
        >
          Bookshelf
        </Typography>
      </Container>
      <div>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Button variant="contained" color="primary">
              Add Genre Filter
            </Button>
          </Grid>
        </Grid>
      </div>
      <Container sx={{ py: 8 }} maxWidth="md">
      <Grid container spacing={2}>
        {cards.map((card) => (
          <Grid item key={card} xs={12} sm={6} md={4} >
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardMedia
                sx={{
                  // 16:9
                  pt: "56.25%",
                }}
                className={ClassNames.cardMedia}
                image="https://source.unsplash.com/random"
                title="Book Cover"
              />
              <CardContent className={ClassNames.cardContent} sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5">
                  Book Title
                </Typography>
                <Typography gutterBottom variant="h6">
                  Book Author
                </Typography>
                <Typography>
                    Book Description
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  Save
                </Button>
                <Button size="small" color="primary">
                  Comment
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
        </Grid>
      </Container>
    </>
  );
}
