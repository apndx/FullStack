import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {
    it('renders details and likes', () => {
        const blog = {
            title: 'Blogi yksinkertaisuudesta',
            author: 'Simplisti',
            likes: 3
        }

        const simpleBlogComponent = shallow(<SimpleBlog blog={blog}/>)
        console.log('simpleblog ', blog)
        const detailsDiv = simpleBlogComponent.find('.details')
        const likesDiv = simpleBlogComponent.find('.likes')

        expect(detailsDiv.text()).toContain(blog.title)
        expect(detailsDiv.text()).toContain(blog.author)
        expect(likesDiv.text()).toContain(blog.likes)
        expect(likesDiv.equals(blog.likes))
    })

    it('liking a blog twice calls the handler twice', () => {
        const blog  = {
            title: 'Blogi tykkäämisen taidosta',
            author: 'Liker',
            likes: 99
        }

        const mockHandler = jest.fn()

        const blogComponent = shallow(
            <SimpleBlog
                blog = {blog}
                onClick = {mockHandler}
            />    
        )

        const button =  blogComponent.find('button')
        button.simulate('click')
        button.simulate('click')
        expect(mockHandler.mock.calls.length).toBe(2)
    })

})