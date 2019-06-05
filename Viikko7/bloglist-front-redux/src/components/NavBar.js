import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from 'react-bootstrap'

const NavBar = () => {
  const padding = { padding: 10 }

  return (
    <Navbar bg="dark" variant="outline-info">
      <div>
        <Link style={padding} to="/">Home</Link>
        <Link style={padding} to="/blogs">Blogs</Link>
        <Link style={padding} to="/users">Users</Link>
      </div>
    </Navbar>
  )
}


export default NavBar