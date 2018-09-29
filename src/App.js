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

  // Updates book on server
  saveBook = (book, shelf) => {
    // This method from BooksAPI returns a promise that resolves to a JSON object containing the response data of the POST request
    update(book, shelf);
    book.shelf = shelf;
    let checkForBook = this.state.books.filter(bookState => (bookState.id !== book.id));
    checkForBook.push(book);
    this.setState({books: checkForBook});
  }

  // Retrieves all books. Invoked immediately after component is inserted into DOM
  componentDidMount() {
    getAll().then(books => {
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

  render() {
    const { shelves } = this.state;
    return (
      <div className="app">
        <Route path="/search" render={({history}) => (<Search saveBook={(book, shelf) => {
            this.saveBook(book, shelf)
          }} books={this.state.books}/>)}
        />
        <Route exact path="/" render={() => (
          <div className="list-books">
            <Header />
            <div className="list-books-content">
              <div>
                {shelves.map(shelf => (<Bookshelf key={shelf.id} books={this.state.books.filter(book => (book.shelf === shelf.id))} saveBook={this.saveBook} title={shelf.title} />))}
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
