import * as React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { red } from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";
import CardHeader from "@mui/material/CardHeader";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
/**
 * A component that displays a post in the community page.
 *
 * @component
 * @param {Object} props.post - The post to be displayed.
 * @param {number} props.post.QuestionId - The ID of the question.
 * @param {number} props.post.UserId - The ID of the user who posted the question.
 * @param {number} props.post.BookId - The ID of the book related to the question.
 * @param {string} props.post.CreateTime - The time when the question was created.
 * @param {string} props.post.QuestionContent - The content of the question.
 * @param {string} props.post.QuestionAnswer - The answer to the question.
 * @returns {JSX.Element} - The JSX element representing the post.
 */
function Post(props) {
  const { post } = props;
  const dispatch = useDispatch();

  // TODO: get user profile from database based on user id
  const user = {
    id: 1,
    name: "John Doe",
    email: "",
  };

  /**
   * TODO: go to user profile.
   *
   * @function
   */
  const navigate = useNavigate();
  const User = () => {
    navigate(`/profile/${post.UserId}`);
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
          // subheader={post.CreateTime}
        />
        <CardActionArea component={RouterLink} to={`/posts/${post.QuestionId}`}>
          <CardContent>
            <Typography variant="h5" align="left" sx={{ fontWeight: "bold" }}>
              {post.QuestionContent}
            </Typography>
            <Typography variant="subtitle1" align="left" paragraph>
              {post.QuestionAnswer}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button component={RouterLink} to={`/books/${post.BookId}`}>View the book </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

Post.propTypes = {
  post: PropTypes.shape({
    QuestionId: PropTypes.number.isRequired,
    UserId: PropTypes.number.isRequired,
    BookId: PropTypes.number.isRequired,
    CreateTime: PropTypes.string.isRequired,
    QuestionContent: PropTypes.string.isRequired,
    QuestionAnswer: PropTypes.string.isRequired,
  }).isRequired,
};

export default Post;
