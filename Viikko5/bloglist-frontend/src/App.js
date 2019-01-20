import React, { useState } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
  } 

  login = (event) => {
    event.preventDefault()
    console.log('logging in with', this.state.username, this.state.password)
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user })
    } catch (exception) {
      this.setState({
        error: 'wrong username or password',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  render() {

    const loginForm = () => (
      <div>
        <h3>Login</h3>

        <form onSubmit={this.login}>
          <div>
            usename
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
          <Blog key={blog._id} blog={blog}/>
        )}
      </div>
    )

    return (
      <div>
        <h2>Blogs</h2>
      {this.state.user === null ?
        loginForm() :
        <div>
        <p>{this.state.user.name} logged in</p>
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
  
