import React, { useEffect } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Book from "../SharedComponents/Book";
import SearchGenre from "./Search_Genre";
import { useSelector, useDispatch } from "react-redux";
import { getBooks } from "../../../actions/books";

export default function BookShelf() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  const { books } = useSelector((state) => state.books);
	return (
		<>
			<Container>
				<div className='header'>
					<h1 className='header-text'>Bookshelf</h1>
				</div>
			</Container>
			<div>
				<Grid container spacing={2} justifyContent='center'>
					<Grid item>
						<SearchGenre />
					</Grid>
				</Grid>
			</div>
			<Container sx={{ py: 4 }} maxWidth='lg'>
				<Grid container spacing={4}>
					{books?.map((book) => (
						<Book key={book.BookId} book={book} />
					))}
				</Grid>
			</Container>
		</>
	);
}
