import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import ProfileAbout from "./ProfileAbout";
import ProfileInq from "./ProfileInq";
import ProfileTop from "./ProfileTop";
import ProfileBook from "./ProfileBook";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Profile = ({ auth, id }) => {
	return (
		<div className='contentBox'>
			<Fragment>
				{auth.isAuthenticated &&
					auth.loading === false &&
					auth.user.data.UserId == id && (
						<Link to='/edit-profile' className='btn btn-secondary'>
							Edit Profile
						</Link>
					)}
				<div className='profile-grid my-1'>
					<ProfileTop></ProfileTop>
					<ProfileAbout></ProfileAbout>
					<div className='profile-inq bg-white p-2'>
						<h2 className='text-primary'>History Inquiry</h2>
						<ProfileInq></ProfileInq>
					</div>
					<div className='profile-book bg-white p-2'>
						<h2 className='text-primary'>History Text</h2>
						<ProfileBook></ProfileBook>
					</div>
				</div>
			</Fragment>
		</div>
	);
};

Profile.propTypes = {
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile,
});

export default connect(mapStateToProps)(Profile);
