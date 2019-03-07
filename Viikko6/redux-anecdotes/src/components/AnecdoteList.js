import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { changeNotification } from '../reducers/notificationReducer';

const AnecdoteList = (props) => {

    //console.log('anecdotelistin props', props)
    const vote = (id, content) => {
        //console.log('vote', id)
        props.voteAnecdote(id)
        props.changeNotification(`'${content} ' has now been voted`, 5)
      }

    return(
        <div>
            {props.visibleAnecdotes.map(anecdote =>
              <div key={anecdote.id}>
              <div>
                  {anecdote.content}
              </div>
              <div>
                  has {anecdote.votes}
                  <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
              </div>
              </div>
          )}
        </div>  
    )
}

const anecdotesToShow = ({ anecdotes, filter }) => {
  if (!filter) {
    return anecdotes
  }
  return anecdotes.filter(anecdote => anecdote.content.includes(filter))
}


const mapStateToProps = (state) => {
  //console.log(state)
  return {
    visibleAnecdotes: anecdotesToShow(state)
  }
}

const mapDispatchToProps = {
  voteAnecdote,
  changeNotification
}


const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
  )(AnecdoteList)
export default ConnectedAnecdoteList