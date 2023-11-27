import React, { useState, useEffect } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
	createProfile,
	getProfileByID,
	saveAvatar,
} from "../../actions/profile";

/*
  NOTE: declare initialState outside of component
  so that it doesn't trigger a useEffect
  we can then safely use this to construct our profileData
 */
const initialState = {
	nickname: "",
	gender: "",
	bio: "",
	avatar: "",
};

const ProfileForm = ({
	auth: { user },
	profile: { profile, loading },
	createProfile,
	getProfileByID,
	saveAvatar,
}) => {
	const [formData, setFormData] = useState(initialState);

	const creatingProfile = useMatch("/create-profile");

	const navigate = useNavigate();

	useEffect(() => {
		// if there is no profile, attempt to fetch one
		if (!profile) getProfileByID(user.userID);

		// if we finished loading and we do have a profile
		// then build our profileData

		if (!loading && profile) {
			const profileData = { ...initialState };
			for (const key in profile) {
				if (key in profileData) profileData[key] = profile[key];
			}
			// set local state with the profileData
			setFormData(profileData);
		}
	}, [loading, profile, getProfileByID, user.userID]);
	const [avatar, setAvatar] = useState();
	const [Apath, setAPath] = useState();
	function handleChange(e) {
		setAPath(e.target.files[0]);
		setAvatar(URL.createObjectURL(e.target.files[0]));
	}
	const { nickname, bio, gender } = formData;
	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = (e) => {
		e.preventDefault();
		saveAvatar(Apath);
		createProfile(nickname, avatar, bio, gender, creatingProfile).then(() => {
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
					<h1 className='medium'>User Name*</h1>
					<input
						type='text'
						name='nickname'
						value={nickname}
						onChange={onChange}
					/>
				</div>
				<div className='form-group'>
					<h1 className='medium'>Add Image*</h1>
					<input type='file' onChange={handleChange} required />
					<div>
						{avatar && (
							<img
								src={avatar}
								alt='avatar'
								className='round-img my-1 avatar'
							/>
						)}
					</div>
				</div>
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
	auth: state.auth,
});

export default connect(mapStateToProps, {
	createProfile,
	getProfileByID,
	saveAvatar,
})(ProfileForm);
