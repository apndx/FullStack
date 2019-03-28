import blogService from '../services/blogs'
//import notificationReducer from './notificationReducer'

const blogReducer = (state = [], action) => {
  console.log('blogreducerin saama action', action)
  console.log('blogreducerin saama state', state)
  switch(action.type) {
  case 'LIKE':
  /*eslint-disable */
    const id = action.data.id
    const blogToChange = state.find(n => n.id ===id)
    const changedBlog = { ...blogToChange, likes: (blogToChange.likes+1) }
    /*eslint-enable */
    return state.map(blog => blog.id !== id ? blog : changedBlog ).sort(function(a,b) {return b.likes-a.likes})
  case 'DELETE':
    /*eslint-disable */
    const delId = action.data.id
    /*eslint-enable */
    return state.filter(n => n.id !== delId).sort(function(a,b) {return b.likes-a.likes})
  case 'INIT_BLOGS':
    return action.data.sort(function(a,b) {return b.likes-a.likes})
  default:
    return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const anecdotes = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: anecdotes
    })
  }
}

export const likeBlog = (id) => {

  return async dispatch => {
    const blogs = await blogService.getAll()
    const blogToLike = blogs.find(n => n.id === id)
    const likedBlog = { ...blogToLike, likes: (blogToLike.likes+1) }
    //try {
    await blogService.update(id, likedBlog)
    dispatch({
      type: 'LIKE',
      data: { id }
    })
    //} catch (exception) {
    //  state.changeNotification(`The blog '${blogToLike.title}' has already been deleted from the server`, 5)
    //  initializeBlogs(blogs.filter(n => n.id !== id).sort(function(a,b) {return b.likes-a.likes}))
    //}
  }
}


export const deleteBlog = (id) => {

  return async dispatch => {
    //const blogs = await blogService.getAll()
    if (window.confirm('Do you wish to delete this blog?')) {
      //try {
      const answer = await blogService.del(id)
      console.log('deleteblogin saama answer', answer)
      //initializeBlogs(blogs.filter(b => b.id !==id))
      dispatch({
        type: 'DELETE',
        data: { id }
      })
      // } catch(exception) {
      //   console.log('deleteblogin catchaama exeption', exception)
      //   notificationReducer.changeNotification(`The blog '${blogToDelete.title}' is not added by you and can't be deleted`, 5)
      // }
    }
  }
}

export default blogReducer


