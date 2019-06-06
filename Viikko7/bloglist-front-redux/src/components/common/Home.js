import NavBar from './NavBar'
import Notification from './Notification'
import React from 'react'

const Home = ({ props, logout }) => (

  <div>
    <NavBar user={props.user} logout={logout}/>
    <h2>Blogs</h2>
    <Notification message ={props.notification} />
  </div>
)

export default Home