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
        - bookbot: 
            - selectedBook: book object 
            - pastQuestion: a list of question objects
            - question: question string
            - answer: a list of answer objects
            - extractedpar: a list of extracted paragraph objects
            - saved: boolean whether the question and answer is saved
        - community:
            - count: total number of questions
            - post_list: a list of question objects with pagination
            - selectedPost: question object
            - comment_list: a list of comment objects for selectedPost
    2. Actions
        - bookbot: ask question and save answer
        - community: 
            - get lists of questions by user, book or pages in community
            - get selected question and comment by question id
            - save comment