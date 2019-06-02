import blogService from '../services/blogs'
//import changeNotification from './notificationReducer'

const initialState = {
  blogs: []
}


const blogReducer = (state = initialState, action) => {
  console.log('blogreducerin saama action', action)
  console.log('blogreducerin saama state', state)
  switch(action.type) {
  case 'LIKE':
  /*eslint-disable */
    const id = action.data.id
    const blogToChange = state.blogs.find(n => n.id ===id)
    const changedBlog = { ...blogToChange, likes: (blogToChange.likes+1) }
    /*eslint-enable */
    return {
      ...state,
      blogs: state.blogs.map(blog => blog.id !== id ? blog : changedBlog ).sort(function(a,b) {return b.likes-a.likes})
    }
  case 'DELETE':
    /*eslint-disable */
    const delId = action.data.id
    /*eslint-enable */
    return {
      ...state,
      blogs: state.blogs.filter(n => n.id !== delId).sort(function(a,b) {return b.likes-a.likes})
    }
  case 'ADD':
    return {
      ...state,
      blogs: state.blogs.concat(action.data)
    }
  case 'INIT_BLOGS':
    return  {
      ...state,
      blogs: action.data.sort(function(a,b) {return b.likes-a.likes})
    }
  default:
    return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const addBlogRedux = (blogObject) => {
  return async dispatch => {
    const newBlog = await blogService.create(blogObject)
    dispatch({
      type: 'ADD',
      data: newBlog
    })
  }
}

export const likeBlog = (id) => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    const blogToLike = blogs.find(n => n.id === id)
    const likedBlog = { ...blogToLike, likes: (blogToLike.likes+1) }
    await blogService.update(id, likedBlog)
    dispatch({
      type: 'LIKE',
      data: { id }
    })
  }
}


export const deleteBlog = (id) => {
  return async dispatch => {
    if (window.confirm('Do you wish to delete this blog?')) {
      const answer = await blogService.del(id)
      console.log('deleteblogin saama answer', answer)
      dispatch({
        type: 'DELETE',
        data: { id }
      })
    }
  }
}

export default blogReducer


