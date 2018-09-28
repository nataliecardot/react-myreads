import React, { Component } from 'react';
// Allows us to define desired prop data type, warns if doesn't match
import PropTypes from 'prop-types';

// Creates options menu for each book
export default class SelectShelf extends Component {
  state = {
    value: 'none'
  }

  static propTypes = {
    saveThisBook: PropTypes.func.isRequired
  }

  handleChange = e => {
    e.preventDefault();
    this.updateValue(e.target.value);
    this.props.saveThisBook(this.props.book, e.target.value);
  }

  updateValue = value => {
    this.setState({value});
  }

  componentDidMount() {
    this.updateValue(this.props.book.shelf);
  }

  render() {
    return (
      <div className="bookshelf-changer">
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
