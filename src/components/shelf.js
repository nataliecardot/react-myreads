// Importing React library and saving it to a variable named 'React'
import React, { Component } from 'react';
import Book from './book'; 

export default class Shelf extends Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {/* If there's a books prop [books is defined], maps over books and for each one, use spread operator to spread all details into their own component and sets key prop to be book's id and sets its moveBook prop to. The JSX attribute "key" is used to keep track of lists */}
            {this.props.books &&
              this.props.books.map(
                book => <Book
                  key={book.id} {...book}
                  moveBook={this.props.moveBook}
            />)}
          </ol>
        </div>
      </div>
    );
  }
}
