import { Link, useLocation, useNavigate } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import decode from "jwt-decode";
import logo from "../../images/bookbot_logo.png";
import MenuIcon from "@mui/icons-material/Menu";
import {Box, MenuItem, Typography, Tooltip, IconButton, Avatar, Menu, Drawer, List, ListItem, ListItemText} from "@mui/material";
import { loadAvatar } from "../../actions/auth";

const Navbar = ({ auth: { isAuthenticated, loading, avatar }, loadAvatar }) => {
	const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
	const [anchorElUser, setAnchorElUser] = React.useState(null);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

	const handleMobileMenuOpen = () => {
		setMobileMenuOpen(true);
	};

	const handleMobileMenuClose = () => {
		setMobileMenuOpen(false);
	};

	const handleLinkClick = () => {
		setMobileMenuOpen(false);
	  };
	const authLinks = (
		<div>
			<ul className="nav-menu">
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
		<div >
			<ul sx={{alignItems: "center"}}>
				<li className="nav-menu">
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
				<Fragment>
					<IconButton
					onClick={handleMobileMenuOpen}
					sx={{ display: { sm: "block", md: "none" }, color: "white" }}
					>
						<MenuIcon />
					</IconButton>
					<Drawer
					anchor="top"
					open={mobileMenuOpen}
					onClose={handleMobileMenuClose}
					>
						<List>
						{window.innerWidth <= 900 ? (
							<Fragment>
							<ListItem onClick={handleLinkClick}>
								{!loading && isAuthenticated && user?.email && (
								<div className="nav-menu">{authLinks}</div>
								)}
							</ListItem>
							<ListItem onClick={handleLinkClick}>
								{!loading && !isAuthenticated && (
								<div className="nav-menu">{guestLinks}</div>
								)}
							</ListItem>
							</Fragment>
						) : null}
						</List>
					</Drawer>

				{window.innerWidth > 900 && 
				((!loading && isAuthenticated) || user?.email ? (
					<div>
					{authLinks}
					</div>
				) : (
					<div>
					{guestLinks}
					</div>
				))}
				</Fragment>	
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
