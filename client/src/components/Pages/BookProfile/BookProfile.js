import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import CurrentBook from "./CurrentBook";
import PastQuestion from "./PastQuestion";
import AskQuestion from "./AskQuestion";

import { selectBook } from "../../../actions/bookbot";
import { getQuestionByBook } from "../../../actions/community";
import { Container, Grid, Box, Typography } from "@mui/material";

const TempBook = {
  id: 1,
  title: "The Elements of Scrum.pdf",
  author: "Chris Sims",
  description:
    "A comprehensive guide to Scrum, breaking it down into its essential components. The book explores the key roles within Scrum, including the Product Owner, ScrumMaster, and Development Team, as well as the critical artifacts such as the Product Backlog, Sprint Backlog, and Increment.",
  image: "https://source.unsplash.com/random?wallpapers",
};
//1) get past questions for the book from database based on book id
// 2) get the user who asked the question, linked to the user profile
const QuestionList = [
  {
    id: 1,
    userAsked: "John Doe",
    timeAsked: "2021-10-01",
    question: "What is Scrum?",
    answer:
      "Scrum is an Agile framework that can help teams work together. Scrum can enable teams to learn from experiences, self-organize while working on problems, to reflect on their victories and failures, to make improvements. This Agile Scrum interview question is often used as a starter question to get the interview moving. ",
  },
  {
    id: 2,
    userAsked: "Jane Doe",
    timeAsked: "2021-10-01",
    question: "Define the roles in Scrum?",
    answer:
      "Product Owner: The product owner is an individual who is responsible for increasing the ROI by determining product features, prioritizing these features into a list, what needs to be focused on the upcoming sprint, and much more. These are constantly re-prioritized and refined. Scrum Master: This individual helps the team in learning to apply Scrum to ensure optimum business value. The scrum master removes impediments, shields the team from distractions, and enables them to adopt agile practices.",
  },
  {
    id: 3,
    userAsked: "John Doe",
    timeAsked: "2021-10-01",
    question: "What is Velocity?",
    answer:
      "Velocity is a metric used to measure the amount of work completed by a team during a sprint. It refers to the number of user stories completed in a sprint.",
  },
];

function BookProfile() {
  //TODO: get book from database based on book id
  const { bookid } = useParams();
  const dispatch = useDispatch();
  dispatch(selectBook(TempBook));
  // TODO: get past questions for the book from database based on book id
  dispatch(getQuestionByBook(bookid));

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
            <PastQuestion key={question.id} pastQuestion={question} />
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default BookProfile;
