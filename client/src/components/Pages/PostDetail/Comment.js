import * as React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";

/**
 * A component that displays a comment card with user information, content, and timestamp.
 * @param {Object} props.comment - The comment object containing the comment data.
 * @param {number} props.comment.CommentId - The ID of the comment.
 * @param {number} props.comment.UserId - The ID of the user who posted the comment.
 * @param {number} props.comment.QuestionId - The ID of the question the comment belongs to.
 * @param {string} props.comment.CreateTime - The timestamp when the comment was created.
 * @returns {JSX.Element} - The Comment component.
 */

function Comment(props) {
  const { comment } = props;

  const navigate = useNavigate();
  const User = () => {
    navigate(`/profile/${comment.UserId}`);
  };

  return (
    <Grid item xs={12} md={12}>
      <Card sx={{ p: 1 }}>
        <IconButton onClick={User} sx={{ display: "inline" }}>
          <Avatar
            src={`data:image/jpeg;base64,${comment.Avatar}`}
            alt={comment.UserName}
          >
            {comment.UserName.charAt(0)}
          </Avatar>
        </IconButton>
        <Typography
          variant="subtitle1"
          align="left"
          sx={{ display: "inline", m: 1 }}
          paragraph
        >
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
