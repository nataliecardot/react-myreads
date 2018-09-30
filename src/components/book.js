import React, { Component } from 'react';
import SelectShelf from './select-shelf';
import PropTypes from 'prop-types';

// Creates a book
export default class Book extends Component {
  // static keyword is part of ES6 syntax and defines a static method; static methods are called on class itself rather than instances of class
  static propTypes = {
    books: PropTypes.array
  }

  saveThisBook = (book, shelf) => {
    // App component renders Bookshelf component with saveBook passed in as a prop. The prop is a method on the App component class
    this.props.saveBook(book, shelf);
  }

  // Ensures an image is shown even when there is no cover image available
  coverImg = book => {
    let image;
    // If book's imageLinks property is not undefined, sets image to imageLinks.thumbnail property for book
    book.imageLinks !== undefined ? image = book.imageLinks.thumbnail : image = '../img/book.png';
    return image;
  }

  render() {
    const { books } = this.props;
    if (!books) {
      return null;
    }

    return (
      <ol className="books-grid">
        {/* Mapping over this.props.books, returning new array with book */}
        {books.map(book => (
          <li key={book.title}>
            <div className="book">
              <div className="book-top">
                <img
                  // Calls this component's coverImg() method, passing book as argument, returning appropriate image
                  src={this.coverImg(book)}
                  alt="Book cover"
                  className="book-cover"
                />
                <SelectShelf
                  book={book}
                  saveThisBook={this.saveThisBook}
                />
              </div>
              <div className="book-title">{book.title}</div>
              <div className="book-authors">{book.authors}</div>
            </div>
          </li>
        ))}
      </ol>
    );
  }
}
