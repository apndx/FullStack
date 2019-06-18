import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'

const CommentForm = ({ onSubmit, handleCommentChange, newComment }) => {
  return (
    <div>
      <h2>Add a new comment</h2>
      <form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label> Comment </Form.Label>
          <Form.Control
            type = "text"
            name = "newComment"
            value = {newComment}
            onChange={handleCommentChange}
            id='commentField'
          />
          <Button variant="outline-info" type="submit">save</Button>
        </Form.Group>
      </form>
    </div>
  )
}

CommentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default CommentForm