// This component uses the React context API, which is used to address "prop drilling" problem; for passing data through component tree without having to manually pass props down at every level. See https://reactjs.org/docs/context.html and https://medium.com/dailyjs/reacts-%EF%B8%8F-new-context-api-70c9fe01596b. Note Provider directory must be capitalized
import React, { Component } from 'react';
// Returned object (MyContext) has a Provider (used higher in tree, accepts a value prop) and Consumer component (used lower in tree, accepts a children prop). Passes state down as props
export const MyContext = React.createContext();

export default class Index extends Component {
  constructor() {
    super(); // Super allows access to parent's methods. This is required in a constructor; ES6 class constructors must call super if they are subclasses. You only need to pass in props if using this.props in the constructor. Also super must go before this because otherwise, this is uninitialized
    this.state = {
      // Telling our provider to handle these
      books: [],
      // Has provider renders books onto their own shelves
      currentlyReading: [],
      wantToRead: [],
      read: [],
      // For updating state. books are from getAll (from componentDidMount method in Home component)
      addBooks: books => {
        const currentlyReading = books.filter(book => book.shelf = 'currentlyReading');
        const read = books.filter(book => book.shelf = 'read');
        const wantToRead = books.filter(book => book.shelf = 'wantToRead');
        // setState method solves problem of not being able to set state directly because React doesn't know it changed. Rerenders application and updates UI
        this.setState({
          books,
          currentlyReading,
          read,
          wantToRead
        });
      },
      moveBook: (book, newShelf, allShelves) => {
        console.log(newShelf);
        const newBooks = this.state.books.map(allBooks => {
          // find() method returns value of first element in array that satisfies provided testing function; otherwise undefined is returned
          const foundID = allShelves[newShelf].find(
            bookID => bookID = allBooks.id
          );
          // If ID is found, sets shelf to the new shelf
          if (foundID) {
            allBooks.shelf = newShelf;
          }
          // Returns modified object
          return allBooks;
        });
        this.state.addBooks(newBooks);
      }
    };
  }

  render() {
    return (
      // Passes value of state to all of MyContext component's children
      <MyContext.Provider value={{...this.state}}>
        {/* Returns everything between a component's opening and closing JSX tags */}
        {this.props.children}
      </MyContext.Provider>
    );
  }
}
