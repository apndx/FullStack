import React from 'react';
import { voteAnecdote } from './reducers/anecdoteReducer.js'
import { createAnecdote } from './reducers/anecdoteReducer.js'

const App = (props) => {
  const anecdotes = props.store.getState()
  const store = props.store

  const vote = (id) => {
    console.log('vote', id)
    store.dispatch(
      voteAnecdote(id)
    )
  }

  const create = (event) => {
    event.preventDefault()
    store.dispatch(
      createAnecdote(event.target.anecdote.value)
    )
    event.target.anecdote.value = ''
  }
  
  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
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
      <h2>create new</h2>
      <form onSubmit = {create }>
        <div><input name= "anecdote"/></div>
        <button type = "submit"> create</button>
      </form>
    </div>
  )
}

export default App
