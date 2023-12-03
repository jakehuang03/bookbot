import React from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

const UploadBookButton = () => {
  const navigate = useNavigate();

  const uploadClick = () => {
    navigate('/upload');
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Button
        variant="outlined"
        style={{
          width: '237px', 
          height: '232px', 
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          borderColor: '#808080',
          color: '#808080',
        }}
        onClick={uploadClick}
      >
        <AddIcon fontSize="large" />
        Upload Book
      </Button>
    </div>
  );
};
export default UploadBookButton;