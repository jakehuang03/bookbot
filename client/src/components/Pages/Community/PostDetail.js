import { useParams } from "react-router-dom";
import { Container } from "@mui/material";
import Post from "./Post";
import CommentBox from "./CommentBox";
import Comment from "./Comment";
import Grid from "@mui/material/Grid";
import { selectPost } from "../../../actions/community";
import { useDispatch } from "react-redux";
import { getQuesCommentByID } from "../../../actions/community";
function PostDetail() {
  const { postid } = useParams();
  const dispatch = useDispatch();
  dispatch(getQuesCommentByID(postid));
  const thisPost = JSON.parse(sessionStorage.getItem("selectedPost"));
  const CommentList = JSON.parse(sessionStorage.getItem("comment_list"));

  return (
    <Container>
      <Post post={thisPost} />
      <CommentBox />
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      {Array.isArray(CommentList)
              ? CommentList.map((comment) => (
                <Comment key={comment.CommentId} comment={comment} />
                ))
              : []}
    </Grid>
    </Container>
  );
}
export default PostDetail;
