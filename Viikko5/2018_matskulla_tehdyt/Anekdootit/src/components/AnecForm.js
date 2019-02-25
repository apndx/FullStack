
import React from 'react'
import actionFor from '../actionCreators'
import PropTypes from 'prop-types'

class AnecForm extends React.Component {

    componentDidMount() {
        const { store } = this.context
        console.log('did mount store', store)
        this.unsubscribe = store.subscribe(() =>
          this.forceUpdate()
        )
      }
    
      componentWillUnmount() {
        this.unsubscribe()
      }

    vote = (event) => {
      event.preventDefault()
      this.context.store.dispatch(
        actionFor.voteAnecdote(event.target.anecdote.value)
      )
      event.target.anecdote.value = null
    }

    next = () => {
      this.context.store.dispatch(
        actionFor.anecdoteChoosing()
      )
    }

    render() {
      return(
        <div>
        <form onSubmit={this.vote}>
          <button>vote</button>
        </form>
          <form onSubmit={this.vote}>
          <button>vote</button>
        </form>
        </div>
      )
    }
  }
  AnecForm.contextTypes = {
    store: PropTypes.object
  }
  export default AnecForm