import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: Math.floor(Math.random() * 6),
      pisteet: [0, 0, 0, 0, 0, 0]
    }
  }

  changeAnecdote = (arvo) => () => {       
    this.setState({selected: arvo})
  }

  vote = (arvo) => () => {
    console.log('äänestys saa arvon', arvo)
    const kopio = [...this.state.pisteet]
    kopio[arvo] += 1  
    this.setState({pisteet: kopio})
    console.log('ääniä nyt', kopio[arvo])
    
  }

  render() {
    return (
      <div> 
        <div>
            {this.props.anecdotes[this.state.selected]} 
        </div>  
        <div>
            <Button 
                handleClick ={this.changeAnecdote(Math.floor(Math.random() * 6))}
                text="next"
            />      
        </div>
       
        <div>
       
            <Button 
                handleClick ={this.vote(this.state.selected)}
                text="vote"          
            />      
        </div>


      </div>   
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often.',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

//const pisteet = [0, 0, 0, 0, 0, 0]

const Button = (props) => {
    return (
        <button onClick={props.handleClick}>
        {props.text}
        </button>
      )
  }

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)