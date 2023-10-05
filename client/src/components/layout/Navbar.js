import { Link, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { logout } from '../../actions/auth';
import React, { Fragment, useState, useEffect } from 'react';
import decode from 'jwt-decode';
import logo from "../../images/Logo.png";
import {Box, MenuItem, Typography, Tooltip, IconButton, Avatar, Menu} from '@mui/material'

const Navbar = ({ auth: {isAuthenticated, loading}, logout }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const location = useLocation();
 
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const settings = ['Profile', 'Logout'];
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    if(user?.exp) {
       if (user.exp * 1000 < new Date().getTime()) logout();
    }
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  },[location])

  const authLinks = (
    <div>
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/books">Books</Link>
        </li>
        <li>
          <Link to="/community">Community</Link>
        </li>
        <li>
          <Link to="/chatbot">Chatbot</Link>
        </li>
        <li>
          <Link to="/mybooks">My Books</Link>
        </li>
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar src= {user?.picture}/>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
            <MenuItem key='profile' onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Profile</Typography>
            </MenuItem>
            <MenuItem key='logout' onClick={logout}>
                  <Typography textAlign="center">Logout</Typography>
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
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/books">Books</Link>
        </li>
        <li>
          <Link to="/community">Community</Link>
        </li>
        <li>
          <Link to="/mybooks">MyBooks</Link>
        </li>
        <li>
          <div className='loginBtn'>
            <Link to="/login">Login</Link>
          </div>
          
        </li>
      </ul>
    </div>
    
  );
  return (
    <div>
      <nav className="navbar">
          <Link to='/'><img src={logo} alt="icon" height={50}/></Link>
          { (<Fragment>{!loading && isAuthenticated ? authLinks : guestLinks}</Fragment>)}
      </nav>
    </div>
    
  )
}
Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}
const mapStateToProps = state =>({
  auth: state.auth
});

export default connect( mapStateToProps, { logout })(Navbar);
