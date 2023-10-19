import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { getBooksBySearch } from "../../../actions/books";
import { useNavigate } from "react-router-dom";
import { Divider, ToggleButtonGroup, ToggleButton, Paper, TextField } from "@mui/material";
// import InputBase from "@mui/material/InputBase";

export default function SearchBar() {
  const [searchBook, setSearchBook] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const genres=["Genre 1", "Genre 2", "Genre 3", "Genre 4"]
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchBooks = () => {
    console.log(searchBook);
    console.log(selectedGenre);
    if(searchBook.trim() || selectedGenre) {
      dispatch(getBooksBySearch({searchBook, selectedGenre}));
      navigate(`/posts/search?searchQuery=${searchBook || 'none'}&genre=${selectedGenre}`)
    }
  };

  const handleGenreChange = (event, newAlignment) => {
    setSelectedGenre(newAlignment);
  };

  const handleKeyPress = (event) => {
    if(event.keyCode === 13) {
        event.preventDefault();
        searchBooks();
    }
  }

  return (
    <div>
      <Paper component="form" sx={{ display: "flex", alignItems: "center", margin: 2 }}>
        <TextField 
          name="search"
          variant="outlined"
          label="Search Books"
          onKeyDown={handleKeyPress}
          fullWidth
          value={searchBook}
          onChange={(event) => setSearchBook(event.target.value)}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search" onClick={searchBooks}>
          <SearchIcon />
        </IconButton>
      </Paper>
  

        <ToggleButtonGroup
        value={selectedGenre}
        exclusive
        onChange={handleGenreChange}
      >
        {genres.map((genre) => (
        <ToggleButton key={genre} value={genre} aria-label={genre}>
        {genre}
        </ToggleButton>
        ))}
      </ToggleButtonGroup>
      
      
    </div>
    
  );
}
