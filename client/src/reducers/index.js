import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import books from "./books";
import bookbot from "./bookbot";
import profile from "./profile.js";
import community from "./community.js";
export default combineReducers({
	alert,
	auth,
	books,
	bookbot,
	profile,
	community,
});
