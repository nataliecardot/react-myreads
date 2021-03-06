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

// This is a controlled component; source of truth for that search form's state resides inside the component rather than inside the DOM. Called a controlled components because React is controlling the form's state. This enables instant search validation
export default class Search extends Component {
  // Keeps search result state updated
  updateQuery(query) {
    // Clears existing state data--the results of a previous search, if one was done. Note this is done each time a letter is entered/the search input is changed
    this.setState({results: []});
    // If matched method returns true (there's a search result from searchTerms that matches at least at the beginning what's entered in the search bar), executes BooksAPI's search method, which returns a promise that resolves to a JSON object. It takes that JSON object (the "results") and passes in the results to the checkIfSaved method. If the matched method doesn't return true, nothing is displayed because the state is already cleared, and nothing is returned because the search method is not executed
    if (this.matched(query)) {
      search(query).then(results => (this.checkIfSaved(results)));
    }
  }

  // Checks if book is already on one of the shelves with search results (from BooksAPI) that met the requirement of search input matching provided search terms
  checkIfSaved = results => {
    // filter() method creates a new array with elements that pass test implemented by provided function. some() method tests whether at least one element in the array passes the test implemented by the provided callback function
    // Regarding this.props.books: `books={this.state.books}` is passed into Router's render of Search in App component
    let notSaved = results.filter(result => !this.props.books.some(book => result.id === book.id));
    let alreadySaved = this.props.books.filter(book => results.some(result => book.id === result.id));
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
      // Creates new array from search terms list (first converting the search terms to lower case) filtered by search terms that at least partially match (at the beginning) search input
      const terms = searchTerms.filter(term => term.toLowerCase().startsWith(query.toLowerCase()));
      // If there are no items in the newly created array (no matches), matched returns false. This true/false value is used in updateQuery function
      if (terms.length < 1) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  render() {
    // Object destructuring. Instead of using this.props.saveBook, this allows for using saveBook alone when referencing it
    const { saveBook } = this.props;
    const { query } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          {/* Also can use goBack() method of history to return to the previous page, with this.props.history.goBack() */}
          <Link className="close-search" to="/" />
          <div className="search-books-input-wrapper">
            {/* Adding autoFocus attribute to input element is all that's needed to have cursor autofocused in input */}
            <input autoFocus type="text" placeholder="Search by title or author" value={query} onChange={e => this.updateQuery(e.target.value)}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {/* books displayed in rendered Book component are set to results. saveBook is method for changing bookshelf defined in App component. This prop was passed to shelf component in App component, which is how it's available here */}
            <Book books={this.state.results} saveBook={saveBook} />
          </ol>
        </div>
      </div>
    );
  }

  state = {
    results: []
  }
}
