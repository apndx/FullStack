//import React, { useState} from 'react'
import React from 'react'
import Togglable from './Togglable'

const Blog = ({blog, onClick}) => (

  <div>
    {blog.title} -- {blog.author} 
    <Togglable buttonLabel="show"> 
    <p>{blog.url} -- likes: {blog.likes} <button onClick={onClick}>like</button></p>
    <p> added by {blog.user.name}</p>
    </Togglable>
  </div>  
)

export default Blog