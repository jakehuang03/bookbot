import React from "react";
import Post from "./Post";
import { Container, Grid, Typography } from "@mui/material";
const PostList = [
  {
    id: 1,
    bookid: 1,
    userid: 1,
    date: "2021-10-01",
    question: "What is Scrum?",
    answer:
      "Scrum is an Agile framework that can help teams work together. Scrum can enable teams to learn from experiences, self-organize while working on problems, to reflect on their victories and failures, to make improvements. This Agile Scrum interview question is often used as a starter question to get the interview moving. ",
  },
];

const Community = () => {
  return (
    <Container>
    <Typography className='bg-primary' variant="h1" align="center" sx={{ p: 4, mb:4 }}>
        Community
    </Typography>

    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      {PostList.map((post) => (
        <Post key={post.id} Post={post} />
      ))}
    </Grid>
    </Container>
  );
};

export default Community;
