# Frontend

1. Structure

```bash
/temp370Project
├── /client
    ├── /public
       ├── index.html: root html file
    ├── /src
       ├── /actions: redux actions
       ├── /components: react components
            ├── /Auth
            ├── /layout
            ├── /Pages
            ├── /Profile
       ├── /reducers: redux reducers
       ├── /utils
           ├── api.js: api calls
       ├── App.js: root react component
       ├── index.js
       ├── store.js: redux store
```

2. Key Components

- [BookBot.js](../client/src/components/Pages/BookBot/BookBot.js)
  1. **Purpose**:
  - displays the selected book, asked question, answer, a list of sources with pagination
  - allows users to save the question and answer
  2. **Props**:
  - (redux state) auth: { user, avatar }
  - (redux state) bookbot: { selectedBook, question, answer, extractedpar }
  3. **Child components**: CurrentBook.js, Question.js, Answer.js, Sources.js, SourcePagination.js, Spinner.js
- [BookProfile.js](../client/src/components/Pages/BookProfile/BookProfile.js)
  1. **Purpose**:
  - displays the selected book and past questions related to the book
  - allows users to ask questions about the book
  2. **Props**:
  - (redux action) getBook
  - (redux action) getQuestionByBook
  - (redux state) bookbot: { selectedBook, pastQuestion }
  3. **Child components**: CurrentBook.js, PastQuestion.js, AskQuestion.js
- [PostDetail](../client/src/components/Pages/PostDetail/PostDetail.js)
  1. **Purpose**:
  - displays the selected question and a list of comments
  - allows users to add comments
  2. **Props**:
  - (redux action) getQuesCommentByID
  - (redux state) community: { selectedPost, comment_list }
  3. **Child components**: Post.js, CommentBox.js, Comment.js
- [Login.js, Register.js](../client/src/components/Auth)
  1. **Purpose**:
  - allow users to register and login
  2. **Props**:
  - (redux action) register, login, googleLogin
  - (redux state) auth
  3. **Child components**: input.js
- [Navbar.js](../client/src/components/layout/Navbar.js)
  1. **Purpose**:
  - display logo, and a menu of navigation to different pages
  - provides dropdown menu to access user profile and logout
  2. **Props**:
  - (redux state) auth: { avatar, isAuthenticated }
- [Profile](../client/src/components/Pages/Profile)
  1. **Purpose**:
  - displays the profile of the selected user, including
    avatar, bio, gender, and history inquiry
  - if the profile is the current user's, allow the user to edit profile
  2. **Props**:
  - (redux action) getAvatar, saveAvatar, createProfile, getProfileByID
  - (redux state) profile: { profile, avata, history }
  3. **Child components**: CreateProfile.js, Holder.js, Profile.js, ProfileAbout.js, ProfileInq.js, ProfileTop.js

3. Redux

   1. State
      - [bookbot](../client/src/reducers/bookbot.js):
        - selectedBook: book object
        - pastQuestion: a list of question objects
        - question: question string
        - answer: a list of answer objects
        - extractedpar: a list of extracted paragraph objects
        - saved: boolean whether the question and answer is saved
      - [community](../client/src/reducers/community.js):
        - count: total number of questions
        - post_list: a list of question objects with pagination
        - selectedPost: question object
        - comment_list: a list of comment objects for selectedPost
      - [auth](../client/src/reducers/auth.js):
        - isAuthenticated: if current user is logged in
        - loading: if loading, display spinner
        - user: current authenticated user's information
        - avatar: current authenticated user's avatar
      - [profile](../client/src/reducers/profile.js):
        - profile: current user's profile information
        - avatar: current user's profile avatar
        - loading: if loading, display spinner
        - error: error of accessing current user's profile
        - history: current user's history inquiry
      - [alert](../client/src/reducers/alert.js):
        - list of alerts
   2. Actions
      - [bookbot](../client/src/actions/bookbot.js): ask question and save answer
      - [community](../client/src/actions/community.js):
        - get lists of questions by user, book or pages in community
        - get selected question and comment by question id
        - save comment

   not complete

   - [auth](../client/src/actions/auth.js):
     - get lists of questions by user, book or pages in community
     - get selected question and comment by question id
     - save comment
   - [profile](../client/src/actions/profile.js):
     - get lists of questions by user, book or pages in community
     - get selected question and comment by question id
     - save comment
