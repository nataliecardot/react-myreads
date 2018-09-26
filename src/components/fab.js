import React, { Component } from 'react';

// Fab = Floating action button

export default class Fab extends Component {
  render() {
    return (
      <div className="open-search">
        <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
      </div>
    );
  }
}
