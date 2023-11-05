import * as React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";
import CardHeader from "@mui/material/CardHeader";
import { Link as RouterLink } from "react-router-dom";

function PastQuestion(props) {
  const { pastQuestion } = props;
  //TODO: get UserInfo from UserID
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
          title={pastQuestion.UserId}
          subheader={pastQuestion.CreateTime}
        />
        <CardActionArea component={RouterLink} to={`/posts/${pastQuestion.QuestionId}`}>
          <CardContent>
            <Typography variant="h5" align="left" sx={{ fontWeight: "bold" }}>
              {pastQuestion.QuestionContent}
            </Typography>
            <Typography variant="subtitle1" align="left" paragraph>
              {pastQuestion.QuestionAnswer}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}

PastQuestion.propTypes = {
  pastQuestion: PropTypes.shape({
    QuestionId: PropTypes.number.isRequired,
    UserId: PropTypes.number.isRequired,
    CreateTime: PropTypes.string.isRequired,
    QuestionContent: PropTypes.string.isRequired,
    QuestionAnswer: PropTypes.string.isRequired,
  }).isRequired,
};

export default PastQuestion;
