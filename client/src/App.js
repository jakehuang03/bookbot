import React from 'react'
import api from './api'
import Navbar from "./components/Navbar/Navbar";
import Footer from './components/Footer/footer';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Container } from '@mui/material';

const App = () => {
    return (
        <BrowserRouter>
            <Container  maxWidth={false} disableGutters>
                <Navbar />
                <Footer />
            </Container>
        </BrowserRouter>
    )
}

export default App;