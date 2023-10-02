import React, { useState } from "react";
import { Button, Typography, Box, TextField } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useDispatch } from "react-redux";
import { createBook } from "../../../actions/fileUpload";
import { useNavigate } from "react-router-dom";

function FileUpload() {
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    summary: "",
    selectedFile: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem('profile'));

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(bookData);
    dispatch(createBook({...bookData, name: user?.result ? user?.result?.name : user?.name}), navigate);

  }

  const fileData = () => {
    if (bookData.selectedFile) {
      return (
        <Box sx={{ padding: 2 }}>
          <Typography variant="h6">File Name: {bookData.selectedFile.name}</Typography>
          <Typography variant="body1">
            File Type: {bookData.selectedFile.type}
          </Typography>
          <Typography variant="body1">
            Last Modified: {bookData.selectedFile.lastModifiedDate.toDateString()}
          </Typography>
        </Box>
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
        <label htmlFor="file-upload">
          <Button variant="outlined" component="span" >
            Choose File
          </Button>
        </label>
        
        <input
          type="file"
          id="file-upload"
          onChange={(event) =>
            setBookData({ ...bookData, selectedFile: event.target.files[0] })
          }
          style={{ display: "none" }}
        />
      {fileData()}
      <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={bookData.title}
          onChange={(event) =>
            setBookData({ ...bookData, title: event.target.value })
          }
        />
        <TextField
          name="author"
          variant="outlined"
          label="Author (Optional) "
          fullWidth
          value={bookData.author}
          onChange={(event) =>
            setBookData({ ...bookData, author: event.target.value })
          }
        />
        <TextField
          name="summary"
          variant="outlined"
          label="Summary (Optional)"
          fullWidth
          multiline
          minRows={4}
          value={bookData.summary}
          onChange={(event) =>
            setBookData({ ...bookData, summary: event.target.value})
          }
        />
      <Button variant="contained" onClick={handleSubmit} startIcon={<CloudUploadIcon />}>
        Upload
      </Button>
    </Box>
  );
}

export default FileUpload;
