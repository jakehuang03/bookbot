import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

import { askQuestion } from "../../../actions/bookbot";

/**
 * A component that allows users to ask a question about the book book.
 *
 * @param {Object} props.book - The book object containing BookId, BookName, Author, and BookContent.
 * @returns {JSX.Element} - The AskQuestion component.
 */
export default function AskQuestion(props) {
  const { book } = props;
  const [question, setQuestion] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /**
   * Dispatches an action to ask a question about the current book.
   */
  const Asked = () => {
    dispatch(askQuestion(book.BookName, question, navigate));
  };

  /**
   * Handles the key press event and dispatches an action to ask a question if the enter key is pressed.
   *
   * @param {Object} event - The key press event.
   */
  const handleKeyPress = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      Asked();
    }
  };

  return (
    <Paper
      component="form"
      elevation={8}
      sx={{ height: "50px", display: "flex", alignItems: "center", mt: 2 }}
    >
      <InputBase
        sx={{ ml: 2, flex: 1 }}
        placeholder="Ask a question"
        onKeyDown={handleKeyPress}
        onChange={(e) => {
          setQuestion(e.target.value);
        }}
      />
      <Divider sx={{ height: 28, m: 1 }} orientation="vertical" />
      <IconButton
        type="button"
        sx={{ mr: 1, p: "2" }}
        aria-label="search"
        onClick={Asked}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

AskQuestion.propTypes = {
  book: PropTypes.shape({
    BookId: PropTypes.number,
    BookName: PropTypes.string,
    Author: PropTypes.string,
    BookContent: PropTypes.string,
  }),
};
