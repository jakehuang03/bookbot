import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
import Profile from "./Profile";

const Holder = ({
	getCurrentProfile,
	auth: { user },
	profile: { profile, loading },
}) => {
	useEffect(() => {
		getCurrentProfile();
	}, [getCurrentProfile]);
	return loading && profile === null ? (
		<Spinner />
	) : (
		<div className='container'>
			<Fragment>
				<h1 className='text-primary large '>
					<i className='fas fa-user'></i>
					Welcome {user && user.data.UserName}
				</h1>
				{profile !== null && profile.bio !== null ? (
					<Fragment>
						<Profile></Profile>
					</Fragment>
				) : (
					<Fragment>
						<p>You have not yet setup a profile, please add some info</p>
						<Link to='/create-profile' className='btn btn-primary my-1'>
							Create Profile
						</Link>
					</Fragment>
				)}
			</Fragment>
		</div>
	);
};

Holder.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Holder);
