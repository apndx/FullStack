import React from 'react'
import Blog from '../components/Blog'
import { connect } from 'react-redux'
import { changeNotification } from '../reducers/notificationReducer'
import { deleteBlog, likeBlog, initializeBlogs } from '../reducers/blogReducer'
import AddBlog from '../components/AddBlog'

const BlogList = ({ props }) => {
  const { blogs } = props

  const like = (id, title) => {
    props.likeBlog(id)
    props.changeNotification(`'${title}' has now been liked`, 5)
  }

  const delBlog = (id, title) => {
    props.deleteBlog(id)
    props.changeNotification(`' ${title}' blog has now been deleted`, 5)
    props.initializeBlogs()
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


