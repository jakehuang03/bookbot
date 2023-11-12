import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Container, Grid, Typography } from "@mui/material";
import { getQuestion } from "../../../actions/community";
import QuestionPagination from "./QuestionPagination";
import Post from "./Post";
import { useEffect } from "react";

const Community = ({ getQuestion, community: { post_list } }) => {
	const [page, setPage] = useState(0);
	useEffect(() => {
		getQuestion(page);
	}, [page]);

	return (
		<Container>
			<div className='header'>
				<Typography className='header-text' variant='h1'>
					Community
				</Typography>
			</div>
			<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
				{Array.isArray(post_list)
					? post_list.map((post) => <Post key={post.QuestionId} post={post} />)
					: []}
			</Grid>
			<QuestionPagination setPage={setPage} />
		</Container>
	);
};


Community.propTypes = {
	getQuestion: PropTypes.func.isRequired,
	community: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	community: state.community,
});

export default connect(mapStateToProps, {
	getQuestion,
})(Community);
