import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import CardHeader from "@mui/material/CardHeader";
//TODO: get user avatar
/**
 * Renders a question card with user avatar and question text.
 * @param {Object} props.user - The user object containing user information.
 * @param {string} props.user.picture - The URL of the user's profile picture.
 * @param {string} props.question - The text of the question to be displayed.
 * @returns {JSX.Element} - The JSX element representing the question card.
 */

function Question ({user, question}) {
  return (
    <Card sx={{display:'flex', m: 1}}>
      <CardHeader
        avatar={<Avatar src={user?.picture} />}
      />
        <CardContent>
          <Typography variant="h5" align="left">
            {question}
          </Typography>
        </CardContent>
    </Card>
  );
};
export default Question;
