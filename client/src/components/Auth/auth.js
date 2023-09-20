import React, {useEffect, useState} from 'react';
import {Button, Paper, Grid, Typography, Container} from '@mui/material';
import jwt_decode from "jwt-decode";
import Input from "./input";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {signin, signup} from '../../actions/auth';
// require("dotenv").config({path: "./config.env"});
import { GoogleLogin } from '@react-oauth/google';

const initialState = {firstName: '', lastName: '', email: '', password: '', confirmPassword: ''};

const Auth = () => {
    const [formData, setFormData] = useState(initialState);
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const switchMode = () => {
        setFormData(initialState);
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    }

    const handleCallBackResponse = async (response) => {
        //console.log("Encoded JWT ID token" + response.credential);
        var userObject = jwt_decode(response.credential);
        //document.getElementById('signInDiv').hidden = true;
        try {
            dispatch({type: "AUTH", data: userObject});
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        if(isSignup) {
            dispatch(signup(formData, navigate))
        } 
        else {
            dispatch(signin(formData, navigate))
        }
        //console.log(formData);

    }

    const handleChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    const responseMessage = (response) => {
        console.log(response);
    };
    const errorMessage = (error) => {
        console.log(error);
    };
    
    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3}>
                <Typography variant="h5">
                    {isSignup ? 'Sign Up' : 'Sign In'}
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        { isSignup && (
                        <>
                        <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                        <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                        </>
                        )}
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
                    </Grid>

                    <Button type="submit" fullWidth variant="contained" color="primary">
                        { isSignup ? 'Sign Up' : 'Sign In' }
                    </Button>
                    <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
                    <div id="signInDiv">
                    </div>
                    
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth;