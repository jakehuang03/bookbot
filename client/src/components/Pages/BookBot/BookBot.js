import CurrentBook from "../BookProfile/CurrentBook";
import Answer from "./Answer";
import Source from "./Source";
import Question from "./Question";
import { Typography, Container, Grid, Box, Pagination } from "@mui/material";
import SourcePagination from "./SourcePagination";
import { useState } from "react";

function BookBot() {
  const book = JSON.parse(sessionStorage.getItem("selectedBook"));
  const question = JSON.parse(sessionStorage.getItem("question"));
  const answers = JSON.parse(sessionStorage.getItem("answer"));
  const extractedpars = JSON.parse(sessionStorage.getItem("extractedpar"));
  const user = JSON.parse(localStorage.getItem("profile"));

  const [sources, setSources] = useState([]);

  if (!book || !question || !answers) {
    return null;
  } else {
    return (
      <Container>
        <CurrentBook book={book} />
        <Box
          sx={{
            mt: 2,
            p: 2,
          }}
          className="profile-about bg-light"
        >
          <Question question={question} user={user} />
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {Array.isArray(answers)
              ? answers.map((answer) => (
                  <Answer key={answer.id} Answer={answer} />
                ))
              : []}
          </Grid>
          <Grid
          sx = {{mt: 2}}
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1}}
          >
            {Array.isArray(sources)
              ? sources.map((source) => (
                  <Source key={source.id} Source={source} />
                ))
              : []}
          </Grid>
          <SourcePagination setSources={setSources} fullSources={extractedpars}/>
        </Box>
      </Container>
    );
  }
}

// BookBot.propTypes = {
//   book: PropTypes.shape({
//     id: PropTypes.number.isRequired,
//     title: PropTypes.string.isRequired,
//   }).isRequired,
//   question: PropTypes.string.isRequired,
//   answer: PropTypes.shape({
//     answer1: PropTypes.string.isRequired,
//   }).isRequired,
// }

// const mapStateToProps = (state) => ({
//   book: state.bookbot.selectedBook,
//   question: state.bookbot.question,
//   answer: state.bookbot.answer,
// });
// export default connect(mapStateToProps)(BookBot);
export default BookBot;
