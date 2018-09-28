import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './book';
import { search } from '../BooksAPI';

const searchTerms = [
  'Android',
  'Art',
  'Artificial Intelligence',
  'Astronomy',
  'Austen',
  'Baseball',
  'Basketball',
  'Bhagat',
  'Biography',
  'Brief',
  'Business',
  'Camus',
  'Cervantes',
  'Christie',
  'Classics',
  'Comics',
  'Cook',
  'Cricket',
  'Cycling',
  'Desai',
  'Design',
  'Development',
  'Digital Marketing',
  'Drama',
  'Drawing',
  'Dumas',
  'Education',
  'Everything',
  'Fantasy',
  'Film',
  'Finance',
  'First',
  'Fitness',
  'Football',
  'Future',
  'Games',
  'Gandhi',
  'Homer',
  'Horror',
  'Hugo',
  'Ibsen',
  'Journey',
  'Kafka',
  'King',
  'Lahiri',
  'Larsson',
  'Learn',
  'Literary Fiction',
  'Make',
  'Manage',
  'Marquez',
  'Money',
  'Mystery',
  'Negotiate',
  'Painting',
  'Philosophy',
  'Photography',
  'Poetry',
  'Production',
  'Programming',
  'React',
  'Redux',
  'River',
  'Robotics',
  'Rowling',
  'Satire',
  'Science Fiction',
  'Shakespeare',
  'Singh',
  'Swimming',
  'Tale',
  'Thrun',
  'Time',
  'Tolstoy',
  'Travel',
  'Ultimate',
  'Virtual Reality',
  'Web Development',
  'iOS'
]

export default class Search extends Component {
  // Keeps search result state updated
  updateQuery(query) {
    this.setState({results: []});
    if (this.matched(query)) {
      // search method from BooksAPI returns a promise that resolves to a JSON object containing a collection of a maximum of 20 book objects
      search(query.trim()).then(results => (this.checkIfSaved(results)));
    } else {
      this.setState({results: []});
    }
  }

  // Checks if book is already on shelf
  checkIfSaved = results => {
    // filter() method creates a new array with elements that pass test implemented by provided function
    let notSaved = results.filter(nb => !this.props.books.some(ob => nb.id === ob.id));
    let alreadySaved = this.props.books.filter(ob => results.some(nb => ob.id === nb.id));
    this.setState(state => {
      // concat() method merges two or new arrays. It doesn't change the existing arrays, but returns a new array
      state.results = state.results.concat(notSaved);
      state.results = state.results.concat(alreadySaved);
      return state;
    })
  }

  // Enables usage of provided search terms
  matched = query => {
    if (query) {
      const terms = searchTerms.filter(term => term.toLowerCase().startsWith(query.toLowerCase()))
      if (terms.length < 1) {
        return false
      } else {
        return true
      }
    } else {
      return false
    }
  }

  render() {
    // Object destructuring. Instead of using this.props.saveBook, this allows for using saveBook alone when referencing it
    const { saveBook } = this.props;
    const { query } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/'>
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" value={query} onChange={e => this.updateQuery(e.target.value)}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            <Book books={this.state.results} saveBook={saveBook}/>
          </ol>
        </div>
      </div>
    );
  }

  state = {
    results: []
  }
}
