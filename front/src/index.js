import React from 'react'
import ReactDOM from 'react-dom'

import {BrowserRouter as Router} from 'react-router-dom'
import Routes from './routes.js'

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { appReducer } from './store/appReducer'

import './index.css'

const store = createStore(appReducer)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
