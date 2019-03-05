import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { changeNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
    const create = async (event) => {
        event.preventDefault()
        props.store.dispatch(
            createAnecdote(event.target.anecdote.value)
            
        )
        props.store.dispatch(
            changeNotification(`'${event.target.anecdote.value} ' has now been added`)
        )
        setTimeout(() => {
            props.store.dispatch(changeNotification(null))  
        }, 5000)

        event.target.anecdote.value = ''        
    }
    return (

      <form onSubmit = {create }>
        <h2>create new</h2>
            <div>
                <input 
                    name= "anecdote"
                />
            </div>
            <button type = "submit"> create</button>
      </form>
    )
}

export default AnecdoteForm