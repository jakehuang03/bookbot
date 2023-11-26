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
- [Bookshelf](../client/src/components/Pages/Bookshelf)
  1. **Purpose**:
  - display the published books users uploaded
  - include the search feature to find books by title and genre
  2. **Props**:
  - (redux action) getBooks
  - (redux state) books
  3. **Child components**: Book
- [MyBooks](../client/src/components/Pages/MyBooks)
  1. **Purpose**:
  - display the books the current user uploaded
  - include the search feature to find books by title and genre
  - provide the ability for the user to publish/unpublish and delete a book
  - provide a button for uploading a book
  2. **Props**:
  - (redux action) getMyBooks
  - (redux state) books
  3. **Child components**: Book
- [FileUpload](../client/src/components/Pages/FileUpload)
  1. **Purpose**:
  - form for users to upload a PDF where the file and title are required
  - file drop and upload button for more ways to upload a file
  2. **Props**:
  - (redux action) createBook
  
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
      - [auth](../client/src/actions/auth.js):
        - load current logged in user using the token saved in local storage
        - register user with input of nickname, email, password
        - log in user with input of username and password
        - google log in
        - load avatar with the input of the user id
      - [profile](../client/src/actions/profile.js):
        - get profile information by the input user id
        - create and update profile information with the input name, bio, avatar, and gender
        - save avatar with the input of the image file
        - get avatar with the input of user id
