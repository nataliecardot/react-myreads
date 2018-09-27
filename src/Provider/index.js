// This component uses the React context API, which is used to address "prop drilling" problem; for passing data through component tree without having to manually pass props down at every level. See https://reactjs.org/docs/context.html and https://medium.com/dailyjs/reacts-%EF%B8%8F-new-context-api-70c9fe01596b. Note Provider directory must be capitalized
import React, { Component } from 'react';
// Returned object (MyContext) has a Provider (used higher in tree, accepts a value prop) and Consumer component (used lower in tree, accepts a children prop)
export const MyContext = React.createContext();

export default class Index extends Component {
  constructor() {
    super();
    this.state = {
      books: [],
      currentlyReading: [],
      wantToRead: [],
      read: [],
      addBooks: books => {
        const currentlyReading = books.filter(
          book => book.shelf = 'currentlyReading'
        );
        const read = books.filter(book => book.shelf = 'read');
        const wantToRead = books.filter(book => book.shelf = 'wantToRead');
        this.setState({books, currentlyReading, read, wantToRead});
      },
      moveBook: (book, newShelf, allShelves) => {
        console.log(newShelf);
        const newBooks = this.state.books.map(allBooks => {
          const foundID = allShelves[newShelf].find(
            bookID => bookID = allBooks.id
          );
          // If ID is found, set shelf to the new shelf
          if (foundID) {
            allBooks.shelf = newShelf;
          }
          // Return modified object
          return allBooks;
        });
        this.state.addBooks(newBooks);
      }
    };
  }

  render() {
    return (
      <MyContext.Provider value={{...this.state}}>
        {this.props.children}
      </MyContext.Provider>
    );
  }
}
