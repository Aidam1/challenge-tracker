import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserProvider from "./providers/UserProvider";
import StateProvider from './providers/StateProvider';
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <StateProvider>
        <App />
      </StateProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
