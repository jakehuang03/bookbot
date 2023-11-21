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
- [Community.js](../client/src/components/Pages/Community/Community.js)
    1. **Purpose**:
    - displays a list of asked questions with pagination
    - allows users to click on a question to view the detail
    2. **Props**:
    - (redux action) getQuestion
    - (redux state) community: { post_list }
    3. **Child components**: Post.js, QuestionPagination.js, Spinner.js
- [PostDetail](../client/src/components/Pages/PostDetail/PostDetail.js)
    1. **Purpose**:
    - displays the selected question and a list of comments
    - allows users to add comments
    2. **Props**:
    - (redux action) getQuesCommentByID
    - (redux state) community: { selectedPost, comment_list }
    3. **Child components**: Post.js, CommentBox.js, Comment.js

3. Redux
    1. State
    2. Actions
    3. Reducers

4. API
/temp370Project/client/src/utils/api.js
