//import React, { useState} from 'react'
import React from 'react'

const Blog = ({blog}) => (
  <div>
    {blog.title} {blog.author}
  </div>  
)

export default Blog