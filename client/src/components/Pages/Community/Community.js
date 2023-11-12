import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Container, Grid, Typography } from "@mui/material";
import { getQuestion } from "../../../actions/community";
import QuestionPagination from "./QuestionPagination";
import SourcePagination from "../BookBot/SourcePagination";
import Post from "./Post";
import { useEffect } from "react";

/**
 * Renders the Community page component.
 * @returns {JSX.Element} The Community page component.
 */

const Community = () => {
	const dispatch = useDispatch();
	dispatch(getQuestion());
	const PostList = JSON.parse(sessionStorage.getItem("post_list"));
	const [sources, setSources] = useState([]);
	return (
		<Container>
			<div className='header'>
				<h1 className='header-text'>Community</h1>
			</div>
			<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
				{Array.isArray(sources)
					? sources.map((post) => <Post key={post.QuestionId} post={post} />)
					: []}
			</Grid>
			<SourcePagination
				setSources={setSources}
				fullSources={PostList}
				pageSize='5'
			/>
		</Container>
	);
};

export default Community;
