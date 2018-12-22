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
        <div>
          <h2> anecdote with most votes:</h2>
              {this.props.anecdotes[findMostPopular(this.state.pisteet, 0)]}
        </div>
        <div>
            has {findMostPopular(this.state.pisteet, 1)} votes
        </div>
      </div>   
    )
  }
}

function findMostPopular(props, votes) {

  console.log('find pop saa propsin', props)
  var best = 0;
  var bestIndex =0;

  for(var i=0; i<props.length; i++) {
    if (props[i]>best)  {
      best = props[i];
      bestIndex = i;
    } 
  }
    if (votes===0) {
      console.log('find pop palauttaa', bestIndex)
       return bestIndex;
    } else {
      console.log('find votes palauttaa', best)
      return best;
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