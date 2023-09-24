import './App.css';

import React, { Fragment } from 'react'
import Navbar from "./components/layout/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Pages/Home';
import Book from './components/Pages/Bookshelf';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

const App = () => {
    const user = JSON.parse(localStorage.getItem('profile'));

    return (
        <Router>
            <Fragment>
                <Navbar />
                <Routes>
                    <Route path='/' element = {
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
                    <Route path='/Books' element = {
                        <section className='container'>
                        < Book />
                        </section>
                    } />
                    
                    
                </Routes>
            </Fragment>
        </Router>
    )
}

export default App;