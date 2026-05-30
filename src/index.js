import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';

const container = document.getElementById('root');
console.log('root container:', container);

if (!container) {
  throw new Error("Cannot find #root in public/index.html");
}

const root = ReactDOM.createRoot(container);
root.render(<App />);