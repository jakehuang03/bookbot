import React, { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";

const Register = ({ setAlert, register }) => {
	const [formData, setFormData] = useState({
		nickname: "",
		email: "",
		password: "",
		password2: "",
	});
	const navigate = useNavigate();

	const { nickname, email, password, password2 } = formData;
	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });
	const onSubmit = async (e) => {
		e.preventDefault();
		if (password !== password2) {
			setAlert("Passwords do not match", "danger");
		} else {
			register(nickname, email, password, navigate);
		}
	};

	return (
		<Fragment>
			<div className='contentBox'>
				<h1 className='large text-primary center-text'>Sign Up</h1>
				<p className='lead center-text'> Create Your Account</p>
				<form className='form' onSubmit={(e) => onSubmit(e)}>
					<div className='form-group'>
						<input
							type='text'
							placeholder='Nickname'
							name='nickname'
							value={nickname}
							onChange={(e) => onChange(e)}
							required
							className='center-box'
						/>
					</div>
					<div className='form-group'>
						<input
							type='email'
							placeholder='Email Address'
							name='email'
							value={email}
							onChange={(e) => onChange(e)}
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
							onChange={(e) => onChange(e)}
							minLength='6'
							className='center-box'
						/>
					</div>
					<div className='form-group'>
						<input
							type='password'
							placeholder='Confirm Password'
							name='password2'
							value={password2}
							onChange={(e) => onChange(e)}
							minLength='6'
							className='center-box'
						/>
					</div>
					<div className='center-container'>
						<input type='submit' className='btn btn-primary' value='Register' />
					</div>
				</form>

				<p className='my-1 center-text'>
					Already have an account? <Link to='/login'>Sign In</Link>
				</p>
			</div>
		</Fragment>
	);
};

Register.propTypes = {
	setAlert: PropTypes.func.isRequired,
	register: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { setAlert, register })(Register);
