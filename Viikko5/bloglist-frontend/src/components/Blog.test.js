import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog';

describe.only('<Blog />', () => {

    it('before clicking only title and author are displayed', () => {
      const blog = {   

                id: "5c461db7d05958139bb4b086",
                title: "Blog about displaying details",
                author: "Detailer",
                url: "http://details.com",
                likes: 2,
                user: {
                _id: "5c35fe3e2d79c76979a6acbb",
                username: "bloggeri",
                name: "Bloggeri"
                }
            }
        
        const mockHandler = jest.fn()
        const blogComponent = shallow(<Blog 
            blog={blog}
            onLike= {mockHandler}
            />)
            const detailsDiv = blogComponent.find('.details')

            expect(detailsDiv.text()).toContain(blog.title)
            expect(detailsDiv.text()).toContain(blog.author)
            expect(detailsDiv.text()).not.toContain(blog.likes)
    })

    
    it('after clicking show button all details are displayed', () => {
        // haetaan klikattava osa komponentista
        const blog = {   
                id: "5c461db7d05958139bb4b087",
                title: "Another blog about displaying details",
                author: "Detailer",
                url: "http://anotherdetails.com",
                likes: 2,
                user: {
                _id: "5c35fe3e2d79c76979a6acbb",
                username: "bloggeri",
                name: "Bloggeri"
                }
        }
       
        const mockHandler = jest.fn()

        const blogComponent= shallow(
            <Blog
                blog = {blog}
                onLike= {mockHandler}
            />    
        )

        const button = blogComponent.find('button')
        button.simulate('click')

        // haetaan tarkastettava, eli detaljit sisältävä osa komponentista
        const allContentDiv = blogComponent.find('.additionals')

        expect(allContentDiv.text()).toContain(blog.likes)
        expect(allContentDiv.text()).toContain(blog.user.name)
    })
})