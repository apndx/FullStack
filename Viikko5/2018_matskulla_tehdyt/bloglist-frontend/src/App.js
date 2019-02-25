//import React, { useState } from 'react'
import React from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm';
import userService from './services/users'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null,
      newTitle: '',
      newAuthor: '',
      newUrl: '',
      newBlog: null, 
      likes: 0,
      success: null,
      users: []
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
    userService.getAll().then(users =>     
      this.setState({ users }))     

    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({user})
      blogService.setToken(user.token)
    }  
  } 

  logout = async (event) => {
    console.log('logging out')
    event.preventDefault()
    const user = null
    window.localStorage.removeItem('loggedNoteappUser')
    this.setState({ username: '', password: '', user })
  }

  handleBlogFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleLike = (howMany) => () => {
    console.log('handleLiken saama howmany', howMany)
    this.setState({likes: howMany})
  }

  login = async (event) => {
    console.log('logging in with', this.state.username, this.state.password)
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user })
    } catch (exception) {
      this.setState({
        success: 'wrong username or password',
      })
      setTimeout(() => {
        this.setState({ success: null })
      }, 5000)
    }
  }

  likeBlog = (id) => {
    
    return () => {
      const blog = this.state.blogs.find(n => n.id ===id)
      const changedBlog = {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes+1,
        user: blog.user,
      }

      console.log('likeBlogin blog', blog)
      console.log('likeBlogin changedBlog', changedBlog)

      blogService
        .update(id, changedBlog)
        .then(response => {
          this.setState({
            blogs: this.state.blogs.map(blog => blog.id !== id ? blog : response.data)
          })
        })
          .catch(success => {
            this.setState({
              success: `The blog '${blog.title}' has already been deleted from the server`,
              blogs: this.state.blogs.filter(n => n.id !== id)
            })
            setTimeout(() => {
              this.setState({ success: null })
            }, 50000)
          })
    }
  }

  addBlog = (event) => {
    event.preventDefault() 
    console.log('lisäyksessä title author ja url: ', this.state.newTitle, this.state.newAuthor, this.state.newUrl)  
      const blogObject = {
        title: this.state.newTitle,
        author: this.state.newAuthor,
        url: this.state.newUrl,
        likes: this.state.likes,
        blogUser: this.state.user
      }  
      if (this.state.newTitle ==='' || this.state.newAuthor === '' || this.state.newUrl === '') {
        this.setState({success: `Fill all details first`})
      } else {
        console.log('bloglisäyksen saama user', blogObject.blogUser)
        blogService 
        .create(blogObject)
        .then(newBlog => {
          this.setState({
            blogs: this.state.blogs.concat(newBlog),
            newBlog: null,
            newTitle: '',
            newAuthor: '',
            newUrl: '',
            success: `blog added: ' ${blogObject.title} ' `
          })      
        })
      this.blogForm.toggleVisibility()  
      }
      setTimeout(() => {
        this.setState({ success: null })
      }, 5000)
  }

  render() {

    const blogForm = () => (
      <Togglable buttonLabel= "add" ref={component => this.blogForm = component}>
        <BlogForm
          onSubmit={this.addBlog}
          title={this.state.newTitle}
          author={this.state.newAuthor}
          url={this.state.newUrl}
          handleChange={this.handleBlogFieldChange}           
        />
      </Togglable>
    )

    const loginForm = () => (
      <Togglable buttonLabel="login">
        <LoginForm
          visible={this.state.visible}
          username={this.state.username}
          password={this.state.password}
          handleChange={this.handleLoginFieldChange}
          handleSubmit={this.login}
        />
      </Togglable>
    )

    const blogList = () => (
      <div>
       {this.state.blogs.map(blog => 
          <Blog 
            key={blog.id} 
            blog={blog} 
            onLike = {this.likeBlog(blog.id)}
            />
        )}
      </div>
    )

    return (
        <div>
          <h2>Blogs</h2>
          <Notification message = {this.state.success} />
          {this.state.user === null ?
            loginForm() :
            <div>
              <p>{this.state.user.name} logged in</p>
              <button onClick={this.logout}>logout</button>
              {blogForm()}
              {blogList()}
            </div>
          }      
        </div>
    );
  }
}

export default App;

// hahmottelua hooksin käyttöönottoon..
// const App = (props) => {
//   const [blogs, setBlogs] = useState(props.blogs)


//   return (
//           <div>
//             <h2>blogs</h2>
//             {blogs.map(blog => 
//               <Blog key={blog._id} blog={blog}/>
//             )}
//           </div>
//         );
  
