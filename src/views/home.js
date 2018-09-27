import React, { Component } from 'react';
import Shelf from '../components/shelf';
import Fab from '../components/fab';
import { getAll } from '../BooksAPI.js';

export default class Home extends Component {
  async componentDidMount() {
    try {
      const books = await getAll();
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
          <Shelf title="Currently Reading" books={this.props.currentlyReading} />
          <Shelf title="Want to Read" books={this.props.wantToRead} />
          <Shelf title="Read" books={this.props.read} />
        </div>
          <Fab />
      </div>
    );
  }
}
