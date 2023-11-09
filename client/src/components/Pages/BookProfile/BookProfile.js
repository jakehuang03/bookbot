import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Container, Grid, Box, Typography } from "@mui/material";

import CurrentBook from "./CurrentBook";
import PastQuestion from "./PastQuestion";
import AskQuestion from "./AskQuestion";
import { getQuestionByBook } from "../../../actions/community";
import { getBook } from "../../../actions/books";
import { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
/**
 * Renders the BookProfile component which displays the current book, allows users to ask questions about the book,
 * and displays past questions related to the book.
 * @returns {JSX.Element} BookProfile component
 */

const BookProfile = ({
  getBook,
  getQuestionByBook,
  bookbot : { selectedBook, pastQuestion },
}) => {
  //get book from database based on book id
  const { bookid } = useParams();

  useEffect(() => {
		getBook(bookid);
		getQuestionByBook(bookid);
	}, [getBook, getQuestionByBook, bookid]);
  
  return (
    <Container>
      <CurrentBook book={selectedBook} />
      <AskQuestion book={selectedBook} />
      <Box sx={{ mt: 2, p: 2 }} className="profile-about bg-light">
        <Typography
          variant="h5"
          align="left"
          sx={{ fontStyle: "oblique", m: 1 }}
        >
          Past Questions
        </Typography>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          { Array.isArray(pastQuestion) 
          ? pastQuestion.map((question) => (
            <PastQuestion key={question.QuestionID} pastQuestion={question} />
          ))
          : []}
        </Grid>
      </Box>
    </Container>
  );
}

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

