import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const ProfileAbout = ({ profile }) => {
	return (
		<div className='profile-about bg-light p-2'>{profile.profile.bio}</div>
	);
};

ProfileAbout.propTypes = {
	profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
});
export default connect(mapStateToProps)(ProfileAbout);
