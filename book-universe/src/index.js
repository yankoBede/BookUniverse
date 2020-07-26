import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Navigation from './navigation'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <App>
      <Navigation />
    </App>
  </React.StrictMode>,
  document.getElementById('root')
);