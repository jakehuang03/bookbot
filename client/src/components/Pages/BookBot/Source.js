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

function Source(props) {
  const { Source } = props;

  const More = () => {
    console.log("More!");
  };
  return (
    
    <Grid item xs={12} md={12}>
      <Card sx={{ display: "flex" }}>
        <CardActionArea onClick={More}>
          <CardContent sx={{ flex: 1 }}>
            <Typography variant="subtitle1" paragraph>
              {Source.content}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}

Source.propTypes = {
  Source: PropTypes.shape({
    id: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
};

export default Source;
