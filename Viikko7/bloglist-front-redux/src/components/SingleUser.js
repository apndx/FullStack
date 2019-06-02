import React from 'react'
import { Table } from 'react-bootstrap'

const SingleUser = ({ singleUser }) => {
  if (singleUser === undefined) {
    return null
  }

  return (
    <Table>
      <thead>
        <tr>
          <th><h2>Blogs added by {singleUser.name} </h2></th>
        </tr>
      </thead>
      <tbody>
        {singleUser.blogs.map(blog =>
          <tr key={blog._id}>
            <td>{blog.title} </td>
          </tr>
        )}
      </tbody>
    </Table>
  )
}

export default SingleUser
