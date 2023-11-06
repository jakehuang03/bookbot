import { setAlert } from "./alert";
import { GET_PROFILE, PROFILE_ERROR, GET_AVATAR } from "./types";
import * as api from "../utils/api";

// Get profile by ID
export const getProfileByID = (userID) => async (dispatch) => {
	try {
		const res = await api.getProfile(userID);

		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.message },
		});
	}
};

// Create or update profile
export const createProfile =
	(name, avatar, bio, gender, creating) => async (dispatch) => {
		try {
			var body = new URLSearchParams();
			body.append("name", name);
			body.append("bio", bio);
			body.append("avatar", avatar);
			body.append("gender", gender);
			const config = {
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			};
			await api.createProfile(body, config);

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
export const saveAvatar = (avatar) => async (dispatch) => {
	try {
		const body = new FormData();
		const config = {
			headers: {
				"Content-Type": "application/form-data",
			},
		};
		body.append("avatar", avatar);

		await api.saveAvatar(body, config);
		console.log("uploaded");
	} catch (error) {
		console.log(error);
	}
};
//get avatar
export const getAvatar = (userID) => async (dispatch) => {
	try {
		const res = await api.getAvatar(userID);

		dispatch({
			type: GET_AVATAR,
			payload: res.data,
		});
	} catch (error) {
		console.log(error);
	}
};
