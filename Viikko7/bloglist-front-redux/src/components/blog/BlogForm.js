import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'

const BlogForm = ({ onSubmit, handleTitleChange, handleAuthorChange, handleUrlChange, newTitle, newAuthor, newUrl }) => {
  return (
    <div>
      <h2>Add a new blog</h2>
      <form onSubmit={onSubmit}>
        <Form.Group>

          <Form.Label> Title </Form.Label>
          <Form.Control
            type = "text"
            name = "newTitle"
            value = {newTitle}
            onChange={handleTitleChange}
          />

          <Form.Label> Author </Form.Label>
          <Form.Control
            type = "text"
            name = "newAuthor"
            value = {newAuthor}
            onChange={handleAuthorChange}
          />

          <Form.Label> Url </Form.Label>
          <Form.Control
            type = "text"
            name = "newUrl"
            value = {newUrl}
            onChange={handleUrlChange}
          />

          <Button variant="outline-info" type="submit">save</Button>
        </Form.Group>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default BlogForm