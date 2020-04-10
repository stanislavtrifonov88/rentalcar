import React from 'react';
import { Link } from 'react-router-dom';
import './PageError.css';

const PageError = () => (
  <div className="errorPageContainer">
    <div>404</div>
    <h1>Page not found</h1>
    <Link to="/">Go to Home Page</Link>
  </div>
);


export default PageError;
