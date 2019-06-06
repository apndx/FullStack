import React from 'react'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 5,
  paddingDown: 5,
  border: 'solid',
  borderWidth: 0,
  marginBottom: 5,
  borderRadius: 5
}

const SingleBlog = ({ singleBlog }) => {
  console.log('singleblogin singleblog', singleBlog)
  if (singleBlog === undefined) {
    return null
  }

  return (
    <div style = {blogStyle}>
      <div className="singleBlog">
        <h2>{singleBlog.title} by {singleBlog.author}</h2>
        <p>{singleBlog.url} -- likes: {singleBlog.likes}</p>
        <p> added by {singleBlog.user.name}</p>
      </div>
    </div>
  )
}

export default SingleBlog