import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getQuestionByUser } from "../../actions/community";
import Post from "./Post";

export default function ProfileInq() {
	const dispatch = useDispatch();
	const { id } = useParams();
	useEffect(() => {
		dispatch(getQuestionByUser(id));
	}, [dispatch, id]);

	const { history } = useSelector((state) => state.profile);
	return (
		<div>
			{history.length === 0 ? (
				<h3 className='text-dark'>No History Posts</h3>
			) : null}
			{history.map((post) => (
				<Post key={post.QuestionId} post={post} />
			))}
		</div>
	);
}

ProfileInq.propTypes = {};
