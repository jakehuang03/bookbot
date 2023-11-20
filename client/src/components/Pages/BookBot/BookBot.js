import { useState } from "react";

import { Container, Grid, Box} from "@mui/material";

import CurrentBook from "../BookProfile/CurrentBook";
import Answer from "./Answer";
import Source from "./Source";
import Question from "./Question";
import SourcePagination from "./SourcePagination";
import Spinner from "../../layout/Spinner";
/**
 * Renders the BookBot component, which displays the current book, a question, a list of answers, a list of sources, and a pagination component.
 * @returns {JSX.Element} The BookBot component UI.
 */

function BookBot() {
  const book = JSON.parse(sessionStorage.getItem("selectedBook"));
  const question = JSON.parse(sessionStorage.getItem("question"));
  const answers = JSON.parse(sessionStorage.getItem("answer"));
  const extractedpars = JSON.parse(sessionStorage.getItem("extractedpar"));
  const user = JSON.parse(localStorage.getItem("profile"));

  const [sources, setSources] = useState([]);

  if (!book || !question || !answers) {
    return <Spinner />;
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

export default BookBot;
