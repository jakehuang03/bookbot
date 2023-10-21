import { useState } from "react";
import { useDispatch } from "react-redux";
import { saveAnswer } from "../../../actions/bookbot";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import CommentIcon from "@mui/icons-material/Comment";
import Avatar from "@mui/material/Avatar";
import CardHeader from "@mui/material/CardHeader";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";

function Answer(props) {
  const { Answer } = props;
  const [save, setSave] = useState(false);
  const dispatch = useDispatch();
// Save the question to user profile
const Save = () => {
  const bookid = JSON.parse(sessionStorage.getItem("selectedBook")).id;
  const userid = JSON.parse(localStorage.getItem("user"));
  const question = JSON.parse(sessionStorage.getItem("question"));
  const answers = JSON.parse(sessionStorage.getItem("answer"))[0].answer;
  console.log(bookid, userid, question, answers);
  if (bookid && userid && question && answers) {
    dispatch(saveAnswer(bookid, userid, question, answers));
    setSave(true);
  } else {
    console.log("Error saving answer");
  }
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
      <Card sx={{ display: "flex", m: 1 }}>
        <CardHeader
          avatar={
            <Avatar>
              <SmartToyOutlinedIcon />
            </Avatar>
          }
        />

        <CardActionArea onClick={More}>
          <CardContent sx={{ flex: 1 }}>
            <Typography variant="h5" align="left" paragraph>
              {Answer.answer}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <IconButton aria-label="Bookmark">
            {/* if save BookmarkIcon else BookmarkBorderIcon */}
            {save ? <BookmarkIcon /> : <BookmarkBorderIcon onClick={Save} />}
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
