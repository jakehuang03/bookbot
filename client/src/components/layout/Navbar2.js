import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { logout } from '../../actions/auth';
import React, { Fragment } from 'react';
import logo from "../../images/Logo.png";

const Navbar = ({ auth: {isAuthenticated, loading}, logout }) => {

  const authLinks = (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/Books">Books</Link>
        </li>
        <li>
          <Link to="/Community">Posts</Link>
        </li>
        <li>
          <Link to="/Chatbot">Chatbot</Link>
        </li>
        <li>
          <Link to="/login">
            <i className="fas fa-user" />{' '}
            <span className="hide-sm">Dashboard</span>
          </Link>
        </li>
        <li>
          <a onClick={logout} href="#!">
            <i className="fas fa-sign-out-alt" />{' '}
            <span className="hide-sm">Logout</span>
          </a>
        </li>
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
          <Link to="/Books">Books</Link>
        </li>
        <li>
          <Link to="/Community">Community</Link>
        </li>
        <li>
          <Link to="/Chatbot">Chatbot</Link>
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
          { !loading && (<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>)}
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
