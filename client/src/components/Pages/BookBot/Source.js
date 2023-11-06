import * as React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import { CardHeader } from "@mui/material";

/**
 * A component that displays a source card with page number and content.
 *
 * @component
 * @param {Object} props.Source - The source object containing id, page number, and content.
 * @param {number} props.Source.id - The id of the source.
 * @param {number} props.Source.page - The page number of the source.
 * @param {string} props.Source.content - The content of the source.
 * @returns {JSX.Element} - The JSX element representing the source card.
 */
function Source(props) {
  const { Source } = props;
  console.log(Source.page);

  /**
   * TODO: logs "More!" to the console.
   *
   * @function
   */
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
