//import React, { useState} from 'react'
import React from 'react'
import Togglable from './Togglable'

const Blog = ({blog, onLike}) => (

  <div className="details">
    {blog.title} -- {blog.author} 
    <Togglable buttonLabel="show"> 
    <div className="additionals">
    <p>{blog.url} -- likes: {blog.likes} <button onClick={onLike}>like</button></p>
    <p> added by {blog.user.name}</p>
    </div>
    </Togglable>
  </div>  
)

export default Blog