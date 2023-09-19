import React from 'react'
import api from './api'
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Container } from '@mui/material';

const App = () => {
    return (
        <BrowserRouter>
            <Container maxWidth="lg">
                <Navbar />
            </Container>
        </BrowserRouter>
    )
}

export default App;