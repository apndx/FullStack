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
    
    klikHyvä = () => {
        this.setState({
            hyvä: this.state.hyvä +1
        })
    }
    klikNeutraali = () => {
        this.setState({
            neutraali: this.state.neutraali +1
        })
    }
    klikHuono= () => {
        this.setState({
            huono: this.state.huono +1
        })
    }


    render() {
      return (
        <div>
            <div>
                <h1>anna palautetta</h1>
                <button onClick={this.klikHyvä}>hyvä</button>                
                <button onClick={this.klikNeutraali}>neutraali</button>             
                <button onClick={this.klikHuono}>huono</button>
            </div>
            <div>
                <h1>statistiikka</h1>
                <p>hyvä {this.state.hyvä} </p>
                <p>neutraali {this.state.neutraali} </p>
                <p>huono {this.state.huono} </p>
            </div>

        </div>
      )
    }
  }
  
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  )