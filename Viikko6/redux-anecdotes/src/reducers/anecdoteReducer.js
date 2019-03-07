import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch(action.type) { 
    case 'NEW' :
      return [...state, action.data]
    case 'VOTE':
      const id = action.data.id
      console.log('voten action data id', id)
      console.log('voten saama state', state)
      const anecToChange = state.find(n => n.id === id)
      console.log('anectoChange', anecToChange)
      const changedAnec = { ...anecToChange, votes: (anecToChange.votes+1)}
      console.log('changedAnec', changedAnec)
      return state.map(anec => anec.id !== id ? anec : changedAnec ).sort(function(a,b) {return b.votes-a.votes})  
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}


export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW',
      data: newAnecdote
    })
  }
}

export const voteAnecdote = (id) => {
  
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    const anecdoteToVote = anecdotes.find(n => n.id === id)
    const votedAnecdote = {...anecdoteToVote, votes: anecdoteToVote.votes+1}
    await anecdoteService.update(id, votedAnecdote)
    dispatch({
      type: 'VOTE',
      data: {id}
    })  
  }
}

export default anecdoteReducer