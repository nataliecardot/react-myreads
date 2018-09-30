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
        {/* Route renders some UI if it the path is matched */}
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
