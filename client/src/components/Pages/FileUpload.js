import React, { useState } from "react";
import { Button, Typography, Container, Grid, Box } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from "axios";

function FileUpload() {
  const [selectedFile, setSelectedFile] = useState();

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const onFileUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("File", selectedFile, selectedFile.name);
      console.log(selectedFile);
      // axios.post("api/uploadfile", formData);
    } else {
      console.log("No file chosen");
    }
  };

  const fileData = () => {
    if (selectedFile) {
      return (
        <Box sx={{ padding: 2 }}>
          <Typography variant="h6">File Name: {selectedFile.name}</Typography>
          <Typography variant="body1">
            File Type: {selectedFile.type}
          </Typography>
          <Typography variant="body1">
            Last Modified: {selectedFile.lastModifiedDate.toDateString()}
          </Typography>
        </Box>
      );
    } else {
      return (
        <Box sx={{ padding: 2 }}>
          <Typography variant="h6">No file chosen</Typography>
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
          <Button variant="outlined" component="span" sx>
            Choose File
          </Button>
        </label>
        <input
          type="file"
          id="file-upload"
          onChange={onFileChange}
          style={{ display: "none" }}
        />
      {fileData()}
      <Button variant="contained" onClick={onFileUpload} startIcon={<CloudUploadIcon />}>
        Upload
      </Button>
    </Box>
  );
}

export default FileUpload;
