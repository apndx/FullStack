import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import axios from 'axios'
import './index.css'

const promise = axios.get('https://restcountries.eu/rest/v2/all')
console.log(promise)


ReactDOM.render(<App />, document.getElementById('root'))
