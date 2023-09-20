import React from 'react'
import api from './api'
import Navbar from "./components/Navbar/Navbar";
import Footer from './components/Footer/footer';
import Auth from "./components/Auth/auth";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from '@mui/material';

const App = () => {
    const user = JSON.parse(localStorage.getItem('profile'));

    return (
        <Router>
            <Container  maxWidth={false} disableGutters>
                <Navbar />
                <Routes>
                    <Route path="/auth" element = {<Auth />} /> 
                    {/* <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/" />)} />  */}
                </Routes>
                <Footer />
            </Container>
        </Router>
    )
}

export default App;