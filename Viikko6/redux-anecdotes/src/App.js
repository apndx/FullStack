import React from 'react';
import { voteAnecdote } from './reducers/anecdoteReducer.js'

const App = (props) => {
  const anecdotes = props.store.getState()
  const store = props.store

  const vote = (id) => {
    console.log('vote', id)
    store.dispatch(
      voteAnecdote(id)
    )
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
      <form>
        <div><input /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App
