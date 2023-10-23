import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { getBooksBySearch } from "../../../actions/books";
import { useNavigate } from "react-router-dom";
import { Divider, Paper, TextField } from "@mui/material";
import './Search_Genre.css';


export default function SearchBar() {
  const [searchBook, setSearchBook] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchBooks = (genre) => {
   if(searchBook.trim() || genre || genre === null || genre === "") {
      dispatch(getBooksBySearch({searchBook, genre}));
      navigate(`/books/search?searchBook=${searchBook || 'none'}&genre=${genre || 'none'}`)
    }
  };

  const handleGenreClick = (genre) => {
    if (selectedGenre === genre) {
      setSelectedGenre(null);
    } 
    else {
      setSelectedGenre(genre);
    }
    searchBooks(selectedGenre === genre ? null : genre); 
  };

  const handleKeyPress = (event) => {
    if(event.keyCode === 13) {
        event.preventDefault();
        searchBooks(selectedGenre);
    }
  }

  const handleButtonClick = () => {
    const genre = selectedGenre;
    searchBooks(genre);
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
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search" onClick={handleButtonClick}>
          <SearchIcon />
        </IconButton>
      </Paper>

      <div>
      <button
        className={selectedGenre === "Genre 1" ? "selected" : ""}
        onClick={() => handleGenreClick("Genre 1")}
      >
        Genre 1
      </button>
      <button
        className={selectedGenre === "Genre 2" ? "selected" : ""}
        onClick={() => handleGenreClick("Genre 2")}
      >
        Genre 2
      </button>
      <button
        className={selectedGenre === "Genre 3" ? "selected" : ""}
        onClick={() => handleGenreClick("Genre 3")}
      >
        Genre 3
      </button>
      <button
        className={selectedGenre === "Genre 4" ? "selected" : ""}
        onClick={() => handleGenreClick("Genre 4")}
      >
        Genre 4
      </button>
    </div>
      
    </div>
    
  );
}
