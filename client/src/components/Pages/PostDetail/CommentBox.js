import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { IconButton, InputBase } from "@mui/material";
import Paper from "@mui/material/Paper";
import ReplyIcon from "@mui/icons-material/Reply";
import ClearIcon from "@mui/icons-material/Clear";
import Avatar from "@mui/material/Avatar";

import { saveComment } from "../../../actions/community";

/**
 * renders a comment box for users to add comments.
 * @returns {JSX.Element} The CommentBox component.
 */
const CommentBox = () => {
  const user = JSON.parse(localStorage.getItem("profile"));

  const [commentValue, setCommentValue] = useState("");

  const [rows, setRows] = useState("1");
  const dispatch = useDispatch();

  const onChange = (e) => {
    setCommentValue(e.target.value);
  };

  /**
   * Resets the comment input field and rows state.
   */
  const onClose = () => {
    setCommentValue("");
    setRows("1");
  };

  /**
   * Dispatches the comment to be saved and resets the comment input field and rows state.
   * @param {Object} e - The event object.
   */
  const onSubmit = (e) => {
    dispatch(saveComment(commentValue));
    onClose();
  };

  const handleKeyPress = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      onSubmit();
    }
  };

  const onClick = () => {
    setRows("4");
  };
  return (
    <Paper
      elevation={8}
      component="form"
      sx={{ display: "flex", alignItems: "center", m: 2 }}
    >
      <Avatar src={user?.picture} sx={{ m: 1 }}>
        H
      </Avatar>
      <InputBase
        placeholder="Add a comment"
        sx={{ flex: 1, m: 2 }}
        onKeyDown={handleKeyPress}
        onChange={onChange}
        onClick={onClick}
        multiline
        rows={rows}
        value={commentValue}
        inputProps={{ style: { fontSize: 20 } }}
      />

      <IconButton
        type="button"
        onClick={onSubmit}
        disabled={commentValue?.length < 1}
      >
        <ReplyIcon />
      </IconButton>
      <IconButton onClick={onClose}>
        <ClearIcon />
      </IconButton>
    </Paper>
  );
};

export default CommentBox;
