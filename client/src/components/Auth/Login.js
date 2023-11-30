import React, { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { login, googleLogin } from "../../actions/auth";
import { GoogleLogin } from "@react-oauth/google";

const Login = ({ login }) => {
	const [formData, setFormData] = useState({
		username: "",
		password: "",
	});
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { username, password } = formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value }); //[e.target.name] create a dynamic key, e.target.value is assigned to the key

	const onSubmit = (e) => {
		e.preventDefault();
		login(username, password, navigate);
	};

	const handleCallBack = (response) => {
		try {
			dispatch(googleLogin(response.credential, navigate));
		} catch (error) {
			console.log(error);
		}
	};

	const errorMessage = (error) => {
		console.log(error);
	};

	return (
		<Fragment>
			<div className='contentBox'>
				<h1 className='large text-primary center-text'>Sign In</h1>
				<p className='lead center-text'>Sign Into Your Account</p>
				<form className='form' onSubmit={onSubmit}>
					<div className='form-group center-box'>
						<input
							type='email'
							placeholder='Email'
							name='username'
							value={username}
							onChange={onChange}
							required
							className='center-box'
						/>
					</div>
					<div className='form-group'>
						<input
							type='password'
							placeholder='Password'
							name='password'
							value={password}
							onChange={onChange}
							minLength='6'
							required
							className='center-box'
						/>
					</div>

					<div className='center-container'>
						<input type='submit' className='btn btn-primary' value='Login' />
					</div>
				</form>
				{/* <div className='googleLog'>
					<GoogleLogin onSuccess={handleCallBack} onError={errorMessage} />
				</div> */}
				<p className='my-1 center-text'>
					Don't have an account? <Link to='/register'>Sign Up</Link>
				</p>
			</div>
		</Fragment>
	);
};

Login.propTypes = {
	login: PropTypes.func.isRequired,
	// isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
	// isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
// export default (Login);
