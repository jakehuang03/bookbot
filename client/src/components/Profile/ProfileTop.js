import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const avatar = require("./avatar.png");

const ProfileTop = ({ profile }) => {
	return (
		<div className='profile-top bg-primary p-2'>
			<img className='round-img my-1' src={avatar} alt='a' />
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
