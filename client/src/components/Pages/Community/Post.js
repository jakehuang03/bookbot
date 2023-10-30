import * as React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import Button from "@mui/material/Button";
import CommentIcon from "@mui/icons-material/Comment";
import { red } from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";
import CardHeader from "@mui/material/CardHeader";
import { TextField } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function Post(props) {
  const { post } = props;
  // get user profile from database based on user id
  const user = {
    id: 1,
    name: "John Doe",
    email: "",
  };
  // get book name from database based on book id
  const book = {
    id: 1,
    title: "The Elements of Scrum.pdf",
  };

  const User = () => {
    console.log("User!");
  };

  return (
    <Grid item xs={12} md={12}>
      <Card>
        <CardHeader
          align="left"
          avatar={
            <IconButton onClick={User}>
              <Avatar sx={{ bgcolor: red[500] }}>R</Avatar>
            </IconButton>
          }
          title={user.name}
          subheader={post.date}
        />
        <CardActionArea component={RouterLink} to={`/posts/${post.id}`}>
          <CardContent>
            <Typography variant="h5" align="left" sx={{ fontWeight: "bold" }}>
              {post.question}
            </Typography>
            <Typography variant="subtitle1" align="left" paragraph>
              {post.answer}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button component={RouterLink} to={`/books/${book.id}`}>{book.title} </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

Post.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    userid: PropTypes.number.isRequired,
    bookid: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
  }).isRequired,
};

export default Post;
