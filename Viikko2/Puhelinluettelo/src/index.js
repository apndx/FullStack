import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import axios from 'axios'
import './index.css'

const promise = axios.get('http://localhost:3001/persons')
console.log(promise)


ReactDOM.render(<App />, document.getElementById('root'))
