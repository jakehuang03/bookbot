import * as api from "../utils/api";
import { setAlert } from "./alert";
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	LOAD_AVATAR,
} from "./types";

// Load User
export const loadUser = () => async (dispatch) => {
	if (!localStorage.profile) {
		dispatch({
			type: AUTH_ERROR,
		});
	} else {
		try {
			const result = await api.auth();
			const profile = JSON.parse(localStorage.profile);
			if (result.data.UserId !== profile.user || result.detail) {
				dispatch({
					type: AUTH_ERROR,
				});
			} else {
				dispatch(loadAvatar(result.data.UserId));
				dispatch({
					type: USER_LOADED,
					payload: result.data,
				});
			}
		} catch (err) {
			dispatch({
				type: AUTH_ERROR,
			});
			console.log("error", err.msg);
		}
	}
};

// Register User
export const register =
	(nickname, email, password, navigate) => async (dispatch) => {
		try {
			var body = new URLSearchParams();
			body.append("nickname", nickname);
			body.append("email", email);
			body.append("password", password);
			const config = {
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			};
			const res = await api.register(body, config);
			dispatch({
				type: REGISTER_SUCCESS,
				payload: res.data,
			});
			dispatch(setAlert("Register Success", "success"));
			navigate("/login");
		} catch (err) {
			const errors = err.response.data.detail;
			if (errors) {
				dispatch(setAlert(errors, "danger"));
			}

			dispatch({
				type: REGISTER_FAIL,
			});
		}
	};

// Login User

export const login = (username, password, navigate) => async (dispatch) => {
	const body = new FormData();
	body.append("username", username);
	body.append("password", password);
	const config = {
		headers: {
			"Content-Type": "application/form-data",
		},
	};
	try {
		const res = await api.login(body, config);

		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data,
		});
		dispatch(loadUser());
		navigate("/");
	} catch (err) {
		const errors = err.response.data.detail;
		if (errors) {
			dispatch(setAlert(errors, "danger"));
		}

		dispatch({
			type: LOGIN_FAIL,
		});
	}
};

export const googleLogin = (token, navigate) => async (dispatch) => {
	const body = new FormData();
	body.append("token", token);
	const config = {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	};
	try {
		const res = await api.googleLogin(body, config);

		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data,
		});
		dispatch(loadUser());
		navigate("/");
	} catch (err) {
		const errors = err.response.data.detail;
		if (errors) {
			dispatch(setAlert(errors, "danger"));
		}

		dispatch({
			type: LOGIN_FAIL,
		});
	}
};

//load avatar
export const loadAvatar = (userID) => async (dispatch) => {
	try {
		const res = await api.getAvatar(userID);
		dispatch({
			type: LOAD_AVATAR,
			payload: res.data,
		});
	} catch (error) {
		console.log(error);
	}
};
