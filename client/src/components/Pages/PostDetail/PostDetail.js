import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";

import Post from "../Community/Post";
import CommentBox from "./CommentBox";
import Comment from "./Comment";
import { getQuesCommentByID } from "../../../actions/community";

const PostDetail = ({
	getQuesCommentByID,
	community: { selectedPost, comment_list },
}) => {
	//get post detail from database based on book id
	const { postid } = useParams();
	useEffect(() => {
		getQuesCommentByID(postid);
	}, [getQuesCommentByID, postid]);

	return (
		<Container className='contentBox'>
			<Post post={selectedPost} />
			<CommentBox />
			<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
				{Array.isArray(comment_list)
					? comment_list.map((comment) => (
							<Comment key={comment.CommentId} comment={comment} />
					  ))
					: []}
			</Grid>
		</Container>
	);
};

PostDetail.propTypes = {
	getQuesCommentByID: PropTypes.func.isRequired,
	community: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	community: state.community,
});

export default connect(mapStateToProps, {
	getQuesCommentByID,
})(PostDetail);
