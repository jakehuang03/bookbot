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
    // TODO: send the question to backend
    dispatch(askQuestion(book, question, navigate));
  };

  return (
      <Paper component="form" elevation={8} sx={{ height: "50px", display: "flex", alignItems: "center", margin: 2 }}>
      <InputBase
        sx={{ ml: 2, flex: 1 }}
        placeholder="Ask a question"
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
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};
