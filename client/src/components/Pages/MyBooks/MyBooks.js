import React, { useEffect } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Book from "./Book";
import SearchGenre from "./Search_Genre";
import { useSelector, useDispatch } from "react-redux";
import { getMyBooks } from "../../../actions/books";
import UploadBookButton from "./UploadBookButton";

export default function MyBooks() {
	const dispatch = useDispatch();
	const user = JSON.parse(localStorage.getItem("profile"));

	useEffect(() => {
		dispatch(getMyBooks(user.user));
	}, [dispatch]);

	const { books } = useSelector((state) => state.books);
	return (
		<>
			<Container>
				<div className='header'>
					<h1 className='header-text'>My Bookshelf</h1>
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
					<Grid item>
						<UploadBookButton />
					</Grid>
					{books.map((book) => (
						<Book key={book.BookId} book={book} />
					))}
				</Grid>
			</Container>
		</>
	);
}
