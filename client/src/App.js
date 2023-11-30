import "./App.css";

import React, { Fragment, useEffect } from "react";
import Navbar from "./components/layout/Navbar";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
	useNavigate,
} from "react-router-dom";
import Home from "./components/Pages/Home/Home";
import Book from "./components/Pages/Bookshelf/Bookshelf";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Community from "./components/Pages/Community/Community";
import MyBooks from "./components/Pages/MyBooks/MyBooks";
import Alert from "./components/layout/Alert";
import BookProfile from "./components/Pages/BookProfile/BookProfile";
import CreateProfile from "./components/Profile/CreateProfile";
import { loadUser } from "./actions/auth";
import BookBot from "./components/Pages/BookBot/BookBot";
import FileUpload from "./components/Pages/FileUpload/FileUpload";
import store from "./store";
import { CLEAR_PROFILE, LOGOUT } from "./actions/types";
import Holder from "./components/Profile/Holder";
import PostDetail from "./components/Pages/PostDetail/PostDetail";
import { useDispatch } from "react-redux";

const App = () => {
	const dispatch = useDispatch();
	
	useEffect(() => {
		dispatch(loadUser());
		// log user out from all tabs if they log out in one tab
		window.addEventListener("storage", () => {
			if (!localStorage.profile) {
				dispatch({ type: LOGOUT });
				dispatch({ type: CLEAR_PROFILE });
			}
		});
	}, [dispatch, ]);
	return (
		<Router>
			<Fragment>
				<Navbar />
				<Alert />
				<Routes>
					<Route path='/' element={<Navigate to='/home' />} />
					<Route
						path='/home'
						element={
							<section className='container'>
								<Home />
							</section>
						}
					/>
					<Route
						path='/login'
						element={
							<section className='container'>
								<Login />
							</section>
						}
					/>
					<Route
						path='/register'
						element={
							<section className='container'>
								<Register />
							</section>
						}
					/>
					<Route
						path='/books'
						element={
							<section className='container'>
								<Book />
							</section>
						}
					/>
					<Route
						path='/books/search'
						element={
							<section className='container'>
								<Book />
							</section>
						}
					/>
					<Route
						path='/community'
						element={
							<section className='container'>
								<Community />
							</section>
						}
					/>
					<Route
						path='/mybooks'
						element={
							<section className='container'>
								<MyBooks />
							</section>
						}
					/>
					<Route
						path='/mybooks/search'
						element={
							<section className='container'>
								<MyBooks />
							</section>
						}
					/>
					<Route
						path='/books/:bookid'
						element={
							<section className='container'>
								<BookProfile />
							</section>
						}
					/>
					<Route
						path='/profile/:id'
						element={
							<section className='container'>
								<Holder />
							</section>
						}
					/>
					<Route
						path='/edit-profile'
						element={
							<section className='container'>
								<CreateProfile />
							</section>
						}
					/>
					<Route
						path='/create-profile'
						element={
							<section className='container'>
								<CreateProfile />
							</section>
						}
					/>
					<Route
						path='/bookbot'
						element={
							<section className='container'>
								<BookBot />
							</section>
						}
					/>
					<Route
						path='/upload'
						element={
							<section className='container'>
								<FileUpload />
							</section>
						}
					/>
					<Route
						path='/posts/:postid'
						element={
							<section className='container'>
								<PostDetail />
							</section>
						}
					/>
					{/* Default redirect to home */}
					<Route path='*' element={<Navigate to='/' />} />
				</Routes>
			</Fragment>
		</Router>
	);
};

export default App;
