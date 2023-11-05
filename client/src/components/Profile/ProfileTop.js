import React from "react";
import { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAvatar } from "../../actions/profile";

const ProfileTop = ({ profile }) => {
	return (
		<div className='profile-top bg-primary p-2'>
			<div>
				<img
					className='avatar round-img my-1'
					src={`data:image/jpeg;base64,${profile.avatar}`}
					alt={"loading"}
				/>
			</div>
			<h1 className='large'>{profile.profile.nickname}</h1>
			<p className='lead'>
				{profile.profile.gender === "Female" ? (
					<i className='fas fa-female'></i>
				) : profile.profile.gender === "Male" ? (
					<i className='fas fa-male'></i>
				) : (
					<i className='fas fa-genderless'></i>
				)}
			</p>
		</div>
	);
};

ProfileTop.propTypes = {
	profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
});
export default connect(mapStateToProps)(ProfileTop);
