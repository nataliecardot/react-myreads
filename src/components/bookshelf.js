import React, { Component } from 'react';
import Book from './book';

// TODO: convert to stateless functional component?
export default class Bookshelf extends Component {
  render() {
    const { books, saveBook, title } = this.props;
    if (!books) {
      return null;
    }

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <Book
            saveBook={saveBook}
            books={books}
          />
        </div>
      </div>
    );
  }
}
