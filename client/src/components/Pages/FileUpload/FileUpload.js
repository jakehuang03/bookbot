import React, { useState, createRef } from "react";
import {
	Button,
	Typography,
	Box,
	TextField,
	InputLabel,
	Select,
	MenuItem,
	FormControl,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useDispatch } from "react-redux";
import { createBook } from "../../../actions/books";
import { useNavigate } from "react-router-dom";
import "./FileUpload.css";

function FileUpload() {
	
	const [bookData, setBookData] = useState({
		title: "",
		author: "",
		summary: "",
		selectedFile: "",
		genre: "",
	});
	const [dragActive, setDragActive] = useState(false);
	const [isTitleValid, setIsTitleValid] = useState(true);
	const [isFileValid, setIsFileValid] = useState(true);

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const inputRef = createRef();
	const MAX_FILE_SIZE_MB = 50;
	const user = JSON.parse(localStorage.getItem("profile"));

	const handleDrag = function (e) {
		e.preventDefault();
		e.stopPropagation();
		if (e.type === "dragenter" || e.type === "dragover") {
			setDragActive(true);
		} else if (e.type === "dragleave") {
			setDragActive(false);
		}
	};

	const handleDrop = function (e) {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(false);
		if (e.dataTransfer.items) {
			const hasPDF = Array.from(e.dataTransfer.items).some(
				(item) => item.type === "application/pdf"
			);

			if (hasPDF) {
				const pdfFile = Array.from(e.dataTransfer.items).find(
					(item) => item.type === "application/pdf"
				);

				const file = pdfFile.getAsFile();
				if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
					alert(`File size exceeds the limit of ${MAX_FILE_SIZE_MB} MB.`);
					return;
				}
				setBookData({ ...bookData, selectedFile: file });
			} else {
				alert("Please drop a PDF file.");
			}
		}
	};

	const onButtonClick = (e) => {
		e.preventDefault();
		inputRef.current.click();
	};

	const handleChange = function (e) {
		e.preventDefault();
		if (e.target.files && e.target.files[0]) {
			const selectedFile = e.target.files[0];
			if (selectedFile.type === "application/pdf") {
				if (selectedFile.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
					alert(`File size exceeds the limit of ${MAX_FILE_SIZE_MB} MB.`);
					e.target.value = null;
					return;
        		}
				setBookData({ ...bookData, selectedFile: e.target.files[0] });
			} else {
				alert("Please select a PDF file.");
				e.target.value = null;
				return;
			}
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (!user) {
			alert("Please refresh and then login again.")
		}
		if(!bookData.title.trim() && !bookData.selectedFile) {
			setIsTitleValid(false);
			setIsFileValid(false);
			return;
		} 
		else if(!bookData.title.trim()) {
			setIsTitleValid(false);
			return;
		}
		else if(!bookData.selectedFile) {
			setIsFileValid(false);
			return;
		} 
		
		setIsTitleValid(true);
		setIsFileValid(true);
		dispatch(createBook({ ...bookData }, user?.user, navigate));
	};

	const inputText = () => {
		if (bookData.selectedFile) {
			return (
				<Box sx={{ padding: 2 }}>
					<Typography variant='h6'>
						File Name: {bookData.selectedFile.name}
					</Typography>
					<Typography variant='body1'>
						File Type: {bookData.selectedFile.type}
					</Typography>
				</Box>
			);
		} else {
			return (
				<div>
					<p style={{ fontSize: "20px" }}>Drag and Drop File Here (Max Size: {MAX_FILE_SIZE_MB} MB)</p>
					<Button variant='contained' onClick={onButtonClick}>
						Upload a File
					</Button>
					<div className='file-upload-message'>
						<p
							style={{ fontSize: "16px", textAlign: "center", bottom: "10px" }}
						>
							Accepted File Types: .pdf only

						</p>
					</div>
				</div>
			);
		}
	};

	return (
		<Box
			sx={{
				bgcolor: "background.paper",
				margin: 2,
				p: 2,
				minWidth: 300,
			}}
		>
			<div className='upload-area'>
				<form id='form-file-upload' onDragEnter={handleDrag}>
					<input
						ref={inputRef}
						type='file'
						id='input-file-upload'
						accept='application/pdf'
						multiple={false}
						onChange={handleChange}
					/>
					<label id='label-file-upload' htmlFor='input-file-upload'>
						{inputText()}
					</label>
					{dragActive && (
						<div
							id='drag-file-element'
							onDragEnter={handleDrag}
							onDragLeave={handleDrag}
							onDragOver={handleDrag}
							onDrop={handleDrop}
						></div>
					)}
					{!isFileValid && (
					<Typography variant="body2" color="error" gutterBottom style={{ marginTop: "3px" }}>
						File is required.
					</Typography>
       				)}
				</form>
			</div>
			<div className='form-content' style={{ marginTop: (!isFileValid) ? '10px' : '0' }}>
				<TextField
					name='title'
					variant='outlined'
					label='Title'
					fullWidth
					value={bookData.title}
					onChange={(event) => {
						setIsTitleValid(true);
						setBookData({ ...bookData, title: event.target.value })
					}}
					error={!isTitleValid}
					helperText={!isTitleValid ? "Title is required." : ""}
					required
				/>
				<TextField
					name='author'
					variant='outlined'
					label='Author'
					fullWidth
					value={bookData.author}
					onChange={(event) =>
						setBookData({ ...bookData, author: event.target.value })
					}
				/>
				<TextField
					name='summary'
					variant='outlined'
					label='Summary'
					fullWidth
					multiline
					minRows={3}
					value={bookData.summary}
					onChange={(event) =>
						setBookData({ ...bookData, summary: event.target.value })
					}
				/>
				<FormControl fullWidth>
					<InputLabel id='genre-field'>Genre</InputLabel>
					<Select
						labelId='genre-field'
						id='genre-select'
						value={bookData.genre}
						label='Genre'
						onChange={(event) =>
							setBookData({ ...bookData, genre: event.target.value })
						}
					>
						<MenuItem value={"Textbook"}>Textbook</MenuItem>
						<MenuItem value={"Fiction"}>Fiction</MenuItem>
						<MenuItem value={"Science Fiction"}>Science Fiction</MenuItem>
						<MenuItem value={"Fantasy"}>Fantasy</MenuItem>
						<MenuItem value={"Mystery"}>Mystery</MenuItem>
						<MenuItem value={"Non-Fiction"}>Non-Fiction</MenuItem>

					</Select>
				</FormControl>
				<Button
					variant='contained'
					onClick={handleSubmit}
					startIcon={<CloudUploadIcon />}
				>
					Upload
				</Button>
			</div>
		</Box>
	);
}

export default FileUpload;
