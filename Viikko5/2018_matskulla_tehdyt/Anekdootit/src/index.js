import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import voteReducer from './voteReducer'
import { Provider } from 'react-redux'
import App from './App'

const store = createStore(voteReducer)

ReactDOM.render(
  <Provider store={createStore(voteReducer)}>
    <App />
  </Provider>,
  document.getElementById('root')
)