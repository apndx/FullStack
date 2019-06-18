import React from 'react'
import Togglable from '../common/Togglable'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 5,
  paddingDown: 5,
  border: 'solid',
  borderWidth: 0,
  marginBottom: 5,
  borderRadius: 5
}

const Blog = ({ blog, onLike, onDelete }) => (

  <div style = {blogStyle}>
    <div className="details">
      <Link to={`/blogs/${blog.id}`}>{blog.title} -- {blog.author}</Link>
      <div className="additionals">
        <Togglable buttonLabel="->">
          <p>{blog.url} -- likes: {blog.likes}
            <Button variant="outline-info" onClick={onLike}>like</Button>
            <Button variant="outline-info" onClick={onDelete} id='delete'>delete</Button></p>
          <p> added by {blog.user.name}</p>
        </Togglable>
      </div>
    </div>
  </div>
)

export default Blog