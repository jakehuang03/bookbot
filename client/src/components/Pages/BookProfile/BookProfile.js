import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import PropTypes from "prop-types";

import { Container, Grid, Box, Typography } from "@mui/material";

import CurrentBook from "./CurrentBook";
import PastQuestion from "./PastQuestion";
import AskQuestion from "./AskQuestion";
import { getQuestionByBook } from "../../../actions/community";
import { getBook } from "../../../actions/books";


const BookProfile = ({
  getBook,
  getQuestionByBook,
  bookbot: { selectedBook, pastQuestion },
}) => {
  //get book from database based on book id
  const { bookid } = useParams();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));
  
  useEffect(() => {
    getBook(bookid, user?.user);
    getQuestionByBook(bookid);
  }, [getBook, getQuestionByBook, bookid]);

  const fetchUpdatedBook = async () => {
    await getBook(bookid, user?.user); 
  };

  return (
    <Container>
      <CurrentBook book={selectedBook} fetchUpdatedBook={fetchUpdatedBook} />
      <AskQuestion book={selectedBook} />
      <Box sx={{ mt: 2, p: 2 }} className="profile-about bg-light">
        <Typography
          variant="h5"
          align="left"
          sx={{ fontStyle: "oblique", m: 1 }}
        >
          Past Questions
        </Typography>
        {Array.isArray(pastQuestion) && pastQuestion.length > 0 ? (
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {pastQuestion.map((question) => (
              <PastQuestion key={question.QuestionID} post={question} />
            ))}
          </Grid>
        ) : (
          <p>Pose the first question about the book!</p>
        )}
      </Box>
    </Container>
  );
};

BookProfile.propTypes = {
  getBook: PropTypes.func.isRequired,
  getQuestionByBook: PropTypes.func.isRequired,
  bookbot: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  bookbot: state.bookbot,
});

export default connect(mapStateToProps, {
  getBook,
  getQuestionByBook,
})(BookProfile);
