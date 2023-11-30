import { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { getMyBooksBySearch } from "../../../actions/books";
import { useNavigate, useLocation } from "react-router-dom";
import { Divider, Paper, TextField } from "@mui/material";
import './Search_Genre.css';


export default function SearchBar() {
  const [searchBook, setSearchBook] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    if(user === null) {
      navigate("/home");
    }
    else {
      const params = new URLSearchParams(location.search);
      const searchBookParam = params.get("searchBook") || "";
      const genreParam = params.get("genre") || "";
      if(searchBookParam === "none") {
        setSearchBook("");
      }
      else {
        setSearchBook(searchBookParam);
      }
      setSelectedGenre(genreParam);
      dispatch(getMyBooksBySearch({searchBook: searchBookParam, genre: genreParam}, user?.user));
    }
  }, [location.search]);

  const searchBooks = (genre) => {
   if(searchBook.trim() || genre || genre === null || genre === "") {
      dispatch(getMyBooksBySearch({searchBook, genre}, user?.user));
      navigate(`/mybooks/search?searchBook=${searchBook || 'none'}&genre=${genre || 'none'}`)
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
        className={selectedGenre === "Textbook" ? "selected" : ""}
        onClick={() => handleGenreClick("Textbook")}
      >
        Textbook
      </button>
      <button
        className={selectedGenre === "Fiction" ? "selected" : ""}
        onClick={() => handleGenreClick("Fiction")}
      >
        Fiction
      </button>
      <button
        className={selectedGenre === "Science Fiction" ? "selected" : ""}
        onClick={() => handleGenreClick("Science Fiction")}
      >
        Science Fiction
      </button>
      <button
        className={selectedGenre === "Fantasy" ? "selected" : ""}
        onClick={() => handleGenreClick("Fantasy")}
      >
        Fantasy
      </button>
      <button
        className={selectedGenre === "Mystery" ? "selected" : ""}
        onClick={() => handleGenreClick("Mystery")}
      >
        Mystery
      </button>
      <button
        className={selectedGenre === "Non-Fiction" ? "selected" : ""}
        onClick={() => handleGenreClick("Non-Fiction")}
      >
        Non-Fiction
      </button>
    </div>
      
    </div>
    
  );
}
