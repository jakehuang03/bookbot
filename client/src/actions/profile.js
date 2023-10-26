import axios from "axios";
import { setAlert } from "./alert";
import { GET_PROFILE, PROFILE_ERROR } from "./types";
import * as api from "../utils/api";

// Get current users profile
export const getCurrentProfile = () => async (dispatch) => {
	try {
		const res = await api.getProfile();
		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

// Get profile by ID
export const getProfileByID = (userID) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/profile/${userID}`);
		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

// Create or update profile

export const createProfile =
	(avatar, bio, gender, creating) => async (dispatch) => {
		try {
			var body = new URLSearchParams();
			body.append("bio", bio);
			body.append("avatar", avatar);
			body.append("gender", gender);
			const config = {
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			};
			const res = await api.createProfile(body, config);

			dispatch(
				setAlert(creating ? "Profile Created" : "Profile Updated", "success")
			);
		} catch (err) {
			const errors = err.response.data.errors;

			if (errors) {
				errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
			}
			console.log(err);
			dispatch({
				type: PROFILE_ERROR,
				payload: { msg: err.response.statusText, status: err.response.status },
			});
		}
	};

//save image
export const saveAvatar = (image) => async (dispatch) => {
	try {
		// get secure url from server
		const res = await api.getImageUploadURL();
		const url = res.data[0];
		// post the image to s3
		console.log(url);
	} catch (error) {
		console.log(error);
	}

	// post url to server
};
