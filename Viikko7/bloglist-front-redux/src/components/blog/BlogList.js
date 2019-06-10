import React from 'react'
import Blog from './Blog'
import { connect } from 'react-redux'
import { changeNotification } from '../../reducers/notificationReducer'
import { deleteBlog, likeBlog, initializeBlogs } from '../../reducers/blogReducer'
import AddBlog from './AddBlog'

const BlogList = ({ props }) => {
  const { blogs, user } = props

  const like = (id, title) => {
    props.likeBlog(id)
    props.changeNotification(`'${title}' has now been liked`, 5)
  }

  const singleBlog =(id) => {
    return blogs.find(n => n.id === id)
  }

  const delBlog = (id, title) => {
    if (window.confirm('Do you wish to delete this blog?')) {
      if (singleBlog(id).user.username !== user.username) {
        props.changeNotification('You can only delete your own blog entries', 5)
      } else{
        props.deleteBlog(id)
        props.changeNotification(`' ${title}' blog has now been deleted`, 5)
        props.initializeBlogs()
      }
    }
  }

  return (
    <div>
      <AddBlog props = {props}/>
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
  deleteBlog
}

const ConnectedBlogList = connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogList)


export default ConnectedBlogList


