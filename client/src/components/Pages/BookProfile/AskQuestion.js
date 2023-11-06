// input question
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import { askQuestion } from "../../../actions/bookbot";

import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

export default function AskQuestion(props) {
  const { book } = props;
  const [question, setQuestion] = useState("");
  // get current book from redux state
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Asked = () => {
    dispatch(askQuestion(book, question, navigate));
  };

  const handleKeyPress = (event) => {
    if(event.keyCode === 13) {
        event.preventDefault();
        Asked();
    }
  }

  return (
      <Paper component="form" elevation={8} sx={{ height: "50px", display: "flex", alignItems: "center", mt: 2 }}>
      <InputBase
        sx={{ ml: 2, flex: 1 }}
        placeholder="Ask a question"
        onKeyDown={handleKeyPress}
        onChange={(e) => {
          setQuestion(e.target.value);
        }}
      />
      <Divider sx={{ height: 28, m: 1 }} orientation="vertical" />
      <IconButton type="button" sx={{ mr: 1, p: "2" }} aria-label="search" onClick={Asked}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

AskQuestion.propTypes = {
  book: PropTypes.shape({
    BookId: PropTypes.number.isRequired,
    BookName: PropTypes.string.isRequired,
    Author: PropTypes.string.isRequired,
    BookContent: PropTypes.string.isRequired,
  }).isRequired,
};
