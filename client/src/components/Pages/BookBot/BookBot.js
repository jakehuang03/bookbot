import { useState } from "react";

import { Container, Grid, Box} from "@mui/material";

import CurrentBook from "../BookProfile/CurrentBook";
import Answer from "./Answer";
import Source from "./Source";
import Question from "./Question";
import SourcePagination from "./SourcePagination";
import Spinner from "../../layout/Spinner";
import { connect } from "react-redux";
import PropTypes from "prop-types";

/**
 * Renders the BookBot component, which displays the current book, a question, a list of answers, a list of sources, and a pagination component.
 * @returns {JSX.Element} The BookBot component UI.
 */

const BookBot = ({
  auth: { user, avatar },
  bookbot: { selectedBook, question, answer, extractedpar, saved },
}) => {
  // const book = JSON.parse(sessionStorage.getItem("selectedBook"));
  // const question = JSON.parse(sessionStorage.getItem("question"));
  // const answers = JSON.parse(sessionStorage.getItem("answer"));
  // const extractedpars = JSON.parse(sessionStorage.getItem("extractedpar"));
  // const user = JSON.parse(localStorage.getItem("profile"));

  const [sources, setSources] = useState([]);

  if (selectedBook == {} || question == []|| answer == []) {
    return <Spinner />;
  } else {
    return (
      <Container>
        <CurrentBook book={selectedBook} />
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
            {Array.isArray(answer)
              ? answer.map((ans) => (
                  <Answer key={ans.id} Answer={ans} />
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
          <SourcePagination setSources={setSources} fullSources={extractedpar}/>
        </Box>
      </Container>
    );
  }
}

BookBot.propTypes = {
	auth: PropTypes.object.isRequired,
	bookbot: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	bookbot: state.bookbot,
});

export default connect(mapStateToProps, {})(BookBot);

