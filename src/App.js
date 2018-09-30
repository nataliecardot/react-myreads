import React, { Component } from 'react'; // Default and named import
import { Route , Link } from 'react-router-dom';
import { update , getAll } from './BooksAPI';
import './app.css';
import Search from './components/search';
import Bookshelf from './components/bookshelf';
import Header from './components/header';

export default class App extends Component {
  state = {
    books: [],
    shelves: []
  }

  // Updates books' shelf state on server. This method is set as value of prop "saveBook" in Route's render of Bookshelf and Search components. Since state lives here, update method must go in this file
  // TODO: Because changing state of book is asynchronous, add icon to to provide visual feedback that book is being moved: <?xml version="1.0" encoding="UTF-8" standalone="no"?><svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.0" width="40px" height="40px" viewBox="0 0 128 128" xml:space="preserve"><g><path d="M78.75 16.18V1.56a64.1 64.1 0 0 1 47.7 47.7H111.8a49.98 49.98 0 0 0-33.07-33.08zM16.43 49.25H1.8a64.1 64.1 0 0 1 47.7-47.7V16.2a49.98 49.98 0 0 0-33.07 33.07zm33.07 62.32v14.62A64.1 64.1 0 0 1 1.8 78.5h14.63a49.98 49.98 0 0 0 33.07 33.07zm62.32-33.07h14.62a64.1 64.1 0 0 1-47.7 47.7v-14.63a49.98 49.98 0 0 0 33.08-33.07z" fill="#000000" fill-opacity="1"/><animateTransform attributeName="transform" type="rotate" from="0 64 64" to="-90 64 64" dur="600ms" repeatCount="indefinite"></animateTransform></g></svg>
  saveBook = (book, shelf) => {
    // This method from BooksAPI returns a promise that resolves to a JSON object containing the response data of POST request
    update(book, shelf);
    book.shelf = shelf;
    let checkForBook = this.state.books.filter(bookState => (bookState.id !==   book.id));
    // push() method appends elements to end of array
    checkForBook.push(book);
    this.setState({books: checkForBook});
  }

  // Retrieves all books. Invoked immediately after component is inserted into DOM
  // TODO: change to async/await
  componentDidMount() {
    getAll().then(books => {
      // Updating the state set above. Note in curly braces, same as books: books but ES6 object literal shorthand allows for just having it once if it's the same
      this.setState({books});
    }).then(() => {
      this.setState({
        // Sets state of shelves' associated IDs and displayed titles
        shelves: [
          {
            id: 'currentlyReading',
            title: 'Currently Reading'
          }, {
            id: 'wantToRead',
            title: 'Want to Read'
          }, {
            id: 'read',
            title: 'Read'
          }
        ]
      });
    });
  }

  // First render method is called without books being fetched, but then after component is added to DOM, componentDidMount is called with the books fetch and the state change causes render to be called again
  render() {
    const { shelves } = this.state;
    return (
      <div className="app">
        {/* Route renders some UI if the path is matched */}
        <Route
          path="/search"
          render={() => (
            <Search
              saveBook={this.saveBook}
              books={this.state.books}
            />)
          }
        />
        <Route exact path="/" render={() => (
          <div className="list-books">
            <Header />
            <div className="list-books-content">
              <div>
                {/* shelves is this.state.shelves, state set to id & title of the three shelves in componentDidMount(). For each shelf (each of three objects in shelves), taking bookshelf component, mapping over it (creating new array with executed function results), and within the map function, setting books prop to an array filtered by only those books with a shelf matching the shelf id */}
                {shelves.map(shelf => (
                  <Bookshelf
                    key={shelf.id}
                    books={this.state.books.filter(
                      book => (book.shelf === shelf.id)
                    )}
                    saveBook={this.saveBook}
                    title={shelf.title}
                  />)
                )}
              </div>
            </div>
            <div className="open-search">
              <Link to="/search" />
            </div>
          </div>
        )} />
      </div>
    );
  }
}
