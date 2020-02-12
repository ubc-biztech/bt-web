import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import './index.scss';
import App from './App';
import rootReducer from './reducers/rootReducer'
import * as serviceWorker from './serviceWorker';
import Amplify from 'aws-amplify';
import { AWS_CONFIG } from './utils';

Amplify.configure(AWS_CONFIG);

const store = createStore(rootReducer)

ReactDOM.render(

  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
