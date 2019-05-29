import userService from '../services/users'

const initialState = {
  users: [],
  singleUser: null
}

const userReducer = (state = initialState, action) => {
  console.log('userreducerin saama action', action)
  console.log('userreducerin saama state', state)
  switch(action.type) {
  case 'INIT_USERS':
    return  {
      ...state,
      users: action.data.sort(function(a,b) {return b.blogs.length-a.blogs.length})
    }
  case 'SINGLE_USER':
    return {
      ...state,
      singleUser: action.data
    }
  default:
    return state
  }
}

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'INIT_USERS',
      data: users
    })
  }
}

export const initializeSingleUser = (id) => {
  return async dispatch => {
    const users = await userService.getAll()
    const singleUser = users.find(n => n.id === id)
    dispatch({
      type: 'INIT_USERS',
      data: singleUser
    })
  }
}

export default userReducer