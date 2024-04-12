import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers'; // Importing reducers

import {thunk} from 'redux-thunk';

const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk)
  )
);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
