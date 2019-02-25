
//oldies
import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
jest.mock('./services/blogs')
import blogService from './services/blogs'
import { prettyDOM } from 'dom-testing-library'
import Togglable from './components/Togglable'

describe('<App />', () => {
    let app

    // describe('when user is not logged', () => {
    //   beforeEach(() => {
    //     app = mount(<App />)
    //   })
  
    //   it('only login form is rendered', () => {
    //     app.update()
    //     const blogComponents = app.find(Blog)
    //     const loginComponent = app.find(Togglable)
    //     const loginDiv = loginComponent.find('.login')
    //     console.log(app.debug())


    //     expect(blogComponents.length).toBe(0)
    //     expect(loginDiv.text()).toContain("Login")
    //   })
    // })

  
    describe('when user is logged', () => {
      
      const user = {
        username: 'tester',
        token: '1231231214',
        name: 'Teuvo Testaaja'
      }
      
      
      beforeEach(() => {

        localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
        app = mount(<App />)
  
      })
  
      

      it('renders all blogs it gets from backend', () => {
        app.update()
        const blogComponents = app.find(Blog)
        //console.log('blogComponents', blogComponents.debug())
        //blogComponents.debug()
        //console.log(prettyDOM(blogComponents))  
        console.log(app.debug())

        expect(blogComponents.length).toEqual(blogService.blogs.length)
  
      }) 
    })


     
})



// uusi hook tapa
//
// import React from 'react'
// import { render,  waitForElement } from 'react-testing-library'
// jest.mock('./services/blogs')
// import App from './App'
// //
//
// describe('<App />', () => {
//     it('renders all blogs it gets from backend', async () => {
//       const component = render(
//         <App />
//       )
//       component.rerender(<App />)
//       await waitForElement(
//         () => component.container.querySelector('.blog')
//       )
  
//       const blogs = component.container.querySelectorAll('.blog')
//       expect(blogs.length).toBe(2) 
  
//       expect(component.container).toHaveTextContent(
//         'The testest Blog'
//       )
//       expect(component.container).toHaveTextContent(
//         'Old blog'
//       )
//     })
//   })