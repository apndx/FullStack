import React, { useEffect } from 'react'
import BlogList from './components/blog/BlogList'
import SingleBlog from './components/blog/SingleBlog'
import Notification from './components/common/Notification'
import LoginForm from './components/user/LoginForm'
import UserList from './components/user/UserList'
import SingleUser from './components/user/SingleUser'
import Home from './components/common/Home'
import { connect } from 'react-redux'
import { changeNotification } from './reducers/notificationReducer'
import { deleteBlog, likeBlog, initializeBlogs } from './reducers/blogReducer'
import { logoutRedux } from './reducers/actioncreators/loginActions'
import { initializeUsers } from './reducers/userReducer'
import { BrowserRouter as Router, Route } from 'react-router-dom'


const App = ( props ) => {
  const { user, users, blogs, notification } = props
  const singleUser =(id) => {
    return users.find(n => n.id === id)
  }
  const singleBlog =(id) => {
    return blogs.find(n => n.id === id)
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
        <Route path = "/" render={() => <Home logout={logout} props={props} />} />
        <Route exact path = "/users" render={() => <UserList users = {users} />} />
        <Route exact path = "/users/:id" render={({ match }) => <SingleUser singleUser={singleUser(match.params.id)} /> } />
        <Route exact path = "/blogs" render={() => <BlogList props={props}/>} />
        <Route exact path = "/blogs/:id" render={({ match }) => <SingleBlog singleBlog={singleBlog(match.params.id)} />} />
      </Router>
    </div>
  )
}

const mapStateToProps = (state) => {
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
