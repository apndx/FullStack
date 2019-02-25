import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ onSubmit, handleChange, newTitle, newAuthor, newUrl }) => {
  //console.log('blogformin saama author', newAuthor)
    return (
      <div>
        <h2>Add a new blog</h2>
        <form onSubmit={onSubmit}>
          <div>
            Title
            <input
              type = "text"
              name = "newTitle"
              value={newTitle}
              onChange={handleChange}
            />
          </div>
          <div>
            Author
            <input
            type = "text"
            name = "newAuthor"
            value = {newAuthor}
            onChange={handleChange}
            />
          </div>
          <div>
            Url
            <input
            type = "text"
            name = "newUrl"
            value = {newUrl}
            onChange={handleChange}
            />
          </div>
          <button>save</button>
        </form>
      </div>
    )
  }

  BlogForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired
  }

export default BlogForm