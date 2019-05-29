import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import AddBlog from './components/AddBlog'
import UserList from './components/UserList'
import { connect } from 'react-redux'
import { changeNotification } from './reducers/notificationReducer'
import { deleteBlog, likeBlog, initializeBlogs } from './reducers/blogReducer'
import { Button } from 'react-bootstrap'
import { logoutRedux } from './reducers/actioncreators/loginActions'
import { initializeUsers } from './reducers/userReducer'
import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'

// const Home = () => (
//   <div>
//     <h2>Blogs</h2>
//   </div>
// )

const App = ( props ) => {
  const [notification] = useState(null)
  const { user, blogs, users } = props


  useEffect(() => {
    props.initializeBlogs()
  }, [])

  useEffect(() => {
    props.initializeUsers()
  }, [])

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

  if (user === null) {
    console.log('renderöitu user', props.user)
    return (
      <div>
        <h2>Blogs</h2>
        <Notification message ={notification} />
        <LoginForm props={props}/>

      </div>
    )
  }

  return (
    <div className = "container">
      {/* <Router>
        <div>
          <Link  to="/users">users</Link>
          {user
            ? <em>{user} logged in</em>
            : <Link to="/login">login</Link>
          }
        </div>
        <Route exact path="/" render={() => <App />} /> */}
      <Router>
        <Route path = "/users/:id" />
      </Router>
      <h2>Blogs</h2>
      <Notification message ={notification} />
      <p>{user.name} logged in</p>
      <Button variant="outline-info" onClick={logout}>logout</Button>
      <AddBlog props={props}/>
      <h2>UserList</h2>
      <UserList users = {users} />
      <h2>BlogList</h2>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          onLike= {() => like(blog.id, blog.title)}
          onDelete = {() => delBlog(blog.id, blog.title)}
        />
      )}
      {/* </Router> */}
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
    user: state.user.user,
    users: state.users.users
  }
}

const mapDispatchToProps = {
  changeNotification,
  initializeBlogs,
  likeBlog,
  deleteBlog,
  logoutRedux,
  initializeUsers
}

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)


export default ConnectedApp



