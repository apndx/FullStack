import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import counterReducer from './reducer'
const store = createStore(counterReducer)

class App extends React.Component {

  render() {

    console.log('renderin store', store.getState())
    return (
      <div>
        <h1>anna palautetta</h1>
        <div>    
          <Button 
            handleClick = {e => store.dispatch({type: 'GOOD'}) }
            text="hyvä"
          />
          <Button 
            handleClick = {e => store.dispatch({type: 'OK'}) }
            text="neutraali"
          />
          <Button 
            handleClick = {e => store.dispatch({type: 'BAD'}) }
            text="huono"
          />                
        </div>
        <div>
          <Statistics 
            hyvä =  {store.getState().good}
            neutraali = {store.getState().ok}
            huono = {store.getState().bad}
            keskiarvo = {store.getState().good + (store.getState().bad * -1) } 
            positiivisia = {Math.round((store.getState().good)/(store.getState().good+store.getState().ok+store.getState().bad)*100)} 
          />   
        </div>
        <Button 
          handleClick = {e => store.dispatch({type: 'ZERO'}) }
          text="nollaa tilastot"
        /> 
      </div>
    )
  }
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const Statistics = (props) => {
  console.log('statisticsin saama props', props)
  if (props.hyvä === 0 && props.neutraali === 0 && props.huono === 0) {
    return (
      <div> 
        <h1>statistiikka</h1>              
        <p>ei yhtään palautetta annettu</p>
      </div>
    )
  } else {
    return (
      <table>
        <tbody>  
          <tr><th>statistiikka</th></tr>  
          <tr>
            <td>hyvä</td><td>{props.hyvä}</td>
          </tr>
          <tr>
            <td>neutraali</td><td>{props.neutraali}</td>
          </tr>
          <tr>
            <td>huono</td><td>{props.huono}</td>
          </tr>
          <tr>
            <td>keskiarvo</td><td>{props.keskiarvo}</td>
          </tr>
          <tr>
            <td>positiivisia</td><td>{props.positiivisia} %</td>
          </tr>
        </tbody> 
      </table>  
    )
  }  
}
  
const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}
  
renderApp()
store.subscribe(renderApp)