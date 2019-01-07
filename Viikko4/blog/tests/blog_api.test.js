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

describe('adding a new blog', async () => {

  test('POST /api/blogs is successful with a valid blog', async() => {
    const blogsAtTheBeginning = await blogsInDb()

    const newBlog = { 
      title: 'Our fourth blog',
      author: 'The Bloggers',
      url: 'https://www.somethingelsealtohgetheritis.fi',
      likes: 0
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAfterOperation = await blogsInDb()

    expect(blogsAfterOperation.length).toBe(blogsAtTheBeginning.length +1)

    const titles = blogsAfterOperation.map(blog => blog.title)
    expect(titles).toContain('Our fourth blog')
  })

  test('POST /api/blogs default likes is 0 if likes is empty', async() => {
    const blogsAtTheBeginning = await blogsInDb()

    const newBlog = {
      title: 'Their fift blog',
      author: 'The Bloggers Family',
      url: 'https://www.somethingfamilysays.fi'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAfterOperation = await blogsInDb()
    expect(blogsAfterOperation.length).toBe(blogsAtTheBeginning.length +1)
    
    const newBlogFromDb = blogsAfterOperation.find(blog => blog.title === 'Their fift blog')
    const likes = newBlogFromDb.likes
    expect(likes).toBe(0)
  })



})

afterAll(() => {
  server.close()
})