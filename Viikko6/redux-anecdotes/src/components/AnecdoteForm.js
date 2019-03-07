import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { changeNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
    const create = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''   
        props.createAnecdote(content)        
        props.changeNotification(`'${ content } ' has now been added`, 5)        
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

const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes,
        notification: state.notification
    }
}

const mapDispatchToProps = {
    createAnecdote,
    changeNotification
}

const ConnectedAnecdoteForm = connect(
    mapStateToProps,
    mapDispatchToProps
    )(AnecdoteForm)

export default ConnectedAnecdoteForm