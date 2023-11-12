import { Box, Pagination } from "@mui/material";
import { useState, useEffect } from "react";
import { getQuestion } from "../../../actions/community";
import { getQuestionCount } from "../../../actions/community";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const QuestionPagination = ({
	setPage,
	getQuestionCount,
	community: { count },
	pageSize = 5,
}) => {
	useEffect(() => {
		getQuestionCount();
	}, [getQuestionCount]);

	/**
	 * Updates the displayed sources when the page changes.
	 * @param {Object} event - The event object.
	 * @param {number} value - The new page number.
	 */
	const handlePageChange = (event, value) => {
		setPage((value - 1) * pageSize);
	};

	return (
		<Box sx={{ mt: 1, display: "flex", justifyContent: "center" }}>
			<Pagination
				count={Math.ceil(count / pageSize)}
				onChange={handlePageChange}
			/>
		</Box>
	);
};
QuestionPagination.propTypes = {
	setPage: PropTypes.func.isRequired,
	getQuestionCount: PropTypes.func.isRequired,
	community: PropTypes.object.isRequired,
	pageSize: PropTypes.number,
};

const mapStateToProps = (state) => ({
	community: state.community,
});

export default connect(mapStateToProps, {
	getQuestionCount,
})(QuestionPagination);
