import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import CurrentBook from "./CurrentBook";
import PastQuestion from "./PastQuestion";
import AskQuestion from "./AskQuestion";

import { selectBook } from "../../../actions/bookbot";

import { Container, Grid } from "@mui/material";

//TODO: get book from database based on book name or book id
const TempBook = {
  id: 1,
  title: "The Element of Scrum",
  author: "Chris Sims",
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
};
//TODO: 1) get past questions for the book from database based on book name or book id
// 2) get the user who asked the question, linked to the user profile
const QuestionList = [
  {
    id: 1,
    userAsked: "John Doe",
    question: "Analysis of Algorithms",
    answer: "Robert Sedgewick",
  },
  {
    id: 2,
    userAsked: "Jane Doe",
    question: "The Art of Computer Programming",
    answer: "AAA",
  },
  {
    id: 3,
    userAsked: "John Doe",
    question: "Analysis of Algorithms",
    answer: "Robert Sedgewick",
  },
];

function BookProfile() {
  const { bookname } = useParams();
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
