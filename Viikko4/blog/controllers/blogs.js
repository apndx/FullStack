const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

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

module.exports = blogsRouter