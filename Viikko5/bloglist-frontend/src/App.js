//import React, { useState } from 'react'
import React from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

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
      success: null
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
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

  addBlog = (event) => {
    event.preventDefault()   
      const blogObject = {
        title: this.state.newTitle,
        author: this.state.newAuthor,
        url: this.state.newUrl
      }  
      
      if (this.state.newTitle ==='' || this.state.newAuthor === '' || this.state.newUrl === '') {
        this.setState({success: `Fill all details first`})
      } else {
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
      }
      setTimeout(() => {
        this.setState({ success: null })
      }, 5000)
  }

  render() {

    const blogForm = () => (
      <div>
        <h2>Add a new blog</h2>
        <form onSubmit = {this.addBlog}>
          <div>
            Title 
            <input
              type = "text"
              name = "newTitle"
              value = {this.state.newTitle} 
              onChange = {this.handleBlogFieldChange}
            />
          </div>
          <div>
            Author 
            <input
              type = "text"
              name = "newAuthor"
              value = {this.state.newAuthor}
              onChange = {this.handleBlogFieldChange}
            />            
          </div>
          <div>
            Url 
            <input
              type = "text"
              name = "newUrl"
              value = {this.state.newUrl}
              onChange = {this.handleBlogFieldChange}
            />  
          </div>
          <button>add</button>
        </form>
      </div>
    )

    const loginForm = () => (
      <div>
        <h3>Login</h3>

        <form onSubmit={this.login}>
          <div>
            username
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <div>
            password
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <button>login</button>
        </form>
      </div>
    )

    const blogList = () => (
      <div>
       {this.state.blogs.map(blog => 
          <Blog key={blog.id} blog={blog}/>
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
  
