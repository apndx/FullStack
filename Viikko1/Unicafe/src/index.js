import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        hyvä: 0,
        neutraali: 0,
        huono: 0
      }
    }

    asetaPalaute  = (palaute, arvo) => () => {       
            this.setState({[palaute]: arvo})
    }

    render() {
      return (
        <div>
            <h1>anna palautetta</h1>
            <div>    
                <Button 
                    handleClick ={this.asetaPalaute('hyvä', this.state.hyvä +1)}
                    text="hyvä"
                />
                <Button 
                    handleClick ={this.asetaPalaute('neutraali', this.state.neutraali +1)}
                    text="neutraali"
                />
                <Button 
                    handleClick ={this.asetaPalaute('huono', this.state.huono +1)}
                    text="huono"
                />                
            </div>
            <div>
                <Statistics 
                    hyvä =  {this.state.hyvä}
                    neutraali = {this.state.neutraali}
                    huono = {this.state.huono}
                    keskiarvo = {this.state.hyvä + (this.state.huono * -1) } 
                    positiivisia = {(this.state.hyvä)/(this.state.hyvä+this.state.neutraali+this.state.huono)*100} 
                />   
            </div>
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

    if (props.hyvä === 0 && props.neutraali === 0 && props.huono === 0) {
        return (
        <div> 
            <h1>statistiikka</h1>               
            <p>ei yhtään palautetta annettu</p>
        </div>
        )
    } else {
      return (
        <div>
            <h1>statistiikka</h1>
            <p>hyvä {props.hyvä}</p>
            <p>neutraali {props.neutraali}</p>
            <p>huono {props.huono}</p>
            <p>keskiarvo {props.keskiarvo}</p>
            <p>positiivisia {props.positiivisia} %</p>         
        </div>          
      )
    }  
  }
  
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  )