import React from 'react'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 5,
  paddingDown: 5,
  border: 'solid',
  borderWidth: 0,
  marginBottom: 5,
  borderRadius: 5
}

const UserList = ({ users }) => {

  return (
    <Table>
      <thead>
        <tr>
          <th>Users</th>
          <th>Blogs added by user </th>
        </tr>
      </thead>
      <tbody>
        {users.map(blogUser =>
          <tr style={blogStyle} key={blogUser.id}>
            <td><Link to={`/users/${blogUser.id}`}>{blogUser.name}</Link></td>
            <td>{blogUser.blogs.length} </td>
          </tr>
        )}
      </tbody>
    </Table>
  )

}

export default UserList
