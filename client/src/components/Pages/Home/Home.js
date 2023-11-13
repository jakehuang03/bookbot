import * as React from "react";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Book from "../SharedComponents/Book";
import { styled } from "@mui/material/styles";
import TopBook from "./TopBook";
import { Button, Box, Typography } from "@mui/material";
import TopbookCover from "../../../images/TopbookCover.png";
import { getRecomBook } from "../../../actions/books";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

// TODO: 1) get the top 1 and recommended books, 2) calculate the top 1 and recommended books
const Top1Book = {
	id: 9,
	title: "The Element of Scrum",
	author: "Chris Sims",
	description:
		"A comprehensive guide to Scrum, breaking it down into its essential components. The book explores the key roles within Scrum, including the Product Owner, ScrumMaster, and Development Team, as well as the critical artifacts such as the Product Backlog, Sprint Backlog, and Increment.",
	image: TopbookCover,
};

const ColorButton = styled(Button)(({ theme }) => ({
	color: "#2c3463",
	background: "#f0cb5f",
	position: "center",
	margin: "20px",
}));

export default function Home() {
	const dispatch = new useDispatch();
	useEffect(() => {
		dispatch(getRecomBook(10));
		dispatch(getRecomBook(30));
		dispatch(getRecomBook(29));
		dispatch(getRecomBook(28));
	}, []);
	const { recommended } = useSelector((state) => state.books);
	return (
		<Container maxWidth='lg'>
			<div className='uploadblock'>
				<h1
					style={{
						textAlign: "center",
						fontSize: "50px",
						marginTop: "10px",
						color: "white",
					}}
				>
					Ready to Start?
				</h1>
				<Box textAlign='center'>
					<ColorButton variant='contained' href='/upload' size='large'>
						Upload Text
					</ColorButton>
				</Box>
			</div>
			<div>
				<TopBook book={Top1Book} />
			</div>
			<Container className='bottomhalf'>
				<h1
					className='text-secondary'
					style={{
						textAlign: "center",
						fontSize: "40px",
						marginBottom: "20px",
					}}
				>
					RECOMMENDED BOOKS
				</h1>
				<Grid container spacing={4}>
					{Array.isArray(recommended)
						? recommended.map((book) => (
								<Book key={book.BookId} book={book} /> //Grid item as card
						  ))
						: []}
				</Grid>
			</Container>
		</Container>
	);
}
