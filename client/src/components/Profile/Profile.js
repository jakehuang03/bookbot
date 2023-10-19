import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import ProfileAbout from "./ProfileAbout";
import ProfileInq from "./ProfileInq";
import ProfileTop from "./ProfileTop";
import ProfileBook from "./ProfileBook";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Profile = (auth) => {
	return (
		<div className='contentBox'>
			<Fragment>
				{auth.auth.isAuthenticated && auth.auth.loading === false && (
					<Link to='/edit-profile' className='btn btn-secondary'>
						Edit Profile
					</Link>
				)}
				<div className='profile-grid my-1'>
					<ProfileTop></ProfileTop>
					<ProfileAbout></ProfileAbout>
					<div className='profile-inq bg-white p-2'>
						<h2 className='text-primary'>Education</h2>
						<ProfileInq></ProfileInq>
					</div>
					<div className='profile-book bg-white p-2'>
						<h2 className='text-primary'>Experience</h2>
						<ProfileBook></ProfileBook>
					</div>
				</div>
			</Fragment>
		</div>
	);
};

Profile.propTypes = {
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps)(Profile);
