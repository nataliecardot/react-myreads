// Importing combination of default export (React) and named value (component)
import React, { Component } from 'react';
// import * as BooksAPI from './BooksAPI'
import { Switch, Route } from 'react-router-dom';
import Home from './views/home';
import Search from './views/search';
import './App.css';

class BooksApp extends Component {
  render() {
    return (
      <div className="app">
        <Switch>
          <Route exact to={"/"} component={Home} />
        <Route exact to={"/search"} component={Search} />
        </Switch>
      </div>
    )
  }
}

export default BooksApp
