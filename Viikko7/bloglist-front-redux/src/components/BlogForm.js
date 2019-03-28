import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

const BlogForm = ({ onSubmit, handleTitleChange, handleAuthorChange, handleUrlChange, newTitle, newAuthor, newUrl }) => {
  return (
    <div>
      <h2>Add a new blog</h2>
      <form onSubmit={onSubmit}>
        <div>
            Title
          <input
            type = "text"
            name = "newTitle"
            value = {newTitle}
            onChange={handleTitleChange}
          />
        </div>
        <div>
            Author
          <input
            type = "text"
            name = "newAuthor"
            value = {newAuthor}
            onChange={handleAuthorChange}
          />
        </div>
        <div>
            Url
          <input
            type = "text"
            name = "newUrl"
            value = {newUrl}
            onChange={handleUrlChange}
          />
        </div>
        <Button variant="outline-info">save</Button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default BlogForm