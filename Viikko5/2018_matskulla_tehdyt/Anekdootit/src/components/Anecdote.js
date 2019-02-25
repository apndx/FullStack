import React from 'react'

const Anecdote =  ({ anecdote, handleClick}) => {
  console.log('anecdoten saama anecdote', anecdote)
  return (
    <li onClick ={handleClick}>
      {anecdote.content} has {anecdote.votes} 
    </li>
  )
}

export default Anecdote