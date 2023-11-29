import React from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Container, Grid, Box, CircularProgress } from "@mui/material";

import { getQuestion } from "../../../actions/community";
import Post from "./Post";
import QuestionPagination from "./QuestionPagination";
import Spinner from "../../layout/Spinner";

const Community = ({ getQuestion, community: { post_list } }) => {
  const [page, setPage] = useState(0);
  useEffect(() => {
    getQuestion(page);
  }, [page]);

  return (
    <Container>
      <div className="header" style={{ marginBottom: "50px" }}>
        <h1 className="header-text">Community</h1>
      </div>
      {Array.isArray(post_list) && post_list.length > 0 ? (
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {post_list.map((post) => (
            <Post key={post.QuestionId} post={post} />
          ))}
        </Grid>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '50px'}}>
          <CircularProgress />
      </Box>
      )}
      <QuestionPagination setPage={setPage} />
    </Container>
  );
};

Community.propTypes = {
  getQuestion: PropTypes.func.isRequired,
  community: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  community: state.community,
});

export default connect(mapStateToProps, {
  getQuestion,
})(Community);
