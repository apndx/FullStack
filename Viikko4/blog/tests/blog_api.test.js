const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const { initialBlogs, blogsInDb } = require('./test_helper')


describe('when there is initially some notes saved', async () => {

  beforeAll(async () => {
    await Blog.remove({})
    console.log('cleared')

    const blogObjects = initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)  
  })

  test('all blogs are returned as json', async () => {
    const blogsInDatabase = await blogsInDb()

    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.lenght).toBe(blogsInDatabase.lenght)
    
    const returnedContents = response.body.map(blog => blog.title)
    blogsInDatabase.forEach(blog => {
      expect(returnedContents).toContain(blog.title)
    })
  })
})

afterAll(() => {
  server.close()
})