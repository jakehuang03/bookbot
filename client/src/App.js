import './App.css';

import React, { Fragment, useEffect } from 'react'
import Navbar2 from "./components/layout/Navbar2";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Pages/Home';
import Book from './components/Pages/Bookshelf';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import store from './store';

import { loadPage } from './actions/auth'

const App = () => {
    return (
        <Router>
            <Fragment>
                <Navbar2 />
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