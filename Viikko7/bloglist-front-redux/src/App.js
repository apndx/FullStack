import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
//import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import  { useField } from './hooks'
import { connect } from 'react-redux'
import { changeNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { likeBlog } from './reducers/blogReducer'
import { deleteBlog } from './reducers/blogReducer'
import { Form, Button } from 'react-bootstrap'

const App = ( props ) => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)
  const username = useField('text')
  const password = useField('password')
  const [user, setUser] = useState(null)
  const [newTitle, setTitle] = useState('')
  const [newAuthor, setAuthor] = useState('')
  const [newUrl, setUrl] = useState('')
  const [likes, setLikes] = useState(0)
  const [loginVisible, setLoginVisible] = useState(false)
  const blogFormRef = React.createRef()

  useEffect(() => {
    props.initializeBlogs()
  }, [])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    //console.log('handleloginin event', event)
    console.log('handleloginin props', props)
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value, password:password.value,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      //setUsername('')
      //setPassword('')
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
    const user = null
    window.localStorage.clear()
    setUser(user)
    //setUsername('')
    //setPassword('')
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
      const returnedBlog =  await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
      props.changeNotification(` '${blogObject.title}' blog added`, 5)
      props.initializeBlogs()
    }
  }

  if (user === null) {
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
      {props.blogs.map(blog =>
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
  return {
    notification: state.notification,
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  changeNotification,
  initializeBlogs,
  likeBlog,
  deleteBlog
}


const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)


export default ConnectedApp



