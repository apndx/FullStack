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
  console.log('reduxin addfúnkkarin blogobjekti', blogObject)
  return async dispatch => {
    const newBlog = await blogService.create(blogObject)
    console.log('addreduxin newBlog', newBlog)
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
      dispatch({
        type: 'DELETE',
        data: { id }
      })
      //changeNotification(`' ${title}' blog has now been deleted`, 5)
      //initializeBlogs(blogs.filter(b => b.id !==id))
      // } catch (error) {
      //   if (error===401) {
      //     //changeNotification(`The blog '${title}' is not added by you and can't be deleted`, 5)
      //   }
      // }
    }
    // } catch(exception) {
    //   console.log('deleteblogin catchaama exeption', exception)
    //   notificationReducer.changeNotification(`The blog '${blogToDelete.title}' is not added by you and can't be deleted`, 5)
    // }
  }
}

export default blogReducer


