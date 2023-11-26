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
      - [books](../client/src/reducers/books.js):
        - books: current list of books depending on context (ex: bookshelf or mybooks)
        - recommended: list of recommended books
   
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
      - [books](../client/src/actions/books.js):
        - createBook: create book from the uploadbook form and redirect to that book
        - getBook: get the book based on bookid provided
        - getRecomBook: get recommended book based on bookid provided
        - getBooks: get all the published books in the database
        - getMyBooks: get all books based on userId provided
        - getBooksBySearch: get published books that match the title and genre
        - getMyBooksBySearch: get books that match the userId, title, nad genre
        - deleteBook: delete the book based on bookId provided
        - updateBook: update the book's published attribute based on bookId provided
          
# Backend

## 1. Structure:

```bash
/temp370Project
├── /Backend
    ├── /db
    ├── /router
      ├── /endpoints
    ├── /uploaded_files
    ├── /utils
       ├── /preLLM
       ├── /ToLLM
```
### Root Level

- `main.py`: The entry point for the backend application.
- `Dockerfile`: Configuration file for creating a Docker container for the application.
- `requirements.txt`: Lists all the dependencies required for the application.

### Subdirectories

#### `/db`
Handles all database interactions.

- `crud.py`: Contains CRUD operations for database interaction.
- `database.py`: Sets up the database connection and session management.

#### `/router`
Manages routing and endpoint definitions.
- `api.py`: Serves as the general router that manages all the paths of APIs.
- `/endpoints`
Stores individual files for each set of related endpoints.

  - `bookbot.py`: Endpoints for book-related operations.
  - `books.py`: Endpoints for managing book entities.
  -  `community.py`: Endpoints for community features.
  -  `mybooks.py`: Endpoints for user's book collections.
  -  `user.py`: Endpoints for user account management.

#### `/utils`
Contains utility scripts and helper functions.

- `s3.py`: Functions for interacting with Amazon S3.
- `testFunction.py`: Script for testing purposes.
- `user.py`: Utility functions for user operations.
- `prellm`
- `tollm`

#### `/uploaded_files`
A designated place for storing pdfs uploaded by the users.

## 2. API Documentation

### General Information

- **Base URL**: `http://<your-application-domain>/api`
### Endpoints


#### Bookbot Endpoints (`bookbot.py`)

- This section covers the API endpoints provided by the `bookbot.py` module, which handles the interactions with the bookbot system.
- path: `/api/bookbot`

- GET `/ask`

  - Allows users to ask questions about a specific book and receive answers based on the book's content.

  - Input:
      - `book` (string, required): The identifier or name of the book.
      - `question` (string, required): The question the user wants to ask.

  - Output

    - **Success Response**:
      - **Code**: 200 OK
      - **Content**:
        ```json
        {
          "answer": "string"
        }
        ```

    - **Error Response**:
      - **Code**: 400 Bad Request
      - **Content**:
        ```json
        {
          "detail": "Missing field: [field_name]"
        }
        ```
#### Books Endpoints (`books.py`)

- This section covers the API endpoints provided by the `books.py` module, which handles operations related to books in the system.
- Path: `/api/books`

- POST `/upload`

  - Allows users to upload a book along with its details.

  - Input:
      - `title` (string, required): The title of the book.
      - `author` (string, optional): The author of the book.
      - `summary` (string, optional): A brief summary of the book.
      - `userid` (int, required): The identifier for the user.
      - `genre` (string, optional): The genre of the book.
      - `file` (UploadFile, required): The file object of the book in PDF format.

  - Output:

    - **Success Response**:
      - **Code**: 200 OK
      - **Content**:
        ```json
        {
          "msg": "book uploaded",
          "bookid": "id"
        }
        ```

    - **Error Response**:
      - **Code**: 400 Bad Request
      - **Content**:
        ```json
        {
          "detail": "An error occurred: [error_detail]"
        }
        ```
- GET `/search`

  - Performs a search for books based on title and genre.

  - Input:
      - `searchBook` (string, required): The title of the book to search for.
      - `genre` (string, required): The genre to filter the search results.

  - Output:

    - **Success Response**:
      - **Code**: 200 OK
      - **Content**:
        ```json
        {
          // Book details
        }
        ```

    - **Error Response**:
      - **Code**: 404 Not Found
      - **Content**:
        ```json
        {
          "detail": "Book not found"
        }
        ```

- GET `/{bookId}`

  - Retrieves details for a specific book by its unique identifier.

  - Input:
      - `bookId` (int, required): The unique identifier of the book.

  - Output:

    - **Success Response**:
      - **Code**: 200 OK
      - **Content**:
        ```json
        {
          // Book details
        }
        ```

    - **Error Response**:
      - **Code**: 404 Not Found
      - **Content**:
        ```json
        {
          "detail": "Book not found"
        }
        ```

- GET `/`

  - Retrieves a list of all books available in the system.

  - Output:

    - **Success Response**:
      - **Code**: 200 OK
      - **Content**:
        ```json
        [
          // Array of book details
        ]
        ```

    - **Error Response**:
      - **Code**: 400 Bad Request
      - **Content**:
        ```json
        {
          "detail": "An error occurred: [error_detail]"
        }
        ```





## 3. Bookbot Principles
























- [KeyWordHuggingFace.py](../Backend/utils/preLLM/KeyWordHuggingFace.py)
  1. **Purpose**:
  - find a list of keywords given a question
  2. **Props**:
  - input: string
  - output: alist of string
  3. **Alts**:
  - developer can choose to use KeyWord.py in the same directory for a faster output
- [WordSearch.py](../Backend/utils/preLLM/WordSearch.py)
  1. **Purpose**:
  - a class for turning a pdf of a book into a tensor
  2. **Props**:
  - input the pdf and the keyword found above
  - outputs relavtive passeages and location in the pdf
- [localLLMCall.py](../Backend/utils/ToLLM/localLLMCall.py)
  1. **Purpose**:
  - ask either locall large language model or gpt 3.5 turbo with the information found and a question
  2. **Props**:
  - input: a list of string (texts) and a string (question)
  - output: a response as string from the large language model
  3. **Alts**: a sample of gptcall is presented, developers can modify their own version based on their needs.
- [crud.py](../Backend/db/crud.py)
  1. **Purpose**:
  - functions that would be used to communicate with database

