import React, { useState } from "react";
import { Button, Typography, Container, Paper, Box } from "@mui/material";
import axios from "axios";

function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const onFileUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("myFile", selectedFile, selectedFile.name);
      console.log(selectedFile);
      axios.post("api/uploadfile", formData);
    } else {
      console.log("No file chosen");
    }
  };

  const fileData = () => {
    if (selectedFile) {
      return (
        <Box sx={{ padding: 2 }}>
          <Typography variant="h6">File Details:</Typography>
          <Typography variant="body1">
            File Name: {selectedFile.name}
          </Typography>
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
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "primary.main",
          padding: 2,
          margin: 2,
        }}
      >
        <div>
          <input
            type="file"
            onChange={onFileChange}
            style={{ display: "none" }}
          />
          <label htmlFor="file-upload">
            <Button variant="contained" component="span">
              Choose File
            </Button>
          </label>
          <Button variant="contained" onClick={onFileUpload}>
            Upload
          </Button>
          <input
            type="file"
            id="file-upload"
            onChange={onFileChange}
            style={{ display: "none" }}
          />
        </div>
        {fileData()}
      </Box>
    </Container>
  );
}

export default FileUpload;
