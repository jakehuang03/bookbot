import './App.css';

import React, { Fragment, useEffect } from 'react'
import Navbar from "./components/layout/Navbar";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from './components/Pages/Home/Home';
import Book from './components/Pages/Bookshelf/Bookshelf';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Community from './components/Pages/Community/Community';
import MyBooks from './components/Pages/MyBooks/MyBooks';
import Alert from './components/layout/Alert';
import BookProfile from './components/Pages/BookProfile/BookProfile';
import { loadPage } from './actions/auth'



const App = () => {
    return (
        <Router>
            <Fragment>
                <Navbar />
                <Alert />
                <Routes>
                    <Route path='/'element={<Navigate to="/home"/>} />
                    <Route path='/home' element = {
                            <section className='container'>
                            < Home />
                            </section>
                    } />
                    <Route path="/login" element = {
                        <section className='container'>
                        <Login />
                        </section>
                    } /> 
                    <Route path="/register" element = {
                        <section className='container'>
                        <Register />
                        </section>
                    } /> 
                    <Route path='/books' element = {
                        <section className='container'>
                        <Book />
                        </section>
                    } />
                    <Route path='/community' element = {
                        <section className='container'>
                        <Community />
                        </section>
                    } />
                    <Route path='/mybooks' element = {
                        <section className='container'>
                        <MyBooks />
                        </section>
                    } />
                    <Route path='/books/:bookname' element = {
                        <section className='container'>
                        <BookProfile />
                        </section>
                    } />
                    
                {/* Default redirect to home */}
                <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Fragment>
        </Router>
    )
}


export default App;