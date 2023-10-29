import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import CurrentBook from "./CurrentBook";
import PastQuestion from "./PastQuestion";
import AskQuestion from "./AskQuestion";

import { selectBook } from "../../../actions/bookbot";
import { getQuestionByBook } from "../../../actions/community";
import { Container, Grid, Box, Typography } from "@mui/material";

const TempBook = {
  id: 10,
  title: "The Elements of Scrum.pdf",
  author: "Chris Sims",
  description:
    "A comprehensive guide to Scrum, breaking it down into its essential components. The book explores the key roles within Scrum, including the Product Owner, ScrumMaster, and Development Team, as well as the critical artifacts such as the Product Backlog, Sprint Backlog, and Increment.",
  image: "https://source.unsplash.com/random?wallpapers",
};
//1) get past questions for the book from database based on book id
// 2) get the user who asked the question, linked to the user profile

function BookProfile() {
  //TODO: get book from database based on book id
  const { bookid } = useParams();
  const dispatch = useDispatch();
  dispatch(selectBook(TempBook));
  // get past questions for the book from database based on book id
  dispatch(getQuestionByBook(bookid));
  const QuestionList = JSON.parse(sessionStorage.getItem("pastQuestion"));
  console.log(QuestionList)
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
