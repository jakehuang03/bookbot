import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { IconButton, InputBase } from "@mui/material";
import Paper from "@mui/material/Paper";
import ReplyIcon from "@mui/icons-material/Reply";
import ClearIcon from "@mui/icons-material/Clear";
import Avatar from "@mui/material/Avatar";

import { saveComment } from "../../../actions/community";

const CommentBox = () => {
	const { avatar } = useSelector((state) => state.auth);
	const user = JSON.parse(localStorage.getItem("profile"));

	const [commentValue, setCommentValue] = useState("");
	const [rows, setRows] = useState("1");
	const dispatch = useDispatch();
	const onChange = (e) => {
		setCommentValue(e.target.value);
	};
	const onClose = () => {
		setCommentValue("");
		setRows("1");
	};
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
			component='form'
			sx={{ display: "flex", alignItems: "center", m: 2 }}
		>
			<Avatar
				src={`data:image/jpeg;base64,${avatar}`}
				alt={user?.name}
				sx={{ width: 35, height: 35, marginLeft: 1 }}
			>
				{user?.name.charAt(0)}
			</Avatar>
			<InputBase
				placeholder='Add a comment'
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
				type='button'
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
