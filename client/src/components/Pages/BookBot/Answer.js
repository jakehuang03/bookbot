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
import ShareIcon from "@mui/icons-material/Share";
import CommentIcon from "@mui/icons-material/Comment";

function Answer(props) {
  const { Answer } = props;

  //TODO: Save the question to user profile
  const Save = () => {
    console.log("Saved!");
  };
  //TODO: Save the comment to user profile and question
  const Comment = () => {
    console.log("Commented!");
  };

  const More = () => {
    console.log("More!");
  };
  return (
    <Grid item xs={12} md={12}>
      <Card sx={{ display: "flex" }}>
        <CardActionArea onClick={More}>
          <CardContent sx={{ flex: 1 }}>
            <Typography variant="subtitle1" paragraph>
              {Answer.answer}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <IconButton aria-label="Bookmark" onClick={Save}>
            <BookmarkBorderIcon />
          </IconButton>
          <IconButton aria-label="Comment" onClick={Comment}>
            <CommentIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
}

Answer.propTypes = {
  Answer: PropTypes.shape({
    id: PropTypes.number.isRequired,
    answer: PropTypes.string.isRequired,
  }).isRequired,
};

export default Answer;
