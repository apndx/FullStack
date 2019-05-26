import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
//import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import  { useField } from './hooks'
import { connect } from 'react-redux'
import { changeNotification } from './reducers/notificationReducer'
import { deleteBlog, likeBlog, addBlogRedux, initializeBlogs } from './reducers/blogReducer'
import { Form, Button } from 'react-bootstrap'
import { login, logoutRedux, initLoggedUser } from './reducers/actioncreators/loginActions'

const App = ( props ) => {
  const [notification] = useState(null)
  const username = useField('text')
  const password = useField('password')
  const [newTitle, setTitle] = useState('')
  const [newAuthor, setAuthor] = useState('')
  const [newUrl, setUrl] = useState('')
  const [likes] = useState(0)
  const [loginVisible, setLoginVisible] = useState(false)
  const blogFormRef = React.createRef()
  const { user, blogs } = props


  useEffect(() => {
    props.initializeBlogs()
  }, [])

  useEffect(() => {
    props.initLoggedUser()
  }, [])

  const handleLogin = async (event) => {
    //console.log('handleloginin event', event)
    console.log('handleloginin props', props)
    event.preventDefault()
    try {
      props.login(username.value, password.value)
    } catch (exception) {
      props.changeNotification('wrong username or password', 5)
    }
  }

  const like = (id, title) => {
    props.likeBlog(id)
    props.changeNotification(`'${title}' has now been liked`, 5)
  }

  const delBlog = (id, title) => {
    props.deleteBlog(id)
    props.changeNotification(`' ${title}' blog has now been deleted`, 5)
    props.initializeBlogs()
  }

  const logout = async (event) => {
    console.log('logging out')
    event.preventDefault()
    props.logoutRedux()
    props.changeNotification('Logged out, see you soon!', 5)
  }

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <Button variant="outline-info" onClick={() => setLoginVisible(true)}>log in</Button>
        </div>
        <div style={showWhenVisible}>
          <Form onSubmit={handleLogin}>
            <Form.Group>
              <Form.Label>username:</Form.Label>
              <Form.Control {...username} />
              <br/>
              <Form.Label>password:</Form.Label>
              <Form.Control {...password} />
              <Button variant="outline-info" type = "submit">login</Button>
            </Form.Group>
          </Form>
          <Button variant="outline-info" onClick={() => setLoginVisible(false)}>cancel</Button>
        </div>
      </div>
    )
  }

  const blogForm = () => (

    <Togglable buttonLabel= "add new blog" ref={blogFormRef}>
      <BlogForm
        onSubmit={addBlog}
        title={newTitle}
        author={newAuthor}
        url={newUrl}
        handleTitleChange  = {({ target }) => setTitle(target.value)}
        handleAuthorChange  = {({ target }) => setAuthor(target.value)}
        handleUrlChange  = {({ target }) => setUrl(target.value)}
      />
    </Togglable>
  )

  const addBlog = async (event) => {
    event.preventDefault()
    console.log('nappia painettu', event.target)
    console.log('lisäyksessä title author ja url: ', newTitle, newAuthor, newUrl)
    blogFormRef.current.toggleVisibility()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes:likes,
      blogUser: user
    }

    if (newTitle ==='' || newAuthor === '' || newUrl === '') {
      props.changeNotification('Fill all details first', 5)
    } else {
      console.log('bloglisäyksen saama user', blogObject.blogUser)
      const addedBlog = await props.addBlogRedux(blogObject)
      console.log('bloglisäyksen addedblog', addedBlog)
      setTitle('')
      setAuthor('')
      setUrl('')
      props.changeNotification(` '${blogObject.title}' blog added`, 5)
      props.initializeBlogs()
    }
  }

  if (user === null) {
    console.log('renderöitu user', props.user)
    return (
      <div>
        <h2>Blogs</h2>
        <Notification message ={notification} />
        { loginForm() }

      </div>
    )
  }

  return (
    <div className = "container">
      <h2>Blogs</h2>
      <Notification message ={notification} />
      <p>{user.name} logged in</p>
      <Button variant="outline-info" onClick={logout}>logout</Button>
      {blogForm()}
      <h2>BlogList</h2>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          onLike= {() => like(blog.id, blog.title)}
          onDelete = {() => delBlog(blog.id, blog.title)}
        />
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  console.log('app state', state)
  console.log('app blogs', state.blogs)
  console.log('app user', state.user.user)
  console.log('app window user', window.localStorage.getItem('loggedBlogappUser'))
  return {
    notification: state.notification,
    blogs: state.blogs.blogs,
    user: state.user.user
  }
}

const mapDispatchToProps = {
  changeNotification,
  initializeBlogs,
  likeBlog,
  deleteBlog,
  addBlogRedux,
  login,
  logoutRedux,
  initLoggedUser
}

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)


export default ConnectedApp



