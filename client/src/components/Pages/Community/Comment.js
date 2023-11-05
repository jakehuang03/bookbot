import * as React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";

function Comment(props) {
  const { comment } = props;
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
      <Card sx={{p:1}}>
        <IconButton onClick={User} sx={{ display: 'inline' }}>
          <Avatar sx={{ bgcolor: red[500] }}>R</Avatar>
        </IconButton>
        <Typography variant="subtitle1" align="left" sx={{ display: 'inline' , m: 1}} paragraph>
          {comment.Content}
        </Typography>
        <Typography variant="subtitle2" align="right">
          {comment.CreateTime}
        </Typography>
      </Card>
    </Grid>
  );
}

Comment.propTypes = {
  comment: PropTypes.shape({
    CommentId: PropTypes.number.isRequired,
    UserId: PropTypes.number.isRequired,
    QuestionId: PropTypes.number.isRequired,
    CreateTime: PropTypes.string.isRequired,
  }).isRequired,
};

export default Comment;