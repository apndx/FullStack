import React, { useState } from 'react'
import BlogForm from './BlogForm'
import Togglable from '../common/Togglable'
import { deleteBlog, likeBlog, addBlogRedux, initializeBlogs } from '../../reducers/blogReducer'
import { changeNotification } from '../../reducers/notificationReducer'
import { connect } from 'react-redux'

const AddBlog = ( props ) => {

  const [newTitle, setTitle] = useState('')
  const [newAuthor, setAuthor] = useState('')
  const [newUrl, setUrl] = useState('')
  const [likes] = useState(0)
  const blogFormRef = React.createRef()
  const { user } = props

  const blogForm = () => (

    <Togglable buttonLabel= "add new blog" ref={ blogFormRef }>
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
      await props.addBlogRedux(blogObject)
      setTitle('')
      setAuthor('')
      setUrl('')
      props.changeNotification(` '${blogObject.title}' blog added`, 5)
      props.initializeBlogs()
    }
  }

  return (
    blogForm()
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
  initializeBlogs,
  likeBlog,
  deleteBlog,
  addBlogRedux,
  changeNotification
}

const ConnectedAddBlog = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddBlog)


export default ConnectedAddBlog