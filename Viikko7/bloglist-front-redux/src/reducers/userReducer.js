import userService from '../services/users'

const initialState = {
  users: []
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

export default userReducer