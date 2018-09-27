import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// Fab = Floating action button

export default class Fab extends Component {
  render() {
    return (
      <div className="open-search">
        <Link to={"/search"}>
          Add a book
        </Link>
      </div>
    );
  }
}
