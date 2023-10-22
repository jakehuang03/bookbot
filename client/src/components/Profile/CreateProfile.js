import React, { Fragment, useState, useEffect } from "react";
import { Link, useMatch, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile, getCurrentProfile } from "../../actions/profile";

/*
  NOTE: declare initialState outside of component
  so that it doesn't trigger a useEffect
  we can then safely use this to construct our profileData
 */
const initialState = {
	gender: "",
	bio: "",
	avatar: "",
};

const ProfileForm = ({
	profile: { profile, loading },
	createProfile,
	getCurrentProfile,
}) => {
	const [formData, setFormData] = useState(initialState);

	const creatingProfile = useMatch("/create-profile");

	const navigate = useNavigate();

	useEffect(() => {
		// if there is no profile, attempt to fetch one
		if (!profile) getCurrentProfile();

		// if we finished loading and we do have a profile
		// then build our profileData

		if (!loading && profile) {
			console.log(profile);
			const profileData = { ...initialState };
			for (const key in profile) {
				if (key in profileData) profileData[key] = profile[key];
			}
			// set local state with the profileData
			setFormData(profileData);
		}
	}, [loading, profile]);

	const { bio, avatar, gender } = formData;
	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = (e) => {
		e.preventDefault();
		createProfile(avatar, bio, gender, creatingProfile).then(() => {
			navigate("/getprofile");
		});
	};

	return (
		<section className='container'>
			<h1 className='large text-primary'>
				{creatingProfile ? "Create Your Profile" : "Edit Your Profile"}
			</h1>
			<p className='lead'>
				<i className='fas fa-user' />
				{creatingProfile
					? ` Let's get some information to make your`
					: " Add some changes to your profile"}
			</p>
			<small>* = required field</small>
			<form className='form' onSubmit={onSubmit}>
				<div className='form-group'>
					<h1 className='medium'>Gender*</h1>
					<select name='gender' value={gender} onChange={onChange} required>
						<option>No Disclosure</option>
						<option value='Female'>Female</option>
						<option value='Male'>Male</option>
						<option value='Non-binary'>Non-binary</option>
					</select>
				</div>
				<div className='form-group'>
					<h1 className='medium'>Short Bio*</h1>
					<textarea
						placeholder='A short bio of yourself'
						name='bio'
						value={bio}
						onChange={onChange}
						required
					/>
					<small className='form-text'>Tell us a little about yourself</small>
				</div>
				<input type='submit' className='btn btn-primary my-1' />
			</form>
		</section>
	);
};

ProfileForm.propTypes = {
	createProfile: PropTypes.func.isRequired,
	getCurrentProfile: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
	ProfileForm
);