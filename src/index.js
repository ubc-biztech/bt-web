import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './index.scss'
import App from './App'
import Store from './components/Store'
import * as serviceWorker from './serviceWorker'
import Amplify from 'aws-amplify'
import { AWS_CONFIG } from './constants'

Amplify.configure(AWS_CONFIG)

ReactDOM.render(
  <Provider store={Store}>
    <App />
  </Provider>
  , document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
