import React from "react";
import Post from "./Post";
import { Container, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getQuestion } from "../../../actions/community";
import SourcePagination from "../BookBot/SourcePagination";
const Community = () => {
  const dispatch = useDispatch();
  dispatch(getQuestion());
  const PostList = JSON.parse(sessionStorage.getItem("post_list"));
  const [sources, setSources] = useState([]);
  return (
    <Container>
    <Typography className='bg-primary' variant="h1" align="center" sx={{ p: 4, mb:4 }}>
        Community
    </Typography>

    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      {/* {PostList.map((post) => (
        <Post key={post.id} post={post} />
      ))} */}
      {Array.isArray(sources) 
      ? sources.map((post) => (
        <Post key={post.QuestionId} post={post} />
      ))
      : []}
    </Grid>
    <SourcePagination setSources={setSources} fullSources={PostList} pageSize='5' />
    </Container>
  );
};

export default Community;
