import React from 'react'
import PropTypes from 'prop-types'
import actionFor from '../actionCreators'
import Anecdote from './Anecdote'

class AnecList extends React.Component {
  componentDidMount() {
    const { store } = this.context
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    )
  }

  componentWillUnmount() {
    this.unsubscribe()
  }
    
  vote= (id) => (e) => {
    this.props.store.dispatch(
      actionFor.voteAnecdote(id)
    )
  }

  selected = (props) => (e) =>  {
    this.props.find(anec => anec.selected)
  }

  next = () => {
    this.props.store.dispatch(
      actionFor.anecdoteChoosing()
    )
  }

  render() {
    return (
      <ul>
        {this.context.store.getState().map(anecdote =>
          <Anecdote
            key={anecdote.id}
            anecdote ={anecdote}
            handleClick={this.vote(anecdote.id)}
          />
        )}
      </ul>
    )
  }
}

AnecList.contextTypes = {
  store: PropTypes.object
}

export default Aneclist