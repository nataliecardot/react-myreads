// Importing combination of default export (React) and named value (component)
import React, { Component } from 'react';
// import * as BooksAPI from './BooksAPI'
import { Switch, Route } from 'react-router-dom';
import Home from './views/home';
import Search from './views/search';
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
                <MyContext.Consumer>
                  {context => <Home {...context} />}
                </MyContext.Consumer>
            )}/>
            <Route exact path={"/search"} component={Search} />
          </Switch>
        </Provider>
      </div>
    )
  }
}

export default BooksApp;
