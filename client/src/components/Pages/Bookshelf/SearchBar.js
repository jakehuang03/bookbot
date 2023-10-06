import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import { Divider } from "@mui/material";
import InputBase from "@mui/material/InputBase";

export default function SearchBar() {
  const [searchBook, setSearchBook] = useState("");
  // TODO: Change Book List Based on Query
  const search = () => {
    console.log(searchBook);
  };

  return (
    <Paper component="form" sx={{ display: "flex", alignItems: "center", margin: 2 }}>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search For A Book"
        onInput={(e) => {
          setSearchBook(e.target.value);
        }}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search" onClick={search}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
