import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Navigation from './navigation'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App'
import { ToastProvider } from 'react-toast-notifications'

ReactDOM.render(
  <React.StrictMode>
    <ToastProvider>
    <App>
      <Navigation />
    </App>
    </ToastProvider>
  </React.StrictMode>,
  document.getElementById('root')
);