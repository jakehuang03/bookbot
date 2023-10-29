import { useParams } from "react-router-dom";
import { Container } from "@mui/material";
import Post from "./Post";
import CommentBox from "./CommentBox";
import Comment from "./Comment";
import Grid from "@mui/material/Grid";
function PostDetail() {
  //TODO: get post from database based on post id
  const { postid } = useParams();
  const TempPost = {
    id: 1,
    userid: 1,
    bookid: 1,
    date: "2021-10-01",
    question: "What is Scrum?",
    answer:
      "Scrum is an Agile framework that can help teams work together. Scrum can enable teams to learn from experiences, self-organize while working on problems, to reflect on their victories and failures, to make improvements. This Agile Scrum interview question is often used as a starter question to get the interview moving. ",
  };
  //TODO: get previous comments from database based on post id
  const CommentList = [
    { id: 1, user: "John Doe", questionid: 1, comment: "This is a comment" },
    {
      id: 2,
      user: "Jane Doe",
      questionid: 1,
      comment: "This is another comment",
    },
    {
      id: 3,
      user: "John Doe",
      questionid: 1,
      comment: "This is another another comment",
    },
  ];

  return (
    <Container>
      <Post post={TempPost} />
      <CommentBox />
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      {CommentList.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </Grid>
    </Container>
  );
}
export default PostDetail;
