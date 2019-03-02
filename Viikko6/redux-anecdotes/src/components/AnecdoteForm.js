import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'


const AnecdoteForm = (props) => {
    const create = async (event) => {
        event.preventDefault()
        props.store.dispatch(
            createAnecdote(event.target.anecdote.value)
        )
        event.target.anecdote.value = ''        
    }
    return (
      <form onSubmit = {create }>
            <div><input name= "anecdote"/></div>
            <button type = "submit"> create</button>
      </form>
    )
}

export default AnecdoteForm