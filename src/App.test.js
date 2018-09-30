import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

/**
 This course is not designed to teach Test Driven Development.
 Feel free to use this file to test your application, but it
 is not required.
**/

// TODO: See guide to React testing recommended by reviewer, who said React testing is easy with Jest and Enzyme React libraries https://jestjs.io/docs/en/tutorial-react.html. 
it ('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <App />,
    div
  );
});
