import loginService from '../../services/login'
import blogService from '../../services/blogs'


export const initLoggedUser = () => {
  return async (dispatch) => {
    let user = JSON.parse(window.localStorage.getItem('loggedBlogappUser'))
    if (user) {
      await blogService.setToken(user.token)
      dispatch({
        type: 'INIT_USER',
        data: user
      })
    }
  }
}

export const login = (username, password) => {
  return async dispatch => {
    const user = await loginService.login({
      username: username,
      password: password
    })
    await blogService.setToken(user.token)
    dispatch ({
      type: 'LOGIN',
      data: { ...user }
    })
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify({ ...user }))
  }
}

export const logoutRedux = () => {
  return async (dispatch) => {
    //window.localStorage.clear()
    window.localStorage.removeItem('loggedBlogappUser')
    await blogService.setToken(null)
    dispatch ({
      type: 'LOGOUT'
    })
  }
}

