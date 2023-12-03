import { Link, useNavigate } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import logo from "../../images/bookbot_logo.png";
import MenuIcon from "@mui/icons-material/Menu";
import {
	Box,
	MenuItem,
	Typography,
	Tooltip,
	IconButton,
	Avatar,
	Menu,
	Drawer,
	List,
	ListItem,
} from "@mui/material";
import { loadAvatar } from "../../actions/auth";

const Navbar = ({ auth, loadAvatar }) => {
	const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
	const [anchorElUser, setAnchorElUser] = React.useState(null);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const logout = () => {
		handleCloseUserMenu();
		dispatch({ type: "LOGOUT" });
		dispatch({ type: "CLEAR_PROFILE" });
		setUser(null);
		navigate("/home");
	};

	const toProfile = () => {
		handleCloseUserMenu();
		navigate(`/profile/${auth.user.UserId}`);
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
			<ul className='nav-menu'>
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
			</ul>
		</div>
	);

	const guestLinks = (
		<div>
			<ul sx={{ alignItems: "center" }}>
				<li className='nav-menu'>
					<Link to='/home'>Home</Link>
				</li>
				<li>
					<Link to='/books'>Books</Link>
				</li>
			</ul>
		</div>
	);
	return (
		<div>
			<nav className='navbar'>
				<Link to='/'>
					<img src={logo} alt='icon' style={{ height: "120px", objectFit: "contain" }} />
				</Link>
				<Fragment>
					<div style={{ marginLeft: 'auto' }}>
						<IconButton
							className='small'
							onClick={handleMobileMenuOpen}
							sx={{ display: { sm: "flex", md: "none" }, color: "white", marginLeft: "auto" }}
						>
							<MenuIcon />
						</IconButton>

					</div>
					<Drawer
						anchor='top'
						open={mobileMenuOpen}
						onClose={handleMobileMenuClose}
					>
						<List>
							{(!auth.loading && auth.isAuthenticated) || user?.email ? (
								<ListItem onClick={handleLinkClick}>
									<div className='pop'>{authLinks}</div>
								</ListItem>
							) : (
								<ListItem onClick={handleLinkClick}>
									<div className='pop'>{guestLinks}</div>
								</ListItem>
							)}
						</List>
					</Drawer>
					{(!auth.loading && auth.isAuthenticated) || user?.email ? (
						<div className='wide'>{authLinks}</div>
					) : (
						<div className='wide'>{guestLinks}</div>
					)}

					{/* Avatar or sign in button */}
					{(!auth.loading && auth.isAuthenticated) || user?.email ? (
						<Box sx={{ flexGrow: 0 }}>
						<Tooltip title='Open settings'>
							<IconButton onClick={handleOpenUserMenu} sx={{ p: 3 }}>
								<Avatar
									src={`data:image/jpeg;base64,${auth.avatar}`}
									alt={user?.name}
								>
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
					</Box>) : (
						<div className='loginBtn'>
							<Link to='/login'>Login</Link>
						</div>
					)}
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
