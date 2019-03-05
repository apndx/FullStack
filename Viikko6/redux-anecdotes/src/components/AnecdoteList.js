import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { changeNotification } from '../reducers/notificationReducer';

const AnecdoteList = ({store}) => {

    console.log('anecdotelistin store', store)

    const anecdotesToShow = 
      !store.getState().filter ?
      store.getState().anecdotes :
      store.getState().anecdotes.filter(anecdote => anecdote.content.includes(store.getState().filter))

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

export default AnecdoteList