you can install the application by following the instruction [here](Install.md)

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
        - loadUser: load current logged in user using the token saved in local storage
        - register: register user with input of nickname, email, password
        - login: log in user with input of username and password
        - loadAvatar: load avatar with the input of the user id
      - [profile](../client/src/actions/profile.js):
        - getProfileByID: get profile information by the input user id
        - createProfile: create and update profile information with the input name, bio, avatar, and gender
        - saveAvatar: save avatar with the input of the image file
        - getAvatar: get avatar with the input of user id
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
  - `community.py`: Endpoints for community features.
  - `mybooks.py`: Endpoints for user's book collections.
  - `user.py`: Endpoints for user account management.

#### `/utils`

Contains utility scripts and helper functions.

- `s3.py`: Functions for interacting with Amazon S3.
- `testFunction.py`: Script for testing purposes.
- `user.py`: Utility functions for user operations.
- `prellm`: Process both the pdf file and question
- `tollm`: Feed the related text from the keyword of the question and the question to large language model

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

#### MyBooks Endpoints (`mybooks.py`)

- This section details the API endpoints from the `mybooks.py` module, which facilitate actions on the books uploaded by users.
- Path: `/api/mybooks`

- GET `/`

  - Retrieves a list of books uploaded by a specific user.

  - Input:

    - None. User identification is typically determined by the user's session or token.

  - Output:

    - **Success Response**:

      - **Code**: 200 OK
      - **Content**: A JSON array of book details.

    - **Error Response**:
      - **Code**: 400 Bad Request
      - **Content**:
        ```json
        {
        	"detail": "An error occurred: [error_detail]"
        }
        ```

- PATCH `/`

  - Updates the published status of a user's book.

  - Input:

    - `userId` (int, required): The identifier of the user.
    - `bookId` (int, required): The identifier of the book.
    - `published` (bool, required): The target published status for the book.

  - Output:

    - **Success Response**:

      - **Code**: 200 OK
      - **Content**: An empty list, indicating the published status has been updated.

    - **Error Response**:
      - **Code**: 400 Bad Request
      - **Content**:
        ```json
        {
        	"detail": "An error occurred: [error_detail]"
        }
        ```

- DELETE `/`

  - Deletes a specific book uploaded by the user.

  - Input:

    - `userId` (int, required): The identifier of the user.
    - `bookId` (int, required): The identifier of the book to be deleted.

  - Output:

    - **Success Response**:

      - **Code**: 200 OK
      - **Content**: An empty list, signifying successful deletion.

    - **Error Response**:
      - **Code**: 400 Bad Request
      - **Content**:
        ```json
        {
        	"detail": "An error occurred: [error_detail]"
        }
        ```

- GET `/search`

  - Searches for books uploaded by a specific user based on title and genre.

  - Input:

    - `searchBook` (string, required): The title of the book to search for.
    - `genre` (string, required): The genre to filter the search.
    - `userId` (int, required): The identifier of the user.

  - Output:

    - **Success Response**:

      - **Code**: 200 OK
      - **Content**: The details of the book, if found.

    - **Error Response**:
      - **Code**: 500 Internal Server Error
      - **Content**:
        ```json
        {
        	"detail": "An unexpected error occurred: [error_detail]"
        }
        ```

#### Community Endpoints (`community.py`)

- This section documents the API endpoints provided by the `community.py` module, which handles community interactions including questions and comments about books.
- Path: `/api/community`

- POST `/saveques`

  Allows users to post and save questions about a book.

  - **Input:**

    - `userid` (int, required): The identifier of the user posting the question.
    - `bookid` (int, required): The identifier of the book the question is about.
    - `content` (str, required): The content of the question.
    - `answer` (str, required): The answer to the question.

  - **Output:**

    - **Success Response:**

      - **Code**: 200 OK
      - **Content**:
        ```json
        {
          "msg": "question saved",
          "questionid": id
        }
        ```

    - **Error Response:**
      - **Code**: 400 Bad Request
      - **Content**:
        ```json
        {
        	"detail": "An error occurred: [error_detail]"
        }
        ```

- **POST `/saveques`**

  Allows users to post and save questions about a book.

  - **Input:**

    - `userid` (int, required): The identifier of the user posting the question.
    - `bookid` (int, required): The identifier of the book the question is about.
    - `content` (str, required): The content of the question.
    - `answer` (str, required): The answer to the question.

  - **Output:**

    - **Success Response:**

      - **Code**: 200 OK
      - **Content**:
        ```json
        {
          "msg": "question saved",
          "questionid": id
        }
        ```

    - **Error Response:**
      - **Code**: 400 Bad Request
      - **Content**:
        ```json
        {
        	"detail": "An error occurred: [error_detail]"
        }
        ```

- **GET `/getquesbyuser/{userid}`**

  Retrieves questions posted by a specific user.

  - **Input:**

    - `userid` (int, required): The identifier of the user whose questions are to be retrieved.

  - **Output:**
    - List of questions posted by the specified user.

- **GET `/getquesbybook/{bookid}`**

  Retrieves questions related to a specific book.

  - **Input:**

    - `bookid` (int, required): The identifier of the book for which questions are to be retrieved.

  - **Output:**
    - List of questions related to the specified book, including user and book information.

- **GET `/getquesbyques/{questionid}`**

  Retrieves a specific question by its identifier.

  - **Input:**

    - `questionid` (int, required): The identifier of the question to be retrieved.

  - **Output:**
    - Details of the specified question, including user and book information.

- **GET `/getquescount`**

  Retrieves the total count of questions in the database.

  - **Output:**
    - Total count of questions.

- **GET `/getquesbypage/{page}`**

  Retrieves a paginated list of questions.

  - **Input:**

    - `page` (int, required): The page number for pagination.

  - **Output:**
    - List of questions for the specified page, including user and book information.

- **POST `/savecomment`**

  Allows users to post comments on a question.

  - **Input:**

    - `questionid` (int, form, required): The identifier of the question for which the comment is posted.
    - `userid` (int, form, required): The identifier of the user posting the comment.
    - `content` (str, form, required): The content of the comment.

  - **Output:**

    - **Success Response:**

      - **Code**: 200 OK
      - **Content**:
        ```json
        {
          "msg": "comment saved",
          "commentid": id
        }
        ```

    - **Error Response:**
      - **Code**: 400 Bad Request
      - **Content**:
        ```json
        {
        	"detail": "An error occurred: [error_detail]"
        }
        ```

- **GET `/getcommentbyques/{questionid}`**

  Retrieves comments for a specific question.

  - **Input:**

    - `questionid` (int, required): The identifier of the question for which comments are to be retrieved.

  - **Output:**
    - List of comments related to the specified question, including user information.

#### User Endpoints (`user.py`)

- This section covers the API endpoints provided by the `books.py` module, which handles operations related to books in the system.
- Path: `/api/books`

- **POST `/token`**

  Allows users to log in and obtain an access token.

  - **Input:**

    - `form_data` (OAuth2PasswordRequestForm, required): User login credentials.
      - `username` (str, required): User's email.
      - `password` (str, required): User's password.

  - **Output:**
    - **Success Response:**
      - **Code**: 200 OK
      - **Content**:
        ```json
        {
          "userID": id,
          "access_token": access_token,
          "name": name,
          "token_type": "bearer"
        }
        ```
    - **Error Response:**
      - **Code**: 400 Bad Request
      - **Content**: "Incorrect username or password"

- **POST `/googleSignIn`**

  Allows users to log in using Google authentication and obtain an access token.

  - **Input:**

    - `token` (str, form, required): Google authentication token.

  - **Output:**
    - **Success Response:**
      - **Code**: 200 OK
      - **Content**:
        ```json
        {
          "userID": id,
          "access_token": access_token,
          "name": name,
          "token_type": "bearer"
        }
        ```
    - **Error Response:**
      - **Code**: 400 Bad Request
      - **Content**: "Invalid token" or "Please use BookBot Signin instead"

- **POST `/signup`**

  Allows users to sign up for the service.

  - **Input:**

    - `nickname` (str, form): User's nickname.
    - `email` (str, form, required): User's email.
    - `password` (str, form, required): User's password.

  - **Output:**
    - **Success Response:**
      - **Content**: "signup successed"

- **GET `/me`**

  Retrieves the current user's information using the provided access token.

  - **Output:**
    - User information for the authenticated user.

- **POST `/createprofile`**

  Allows users to create or update their user profile.

  - **Input:**

    - `name` (str, form): User's name.
    - `bio` (str, form): User's bio.
    - `avatar` (str, form): User's avatar URL.
    - `gender` (str, form): User's gender.

  - **Output:**
    - **Success Response:**
      - **Content**: "profile created"

- **GET `/getprofile/{userid}`**

  Retrieves a user's profile by their user ID.

  - **Input:**

    - `userid` (int, required): The identifier of the user.

  - **Output:**
    - User profile information.

- **GET `/getprofile`**

  Retrieves the profile of the currently authenticated user.

  - **Output:**
    - User profile information.

- **PUT `/s3upload`**

  Allows users to upload an image to an S3 bucket.

  - **Input:**

    - `avatar` (UploadFile, form, required): The image file to upload.

  - **Output:**
    - **Success Response:**
      - **Content**: "file uploaded"
    - **Error Response:**
      - If there's an error in uploading.

- **GET `/s3get/{userid}`**

  Retrieves an image from an S3 bucket by user ID.

  - **Input:**

    - `userid` (int, required): The identifier of the user.

  - **Output:**
    - Base64-encoded image data.

# Bookbot Principles

## Main Algorithm

The Bookbot operates on a structured multi-step algorithm:

### Step 1: Text and Question Processing

#### Text Conversion:

- **Input**: Text in PDF format.
- **Process**: Use `WordSearch.py/book_to_tensor` to convert all text into a tensor format.
- **Output**: Text as a tensor.

#### Question Analysis:

- **Input**: A question in string format.
- **Process**: Apply `KeyWordHuggingFace.py` to extract the key keyword, a list containing one word.
- **Output**: Keyword as a list.

### Step 2: Word Search and Context Extraction

#### Word Position Identification:

- **Inputs**: Tensor from Step 1, Keyword.
- **Process**: `WordSearch.py/find_word(keyword)` to locate the position of the word.
- **Output**: Position of the word in the context as a list.

#### Contextual Sentences Extraction:

- **Input**: Word positions.
- **Process**: `WordSearch.py/sentences_around_index(word_positions, 2)` to find the 2 sentences before and after the sentence containing the word.
- **Output**: A map of sentences around the keyword.

### Step 3: Context and Question Analysis

#### Local Language Model Processing:

- **Inputs**: Context and Question.
- **Process**: `localLLMCall.py/localcall(context, question)` feeds both context and question to Chat GPT Turbo.
- **Output**: Response as a string.

## Core Functions

### `KeyWordHuggingFace.py`

- `class KeyphraseExtractionPipeline(TokenClassificationPipeline)`:
  - **Purpose**: Define the pipeline using Hugging Face's model.
  - **Process**: Extract the keyword using the first strategy (greedy) from the model.
- `def extract(text)`:
  - **Purpose**: Static function with designated model.

### `WordSearch.py`

- **Purpose**: A class for converting a PDF of a book into a tensor.
- `pdf_to_string(self)`: Extract text from a PDF file.
  - **Output**: Text as a string.
- `def max_vocab(self)`: Determine the maximum vocabulary in a book.
  - **Output**: Integer indicating the maximum vocabulary size.
- `def book_to_tensor(self, max_sequence_length=None)`: Convert a book into a tensor.
  - **Output**: Tensor, tokenizer, positions in tensor.
- `def find_word(self, word)`: Locate a word in the tensor.
  - **Output**: Position of the word.
- `def sentences_around_index(self, indices, x)`: Extract sentences around a specific word.
  - **Output**: Map of related passages.
- `def position_to_page_number(self, position)`: Map a text position to a page number.
  - **Output**: Page number as an integer.

### `localLLMCall.py`

- `def localcall(paragraphs, question)`:
  - **Purpose**: Integrate document preparation, system templating, and messaging payload creation for the Chat GPT Turbo API using the DaVinci model.
- `def localcall2(paragraphs, question)`:
  - **Purpose**: Define a local language model and prepare documents for the local model's API with gpt4all.
