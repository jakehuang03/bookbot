// input question
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { askQuestion } from "../../../actions/bookbot";

import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

export default function AskQuestion() {
  const [question, setQuestion] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // todo: send the question to backend
  // add the question to the state
  const Asked = () => {
    console.log(question);
    dispatch(askQuestion(question));
    navigate("/bookbot");
  };

  return (
      
      <Paper component="form" sx={{ display: "flex", alignItems: "center", margin: 2 }}>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Ask a question"
        onChange={(e) => {
          setQuestion(e.target.value);
        }}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search" onClick={Asked}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
