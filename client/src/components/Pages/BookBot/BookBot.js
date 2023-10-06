import CurrentBook from "../BookProfile/CurrentBook";
import { useSelector } from "react-redux";

function BookBot() {
  const book = useSelector((state) => state.bookbot.selectedBook);
  const question = useSelector((state) => state.bookbot.question);
  console.log(book);
  return (
    <div>
      <CurrentBook book={book} />
    </div>
  );
}
export default BookBot;
