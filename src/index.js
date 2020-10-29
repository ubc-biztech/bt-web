import React from 'react'
import ReactDOM from 'react-dom'
import Amplify from 'aws-amplify'
import { Provider } from 'react-redux'

import App from './App'
import * as serviceWorker from './serviceWorker'
import Store from './store/rootStore'

import './index.scss'
import './mui-overwrites.scss'
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
