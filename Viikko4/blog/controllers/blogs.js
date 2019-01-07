const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

const format = (blog) => {

  return {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes
  }
}

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.post('/', (request, response) => {
  
  try {

    const body = request.body
    
    if (body.title=== undefined || body.url=== undefined) {
      return response.status(400).json({ error: 'title or url missing' })
    }
    const blog = new Blog(request.body)
    
    if (blog.likes === undefined) {
      blog.likes = 0
    }

    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })

  } catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'something went wrong...' })
  }
   
})


blogsRouter.delete('/:id', (request, response) => {
  Blog
    .findByIdAndRemove(request.params.id)
    .then(result => {
      console.log(result)
      response.status(204).end()
    })
    .catch(error => {
      response.status(400).send({ error: 'malformatted id' })
    })
})

blogsRouter.put('/:id', (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }  

  Blog
    .findByIdAndUpdate(request.params.id, blog, { new: true})
    .then(updatedBlog => {
      response.json(format(updatedBlog))
    })
    .catch(error => {
      console.log(error)
      response.status(400).send({ error: 'malformatted id' })
    })
})

module.exports = blogsRouter