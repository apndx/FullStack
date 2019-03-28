import React from 'react'
import Togglable from './Togglable'
import { Button } from 'react-bootstrap'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const Blog = ({ blog, onLike, onDelete }) => (

  <div style = {blogStyle}>
    <div className="details">
      {blog.title} -- {blog.author}
      <div className="additionals">
        <Togglable buttonLabel="show">
          <p>{blog.url} -- likes: {blog.likes}
            <Button variant="outline-info" onClick={onLike}>like</Button>
            <Button variant="outline-info" onClick={onDelete}>delete</Button></p>
          <p> added by {blog.user.name}</p>
        </Togglable>
      </div>
    </div>
  </div>
)

export default Blog