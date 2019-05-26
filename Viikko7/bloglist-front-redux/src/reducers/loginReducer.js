const initialState = {
  user: null
}

const loginReducer = (state = initialState, action) => {
  console.log('state, action:', state, action)
  switch(action.type) {
  case 'INIT_USER': {
    return {
      ...state,
      user: action.data
    }
  }
  case 'LOGIN': {
    return {
      ...state,
      user: action.data
    }
  }
  case 'LOGOUT': {
    return {
      ...state,
      user: null
    }
  }
  default: {
    return state
  }
  }
}

export default loginReducer