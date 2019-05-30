import React from 'react'
import { Table } from 'react-bootstrap'
import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'



const blogStyle = {
  paddingTop: 10,
  paddingLeft: 5,
  paddingDown: 5,
  border: 'solid',
  borderWidth: 0,
  marginBottom: 5,
  borderRadius: 5
}

const UserList = ({ users }) => (

  <Table>
    <thead>
      <tr>
        <th></th>
        <th>Blogs added by user </th>
      </tr>
    </thead>
    {/* <tbody>
      {users.map(blogUser =>
        <tr style={blogStyle} key={blogUser.id}>
          <td><a href={`https://localhost:3000/users/${blogUser.id}`}
          >{blogUser.name}  </a></td><td>{blogUser.blogs.length} </td>
        </tr>
      )}
    </tbody> */}
    <tbody>
      {users.map(blogUser =>
        <tr style={blogStyle} key={blogUser.id}>
          <td><Link to={`users/${blogUser.id}`}>{blogUser.name}</Link></td>
          <td>{blogUser.blogs.length} </td>
        </tr>
      )}
    </tbody>
  </Table>
)

export default UserList
