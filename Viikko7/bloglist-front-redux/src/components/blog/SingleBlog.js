import React from 'react'
import { Table } from 'react-bootstrap'
import AddComment from './AddComment'

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
        <h2>Comments</h2>
        <AddComment singleBlog={singleBlog}/>
        <Table>
          <tbody>
            {singleBlog.comments.map(comment =>
              <tr style={blogStyle} key={singleBlog.comments.indexOf(comment)}>
                <td>{comment}</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default SingleBlog