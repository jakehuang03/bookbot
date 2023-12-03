import * as React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { ThemeProvider, createTheme } from "@mui/material";
const theme = createTheme({
	typography: {
		fontFamily: "Cardo, sans-serif",
	},
});
function TopBook(props) {
	const { book } = props;
	return (
		<div className='topbook'>
			<div>
				<h1
					className='large text-primary'
					style={{
						textAlign: "center",
						fontSize: "40px",
						marginTop: "20px",
					}}
				>
					WEEKLY BOOK
				</h1>
			</div>
			<div className='parent'>
				<div className='child child1'>
					<ThemeProvider theme={theme}>
						<h2>{book.title}</h2>
						<h3>{book.author}</h3>
						<p>{book.description}</p>

						<Button
							component={Link}
							to={`/books/${book.id}`}
							variant='contained'
							size='large'
						>
							Continue reading...
						</Button>
					</ThemeProvider>
				</div>
				<div className='child'>
					<img src={book.image} alt={book.title} className='coverimg' />
				</div>
			</div>
		</div>
	);
}

TopBook.propTypes = {
	book: PropTypes.shape({
		id: PropTypes.number.isRequired,
		title: PropTypes.string.isRequired,
		author: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		image: PropTypes.string.isRequired,
	}).isRequired,
};

export default TopBook;
