import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Grid, Typography, Container, Link} from '@mui/material';
import { Facebook, Instagram, Twitter } from "@mui/icons-material";

export default function StickyFooter() {
  return (
    <Box
    position= "fixed"
    left = "0px"
    bottom = "0px"
    right = "0px"
    component="footer" 
    style={{ background: '#2E3B55' }}
    >
       <Container maxWidth={false}>
        <Grid container spacing={5}>
            <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
                About Us
            </Typography>
            </Grid>
            </Grid>
            <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
                Follow Us
            </Typography>
            <Link href="https://www.facebook.com/" color="inherit">
                <Facebook />
            </Link>
            <Link
                href="https://www.instagram.com/"
                color="inherit"
                sx={{ pl: 1, pr: 1 }}
            >
                <Instagram />
            </Link>
            <Link href="https://www.twitter.com/" color="inherit">
                <Twitter />
            </Link>
            </Grid>
        <Box mt={5}>
            <Typography variant="body2" color="text.secondary" align="center">
                {"Copyright © "}
            <Link color="inherit" href="https://your-website.com/">
                Your Website
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
            </Typography>
        </Box>
        </Container>
        </Box>
  );
}