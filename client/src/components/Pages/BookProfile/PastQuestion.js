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
import { red } from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";
import CardHeader from "@mui/material/CardHeader";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link as RouterLink } from "react-router-dom";

function PastQuestion(props) {
  const { pastQuestion } = props;

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
          title={pastQuestion.userAsked}
          subheader={pastQuestion.timeAsked}
        />
        <CardActionArea component={RouterLink} to={`/posts/${pastQuestion.id}`}>
          <CardContent>
            <Typography variant="h5" align="left" sx={{ fontWeight: "bold" }}>
              {pastQuestion.question}
            </Typography>
            <Typography variant="subtitle1" align="left" paragraph>
              {pastQuestion.answer}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}

PastQuestion.propTypes = {
  pastQuestion: PropTypes.shape({
    id: PropTypes.number.isRequired,
    userAsked: PropTypes.string.isRequired,
    timeAsked: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
  }).isRequired,
};

export default PastQuestion;
