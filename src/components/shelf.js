// Importing React library and saving it to a variable named 'React'
import React, { Component } from 'react';
import Book from './book'; // Syntax for default export import (no curly braces)

export default class Shelf extends Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">Currently Reading</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            <Book />
          </ol>
        </div>
      </div>
    );
  }
}
