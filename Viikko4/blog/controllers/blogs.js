const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')


blogsRouter.get('/', async(request, response) => {
  
  const blogs = await Blog
    .find({})
    .populate('user', {username: 1, name: 1})
  response.json(blogs.map(Blog.format))

})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  try {

    if (body.title=== undefined || body.url=== undefined) {
      return response.status(400).json({ error: 'title or url missing' })
    }
    const users = await User.find({})
    const user = users[0]

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })
    
    if (blog.likes === undefined) {
      blog.likes = 0
    }

    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.json(Blog.format(blog))

  } catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'something went wrong...' })
  }   
})


blogsRouter.delete('/:id', async (request, response) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } 
  catch(exception ) {
    console.log(exception)
    response.status(400).send({ error: 'malformatted id' })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: body.user
  }  
  const updatedBlog = await Blog.findByIdAndUpdate({_id: request.params.id}, blog, { new: true })

  if (!updatedBlog) {
    return response.status(400).send({ error: 'malformatted id' })
  } else {
    response.json(Blog.format(updatedBlog))
  }
})

module.exports = blogsRouter