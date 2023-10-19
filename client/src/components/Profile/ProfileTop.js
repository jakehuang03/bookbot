import React from "react";
import PropTypes from "prop-types";

const avatar = require("./avatar.png");

const ProfileTop = ({}) => {
	return (
		<div className='profile-top bg-primary p-2'>
			<img className='round-img my-1' src={avatar} alt='a' />
			<h1 className='large'>Daisy Wang</h1>
			<p className='lead'>CS Student @ Emory University</p>
			<p>Atlanta, GA</p>
			<div className='icons my-1'>
				<a href='#' target='_blank' rel='noopener noreferrer'>
					<i className='fas fa-globe fa-2x'></i>
				</a>

				<a href='#' target='_blank' rel='noopener noreferrer'>
					<i className='fab fa-twitter fa-2x'></i>
				</a>

				<a href='#' target='_blank' rel='noopener noreferrer'>
					<i className='fab fa-facebook fa-2x'></i>
				</a>

				<a href='#' target='_blank' rel='noopener noreferrer'>
					<i className='fab fa-linkedin fa-2x'></i>
				</a>

				<a href='#' target='_blank' rel='noopener noreferrer'>
					<i className='fab fa-youtube fa-2x'></i>
				</a>

				<a href='#' target='_blank' rel='noopener noreferrer'>
					<i className='fab fa-instagram fa-2x'></i>
				</a>
			</div>
		</div>
	);
};

ProfileTop.propTypes = {};

export default ProfileTop;
