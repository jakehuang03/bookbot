import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { logout } from '../../actions/auth';
import React, { Fragment } from 'react';
import logo from "../../images/Logo.png";

const Navbar2 = ({/*{ auth: {isAuthenticated, loading}, logout }*/}) => {

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
          <Link to="/community">Posts</Link>
        </li>
        <li>
          <Link to="/chatbot">Chatbot</Link>
        </li>
        <li>
          <Link to="/login">{' '}
            <span className="hide-sm">Dashboard</span>
          </Link>
        </li>
        <li>
          <a onClick={logout} href="#!">{' '}
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
          <Link to="/books">Books</Link>
        </li>
        <li>
          <Link to="/community">Community</Link>
        </li>
        <li>
          <Link to="/mybooks">My Books</Link>
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
          { (<Fragment>{ guestLinks}</Fragment>)}
          
          {/* { (<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>)} */}
      </nav>
    </div>
    
  )
}
Navbar2.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}
const mapStateToProps = state =>({
  auth: state.auth
});

export default connect( mapStateToProps, { logout })(Navbar2);
