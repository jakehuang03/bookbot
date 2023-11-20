import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import Avatar from "@mui/material/Avatar";
import CardHeader from "@mui/material/CardHeader";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import { connect } from "react-redux";

/**
 * Renders a single answer card for the BookBot page.
 * @param {Object} props.Answer - The answer object containing the answer data.
 * @param {number} props.Answer.id - The unique ID of the answer.
 * @param {string} props.Answer.answer - The text content of the answer.
 * @returns {JSX.Element} - The JSX code for the answer card.
 */
const Answer = ({
  AnswerContent,
  bookbot: { saved },
}) => {  
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  /**
   * Saves the question and answer to server
   */
  const Save = () => {
    dispatch(saveAnswer(user.user));
  };

  /**
   * TODO: function for handling "More" button click.
   */
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
              {AnswerContent.answer}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          {/* if save BookmarkIcon else BookmarkBorderIcon */}
          {saved ? (
            <BookmarkIcon />
          ) : (
            <IconButton aria-label="Bookmark" onClick={Save}>
              <BookmarkBorderIcon />
            </IconButton>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
}

Answer.propTypes = {
  AnswerContent: PropTypes.shape({
    id: PropTypes.number.isRequired,
    answer: PropTypes.string.isRequired,
  }).isRequired,
	bookbot: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
	bookbot: state.bookbot,
});
export default connect(mapStateToProps, {
})(Answer);
