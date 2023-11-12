import * as React from "react";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Book from "../SharedComponents/Book";
import { styled } from "@mui/material/styles";
import TopBook from "./TopBook";
import { Button, Box, Typography } from "@mui/material";
import TopbookCover from "../../../images/TopbookCover.png";

// TODO: 1) get the top 1 and recommended books, 2) calculate the top 1 and recommended books
const Top1Book = {
	id: 9,
	title: "The Element of Scrum",
	author: "Chris Sims",
	description:
		"A comprehensive guide to Scrum, breaking it down into its essential components. The book explores the key roles within Scrum, including the Product Owner, ScrumMaster, and Development Team, as well as the critical artifacts such as the Product Backlog, Sprint Backlog, and Increment.",
	image: TopbookCover,
};

const RecommendBooks = [
	{
		BookId: 10,
		BookName: "Analysis of Algorithms",
		Author: "Robert Sedgewick",
		BookContent:
			"This is a wider card with supporting text below as a natural lead-in to additional content.",
		image: "https://source.unsplash.com/random?wallpapers",
	},
	{
		BookId: 11,
		BookName: "The Art of Computer Programming",
		Author: "AAA",
		image: "https://source.unsplash.com/random?wallpapers",
	},
	{
		BookId: 14,
		BookName: "Analysis of Algorithms",
		Author: "Robert Sedgewick",
		image: "https://source.unsplash.com/random?wallpapers",
	},
	{
		BookId: 15,
		BookName: "The Art of Computer Programming",
		Author: "AAA",
		image: "https://source.unsplash.com/random?wallpapers",
	},
];

const ColorButton = styled(Button)(({ theme }) => ({
	color: "#2c3463",
	background: "#f0cb5f",
	position: "center",
	margin: "20px",
}));

export default function Home() {
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
			<div className='tophalf'>
				<TopBook book={Top1Book} />
			</div>
			<Container className='middlehalf'>
				<Grid container spacing={4}>
					{RecommendBooks.map((book) => (
						<Book key={book.id} book={book} /> //Grid item as card
					))}
				</Grid>
			</Container>
		</Container>
	);
}
