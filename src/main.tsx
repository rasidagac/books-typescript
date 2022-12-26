import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from './context/books';

const el = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(el);

root.render(
  <React.StrictMode>
    <Provider>
      <App />
    </Provider>
  </React.StrictMode>
);
