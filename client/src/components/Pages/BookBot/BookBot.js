import { useSelector } from "react-redux";
import CurrentBook from "../BookProfile/CurrentBook";
import Answer from "./Answer";
import { Typography, Container, Grid } from "@mui/material";
//TODO: get answer from backend
//TODO: debug – if user refresh the page, the redux state is gone
const answers = [
    {
        id: 1,
        answer : "Scrum is a popular framework for agile project management that originates from software development. It is an iterative, incremental approach to project management that helps teams deliver value to their customers faster and with fewer headaches.",
},
{
    id: 2,
    answer : "The core roles in Scrum include the Product Owner, Scrum Master, and Development Team. The Product Owner is responsible for defining and prioritizing the product backlog, ensuring that the team works on the most valuable features. The Scrum Master serves as a facilitator and coach, helping the team understand and adhere to Scrum principles and practices. The Development Team is self-organizing and cross-functional, responsible for turning backlog items into a working product increment. Scrum emphasizes collaboration and transparency, with regular ceremonies such as daily stand-ups to keep the team aligned and focused on the sprint goal. Additionally, the sprint review and retrospective meetings promote continuous improvement, allowing the team to adapt to changing requirements and deliver better results with each sprint.",
},
{
    id: 3,
    answer : "Velocity is a metric used to measure the amount of work completed by a team during a sprint. It refers to the number of user stories completed in a sprint.",
},
]; 

function BookBot() {
  const book = useSelector((state) => state.bookbot.selectedBook);
  const question = useSelector((state) => state.bookbot.question);
  return (
    <Container>
      <CurrentBook book={book} />
      <Typography variant="h1">{question}?</Typography>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {answers.map((answer) => (
          <Answer key={answer.id} Answer={answer} />
        ))}
      </Grid>
    </Container>
  );
}
export default BookBot;
