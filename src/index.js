import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import App from './App';
import rootReducer from './reducers/rootReducer'
import * as serviceWorker from './serviceWorker';
import Amplify from 'aws-amplify';
import aws_exports from './aws_exports';
import './index.scss';

Amplify.configure(aws_exports);

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
