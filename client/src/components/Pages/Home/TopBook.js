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
					style={{ textAlign: "center", padding: "30px 0 0 0" }}
				>
					WEEKLY BOOK
				</h1>
			</div>
			<div className='parent'>
				<div className='child'>
					<ThemeProvider theme={theme}>
						<Typography variant='h3' gutterBottom>
							{book.title}
						</Typography>
						<Typography variant='h5' gutterBottom>
							{book.author}
						</Typography>
						<Typography variant='h5' paragraph>
							{book.description}
						</Typography>

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
					<img src={book.image} alt={book.title} />
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
