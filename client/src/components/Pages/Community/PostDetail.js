import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectPost } from '../../../actions/community';
import { getPost } from '../../../actions/community';
function PostDetail() {
    //TODO: get post from database based on post id
    const { postid } = useParams();
    const TempPost = {
        id: 1,
        title: "What is Scrum?",
        userAsked: "John Doe",
        timeAsked: "2021-10-01",
        question: "What is Scrum?",
        answer:
            "Scrum is an Agile framework that can help teams work together. Scrum can enable teams to learn from experiences, self-organize while working on problems, to reflect on their victories and failures, to make improvements. This Agile Scrum interview question is often used as a starter question to get the interview moving. ",
    };
    
    const dispatch = useDispatch();

    // dispatch(selectPost(TempPost));
    // TODO: get past questions for the book from database based on book id
    // dispatch(getQuestionByBook(bookid));
}
export default PostDetail;