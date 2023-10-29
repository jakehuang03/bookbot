import React, {useEffect} from "react";
// import Container from "@mui/material/Container";
// import Typography from "@mui/material/Typography";
// import Grid from "@mui/material/Grid";
// import Book from "../SharedComponents/Book";
// import SearchGenre from "./Search_Genre";
import { useSelector, useDispatch } from "react-redux";
import {getMyBooks} from "../../../actions/books"

export default function MyBooks() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMyBooks());
    }, [dispatch]);

    const {books} = useSelector((state) => state.books);

    return(
    <div style={{marginTop: '10px'}}>
        My Books 
    </div>
    )
};