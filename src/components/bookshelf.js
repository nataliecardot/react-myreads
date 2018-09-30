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
          {/* Since saveBook and books props are passed to Route component's render of Bookshelf in App component, they can be passed down to Book as well. They must be passed here to display books and for shelf changing capability */}
          <Book
            saveBook={saveBook}
            books={books}
          />
        </div>
      </div>
    );
  }
}
