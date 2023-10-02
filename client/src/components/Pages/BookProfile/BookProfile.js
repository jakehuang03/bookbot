import * as React from "react";
import { useParams } from "react-router-dom";
import CurrentBook from "./CurrentBook";

function BookProfile() {
  const { bookname } = useParams();
  //TODO: get book from database based on book name or book id
  const TempBook = {
    title: "The Element of Scrum",
    author: "Chris Sims",
    description:
      "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
    image: "https://source.unsplash.com/random?wallpapers",
  };

  return (
    <div>
      <h1>{bookname}</h1>
      <div className="topbookintro">
        <CurrentBook post={TempBook} />
      </div>
    </div>
  );
}

export default BookProfile;
