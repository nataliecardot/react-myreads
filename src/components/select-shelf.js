import React, { Component } from 'react';

// Creates options menu for each book
export default class SelectShelf extends Component {
  state = {
    value: 'none'
  }

  // Calls updateValue, which updates state (the shelf name, stored in "value")
  handleChange = e => {
    this.updateValue(e.target.value);
    // saveThisBook prop is passed into the rendering of the SelectShelf component in the Book component, in which it is defined as a method, the first parameter being the book and the second being the shelf
    this.props.saveThisBook(this.props.book, e.target.value);
  }

  // Sets shelf state (value) to option selected
  updateValue = value => {
    this.setState({value});
  }

  // Invoked immediately after component is inserted into DOM. This lifecycle hook is used because it is the appropriate time to fetch remote data. Triggers rerendering
  componentDidMount() {
    this.updateValue(this.props.book.shelf);
  }

  render() {
    return (
      <div className="bookshelf-changer">
        {/* The value is name of state prop and passing the prop to select displays the correct state as the starting/default dropdown option */}
        <select value={this.state.value} onChange={this.handleChange}>
          <option value="none" disabled="disabled">Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">Remove</option>
        </select>
      </div>
    );
  }
}
