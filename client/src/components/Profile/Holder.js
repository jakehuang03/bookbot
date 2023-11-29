import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProfileByID } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
import Profile from "./Profile";
import { getAvatar } from "../../actions/profile";
import { useParams } from "react-router-dom";

const Holder = ({
	getProfileByID,
	getAvatar,
	auth: { user },
	profile: { profile, loading },
}) => {
	const { id } = useParams();
	useEffect(() => {
		getProfileByID(id);
		getAvatar(id);
	}, [getProfileByID, getAvatar, id]);
	return user == null ? (
		<div className='container'>
			<h1 className='text-primary large '>
				<i className='fas fa-user'></i>Please Log In First
			</h1>
		</div>
	) : loading && profile === null ? (
		<Spinner />
	) : (
		<div className='container'>
			<Fragment>
				{!loading && id == user.UserId && (
					<h1 className='text-primary large '>
						<i className='fas fa-user'></i>
						Welcome {user && user.UserName}
					</h1>
				)}
				{profile !== null && profile.bio !== null ? (
					<Fragment>
						<Profile id={id} />
					</Fragment>
				) : id == user.UserId ? (
					<Fragment>
						<p>You have not yet set up a profile, please add some info</p>
						<Link to='/create-profile' className='btn btn-primary my-1'>
							Create Profile
						</Link>
					</Fragment>
				) : (
					<h1 className='text-primary large '>
						This user doesn't have a profile yet.
					</h1>
				)}
			</Fragment>
		</div>
	);
};

Holder.propTypes = {
	getProfileByID: PropTypes.func.isRequired,
	getAvatar: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile,
});

export default connect(mapStateToProps, {
	getProfileByID,
	getAvatar,
})(Holder);
