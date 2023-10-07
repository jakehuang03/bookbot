import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import CurrentBook from "./CurrentBook";
import PastQuestion from "./PastQuestion";
import AskQuestion from "./AskQuestion";

import { selectBook } from "../../../actions/bookbot";

import { Container, Grid } from "@mui/material";

const TempBook = {
  id: 1,
  title: "The Element of Scrum",
  author: "Chris Sims",
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: "https://source.unsplash.com/random?wallpapers",
};
//TODO: 1) get past questions for the book from database based on book id
// 2) get the user who asked the question, linked to the user profile
const QuestionList = [
  {
    id: 1,
    userAsked: "John Doe",
    question: "What is Scrum?",
    answer:
      "Scrum is an Agile framework that can help teams work together. Scrum can enable teams to learn from experiences, self-organize while working on problems, to reflect on their victories and failures, to make improvements. This Agile Scrum interview question is often used as a starter question to get the interview moving. ",
  },
  {
    id: 2,
    userAsked: "Jane Doe",
    question: "Define the roles in Scrum?",
    answer:
      "Product Owner: The product owner is an individual who is responsible for increasing the ROI by determining product features, prioritizing these features into a list, what needs to be focused on the upcoming sprint, and much more. These are constantly re-prioritized and refined. Scrum Master: This individual helps the team in learning to apply Scrum to ensure optimum business value. The scrum master removes impediments, shields the team from distractions, and enables them to adopt agile practices.",
  },
  {
    id: 3,
    userAsked: "John Doe",
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

  return (
    <Container>
      <CurrentBook book={TempBook} />
      <AskQuestion />
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {QuestionList.map((question) => (
          <PastQuestion key={question.id} pastQuestion={question} />
        ))}
      </Grid>
    </Container>
  );
}

export default BookProfile;
