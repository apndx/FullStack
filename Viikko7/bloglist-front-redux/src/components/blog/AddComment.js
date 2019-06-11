import React, { useState } from 'react'
import CommentForm from './CommentForm'
import Togglable from '../common/Togglable'
import { addComment, initializeBlogs  } from '../../reducers/blogReducer'
import { changeNotification } from '../../reducers/notificationReducer'
import { connect } from 'react-redux'

const AddComment = ( props ) => {

  const [newComment, setComment] = useState('')
  const commentFormRef = React.createRef()
  const { singleBlog } = props

  const commentForm = () => (

    <Togglable buttonLabel= "add new comment" ref={ commentFormRef }>
      <CommentForm
        onSubmit={addComment}
        comment={newComment}
        handleCommentChange  = {({ target }) => setComment(target.value)}
      />
    </Togglable>
  )

  const addComment = async (event) => {
    event.preventDefault()
    console.log('nappia painettu', event.target)
    console.log('lisäyksessä comment: ', newComment)
    commentFormRef.current.toggleVisibility()
    if (newComment === '') {
      props.changeNotification('Empty comments are not allowed', 5)
    } else {
      const commentedBlog = await props.addComment(singleBlog.id, newComment)
      console.log('commented blog', commentedBlog)
      setComment('')
      props.changeNotification(` '${singleBlog.title}' blog commented`, 5)
      props.initializeBlogs()
    }
  }

  return (
    commentForm()
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
  addComment,
  changeNotification,
  initializeBlogs
}

const ConnectedAddComment = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddComment)


export default ConnectedAddComment