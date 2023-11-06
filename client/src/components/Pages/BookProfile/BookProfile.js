import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import CurrentBook from "./CurrentBook";
import PastQuestion from "./PastQuestion";
import AskQuestion from "./AskQuestion";
import { getQuestionByBook } from "../../../actions/community";
import { Container, Grid, Box, Typography } from "@mui/material";
import { getBook } from "../../../actions/books";

//1) get past questions for the book from database based on book id
// 2) get the user who asked the question, linked to the user profile

function BookProfile() {
  //get book from database based on book id
  const { bookid } = useParams();
  const dispatch = useDispatch();
  dispatch(getBook(bookid));
  const TempBook = JSON.parse(sessionStorage.getItem("selectedBook"));
  // get past questions for the book from database based on book id
  dispatch(getQuestionByBook(bookid));
  const QuestionList = JSON.parse(sessionStorage.getItem("pastQuestion"));
  return (
    <Container>
      <CurrentBook book={TempBook} />
      <AskQuestion book={TempBook} />
      <Box sx={{ mt: 2, p: 2 }} className="profile-about bg-light">
        <Typography
          variant="h5"
          align="left"
          sx={{ fontStyle: "oblique", m: 1 }}
        >
          Past Questions
        </Typography>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {QuestionList.map((question) => (
            <PastQuestion key={question.QuestionID} pastQuestion={question} />
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default BookProfile;
