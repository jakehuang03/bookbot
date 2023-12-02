/**
 * BookBot component displays the book information, user question, answers, sources, and pagination.
 *
 * @param {Object} auth - The authentication object containing user and avatar information.
 * @param {Object} bookbot - The bookbot object containing selectedBook, question, answer, and extractedpar information.
 * @returns {JSX.Element} The BookBot component.
 */

import { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Container, Grid, Box } from "@mui/material";
import CurrentBook from "../BookProfile/CurrentBook";
import Answer from "./Answer";
import Source from "./Source";
import Question from "./Question";
import SourcePagination from "./SourcePagination";
import Spinner from "../../layout/Spinner";
import { getBook } from "../../../actions/books";

const BookBot = ({
  auth: { user, avatar },
  bookbot: { selectedBook, question, answer, extractedpar },
}) => {
  const [sources, setSources] = useState([]);
  const fetchUpdatedBook = async () => {
    await getBook(selectedBook.bookId, user?.user);
  };

  // if (Object.keys(selectedBook).length === 0 || question === "") {
  // const selectedBook = JSON.parse(sessionStorage.getItem("selectedBook"));
  // const question = JSON.parse(sessionStorage.getItem("question"));
  // const answers = JSON.parse(sessionStorage.getItem("answer"));
  // const extractedpars = JSON.parse(sessionStorage.getItem("extractedpar"));
  // const user = JSON.parse(localStorage.getItem("profile"));
  // }
  if (Object.keys(selectedBook).length === 0) {
    return <Spinner />;
  } else {
    return (
      <Container>
        <CurrentBook book={selectedBook} fetchUpdatedBook={fetchUpdatedBook} />
        <Box
          sx={{
            mt: 2,
            p: 2,
          }}
          className="profile-about bg-light"
        >
          <Question question={question} user={user} avatar={avatar} />
          {Array.isArray(answer) && answer.length > 0 ? (
            <div>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                {answer.map((ans) => (
                  <Answer key={ans.id} AnswerContent={ans} />
                ))}
              </Grid>
              <Grid
                sx={{ mt: 2 }}
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1 }}
              >
                {Array.isArray(sources)
                  ? sources.map((source) => (
                      <Source key={source.id} Source={source} />
                    ))
                  : []}
              </Grid>
              <SourcePagination
                setSources={setSources}
                fullSources={extractedpar}
              />
            </div>
          ) : (
            <div>
              <p>Waiting for the BookBot to respond... </p>
            </div>
          )}
        </Box>
      </Container>
    );
  }
};

BookBot.propTypes = {
  auth: PropTypes.object.isRequired,
  bookbot: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  bookbot: state.bookbot,
});

export default connect(mapStateToProps, {})(BookBot);
