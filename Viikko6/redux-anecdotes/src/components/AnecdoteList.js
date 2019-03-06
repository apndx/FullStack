import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { changeNotification } from '../reducers/notificationReducer';

const AnecdoteList = (props) => {

    console.log('anecdotelistin props', props)

    const anecdotesToShow = 
      !props.filter ?
      props.anecdotes :
      props.anecdotes.filter(anecdote => anecdote.content.includes(props.filter))

    const vote = (id, content) => {
        console.log('vote', id)
        props.voteAnecdote(id)
        props.changeNotification(`'${content} ' has now been voted`)
        setTimeout(() => {
          props.changeNotification(null)  
        }, 5000)
      }

    console.log('anecdotelistin anecdotestoshow', anecdotesToShow)  
    return(
        <div>
            {anecdotesToShow.map(anecdote =>
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

const mapStateToProps = (state) => {
  console.log(state)
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
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