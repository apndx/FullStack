import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog';

describe.only('<SimpleBlog />', () => {

    it('after clicking name the details are displayed', () => {
        // haetaan klikattava osa komponentista
        const nameDiv = ...
        nameDiv.simulate('click')
      
        // haetaan tarkastettava, eli detaljit sisältävä osa komponentista
        const contentDiv = ...
        expect(contentDiv...)
      })
     
}