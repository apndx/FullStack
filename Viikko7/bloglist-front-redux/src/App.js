import React, { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import UserList from './components/UserList'
import SingleUser from './components/SingleUser'
import NavBar from './components/NavBar'
import { connect } from 'react-redux'
import { changeNotification } from './reducers/notificationReducer'
import { deleteBlog, likeBlog, initializeBlogs } from './reducers/blogReducer'
import { Button } from 'react-bootstrap'
import { logoutRedux } from './reducers/actioncreators/loginActions'
import { initializeUsers } from './reducers/userReducer'
import { BrowserRouter as Router, Route } from 'react-router-dom'

const Home = ({ user, notification, logout }) => (
  <div>
    <NavBar/>
    <h2>Blogs</h2>
    <Notification message ={notification} />
    <p>{user.name} logged in</p>
    <Button variant="outline-info" onClick={logout}>logout</Button>
  </div>
)

const App = ( props ) => {
  const [notification] = useState(null)
  const { user, users } = props
  const singleUser =(id) => {
    return users.find(n => n.id === id)
  }

  useEffect(() => {
    props.initializeBlogs()
  }, [])

  useEffect(() => {
    props.initializeUsers()
  }, [])

  const logout = async (event) => {
    event.preventDefault()
    props.logoutRedux()
    props.changeNotification('Logged out, see you soon!', 5)
  }

  if (user === null) {
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
      <Router>
        <Route path = "/" render={() => <Home user={user} logout={logout} notification={notification} />} />
        <Route exact path = "/users" render={() => <UserList users = {users} />} />
        <Route exact path = "/users/:id" render={({ match }) => <SingleUser singleUser={singleUser(match.params.id)} /> } />
        <Route path = "/blogs" render={() => <BlogList props={props}/>} />
      </Router>
    </div>
  )
}

const mapStateToProps = (state) => {
  console.log('app state', state)
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



