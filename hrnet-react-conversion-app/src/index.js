import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/index';
import App from './App';

const root = document.getElementById('root');
const rootContainer = createRoot(root);
rootContainer.render(
  <Provider store={store}>
    <App />
  </Provider>
);


