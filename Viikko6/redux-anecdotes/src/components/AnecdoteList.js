import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { changeNotification } from '../reducers/notificationReducer';

const AnecdoteList = ({store}) => {

    const vote = (id, content) => {
        console.log('vote', id)
        store.dispatch(
          voteAnecdote(id),          
        )
        store.dispatch(
          changeNotification(`'${content} ' has now been voted`)
        )
        setTimeout(() => {
          store.dispatch(changeNotification(null))  
        }, 5000)
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
                  <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
              </div>
              </div>
          )}
        </div>  
    )
}

export default AnecdoteList