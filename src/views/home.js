import React, { Component } from 'react';
import Shelf from '../components/shelf';
import Fab from '../components/fab';
import { getAll } from '../BooksAPI.js';

export default class Home extends Component {
  // Function is invoked immediately after Home component is inserted into DOM
  async componentDidMount() {
    try {
      // getAll() returns a promise that resolves to a JSON object containing a collection of book objects; books stores this (settled) promise
      const books = await getAll();
      // filter method creates new array with all elements that pass the test implemented by the provided function; if book matches listed shelf, it will be added to currentlyReading, read, wantToRead array
      // Stores books collection in addBooks prop
      this.props.addBooks(books);
    } catch(err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <Shelf
            title="Currently Reading"
            books={this.props.currentlyReading}
            moveBook={this.props.moveBook}
          />
          <Shelf
            title="Want to Read"
            books={this.props.wantToRead}
            moveBook={this.props.moveBook}
          />
          <Shelf
            title="Read"
            books={this.props.read}
            moveBook={this.props.moveBook}
          />
        </div>

        <Fab />
      </div>
    );
  }
}
