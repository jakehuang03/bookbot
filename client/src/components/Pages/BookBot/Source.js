import * as React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import { CardHeader } from "@mui/material";

function Source(props) {
  const { Source } = props;
  console.log(Source.page);
  const More = () => {
    console.log("More!");
  };
  return (
    <Grid item xs={2} md={4}>
      <Card>
        <CardHeader 
          title={
            <Typography variant="caption" align="left">
              Page {Source.page}
            </Typography>
          }
        />
        <CardActionArea onClick={More}>
          <CardContent>
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
