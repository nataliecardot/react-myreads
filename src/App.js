// Importing combination of default export (React) and named value (component)
import React, { Component } from 'react';
// import * as BooksAPI from './BooksAPI'
import { Switch, Route } from 'react-router-dom';
import Home from './views/home';
import Search from './views/search';
// Enables usage of provider to pass down props
import Provider, { MyContext } from './Provider/';
import './App.css';

class BooksApp extends Component {
  render() {
    return (
      <div className="app">
        <Provider>
          {/* Renders first child route or redirect that matches location */}
          <Switch>
            <Route
              exact path={"/"}
              render={() => (
                // Consume provider's state
                <MyContext.Consumer>
                  {context => <Home {...context} />}
                </MyContext.Consumer>
              )}/>
            <Route
              exact path={"/search"}
              render={() => (
                // Consume provider's state
                <MyContext.Consumer>
                  {context => <Search {...context} />}
                </MyContext.Consumer>
              )}/>
          </Switch>
        </Provider>
      </div>
    )
  }
}

export default BooksApp;
