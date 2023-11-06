import { Link, useLocation, useNavigate } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import decode from "jwt-decode";
import logo from "../../images/bookbot_logo.png";
import {
	Box,
	MenuItem,
	Typography,
	Tooltip,
	IconButton,
	Avatar,
	Menu,
} from "@mui/material";
import { loadAvatar } from "../../actions/auth";

const Navbar = ({ auth: { isAuthenticated, loading, avatar }, loadAvatar }) => {
	const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
	const [anchorElUser, setAnchorElUser] = React.useState(null);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const logout = () => {
		handleCloseUserMenu();
		dispatch({ type: "LOGOUT" });
		dispatch({ type: "CLEAR_PROFILE" });
		setUser(null);
		navigate("/home");
	};

	const toProfile = () => {
		handleCloseUserMenu();
		navigate(`/profile/${user.user}`);
	};
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	useEffect(() => {
		if (user) loadAvatar(user.user);
		if (user?.exp) {
			if (user.exp * 1000 < new Date().getTime()) logout();
		}
		const token = user?.token;
		if (token) {
			const decodedToken = decode(token);

			if (decodedToken.exp * 1000 < new Date().getTime()) logout();
		}

		setUser(JSON.parse(localStorage.getItem("profile")));
	}, [location]);

	const authLinks = (
		<div>
			<ul>
				<li>
					<Link to='/home'>Home</Link>
				</li>
				<li>
					<Link to='/upload'>Upload</Link>
				</li>
				<li>
					<Link to='/books'>Books</Link>
				</li>
				<li>
					<Link to='/community'>Community</Link>
				</li>
				<li>
					<Link to='/mybooks'>My Books</Link>
				</li>
				<Box sx={{ flexGrow: 0 }}>
					<Tooltip title='Open settings'>
						<IconButton onClick={handleOpenUserMenu} sx={{ p: 3 }}>
							<Avatar src={`data:image/jpeg;base64,${avatar}`} alt={user?.name}>
								{user?.name.charAt(0)}
							</Avatar>
						</IconButton>
					</Tooltip>
					<Menu
						sx={{ mt: "70px" }}
						id='menu-appbar'
						anchorEl={anchorElUser}
						anchorOrigin={{
							vertical: "top",
							horizontal: "right",
						}}
						keepMounted
						transformOrigin={{
							vertical: "top",
							horizontal: "right",
						}}
						open={Boolean(anchorElUser)}
						onClose={handleCloseUserMenu}
					>
						<MenuItem key='profile' onClick={toProfile}>
							<Typography textAlign='center'>Profile</Typography>
						</MenuItem>
						<MenuItem key='logout' onClick={logout}>
							<Typography textAlign='center'>Logout</Typography>
						</MenuItem>
					</Menu>
				</Box>
			</ul>
		</div>
	);

	const guestLinks = (
		<div>
			<ul>
				<li>
					<Link to='/home'>Home</Link>
				</li>
				<li>
					<Link to='/upload'>Upload</Link>
				</li>
				<li>
					<Link to='/books'>Books</Link>
				</li>
				<li>
					<Link to='/community'>Community</Link>
				</li>
				<li>
					<div className='loginBtn'>
						<Link to='/login'>Login</Link>
					</div>
				</li>
			</ul>
		</div>
	);
	return (
		<div>
			<nav className='navbar'>
				<Link to='/'>
					<img src={logo} alt='icon' height={120} />
				</Link>
				{
					<Fragment>
						{(!loading && isAuthenticated) || user?.email
							? authLinks
							: guestLinks}
					</Fragment>
				}
			</nav>
		</div>
	);
};
Navbar.propTypes = {
	// logout: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	loadAvatar: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { loadAvatar })(Navbar);
