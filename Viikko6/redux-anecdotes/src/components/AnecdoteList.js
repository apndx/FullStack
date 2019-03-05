import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { changeNotification } from '../reducers/notificationReducer';

const AnecdoteList = ({store}) => {

    const vote = (id) => {
        console.log('vote', id)
        store.dispatch(
          voteAnecdote(id),          
        )
        store.dispatch(
          changeNotification('anecdote voted')
        )
      }

    return(
        <div>
            {store.getState().anecdotes.map(anecdote =>
              <div key={anecdote.id}>
              <div>
                  {anecdote.content}
              </div>
              <div>
                  has {anecdote.votes}
                  <button onClick={() => vote(anecdote.id)}>vote</button>
              </div>
              </div>
          )}
        </div>  
    )
}

export default AnecdoteList