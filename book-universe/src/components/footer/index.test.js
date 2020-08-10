import React from 'react'
import renderer from 'react-test-renderer'
import Footer from './index'

describe('Footer Component', () => {
    it('should render react course link and softuni link', () => {
        const tree = renderer.create(
                <Footer/>
        ).toJSON()
        expect(tree).toMatchSnapshot()
    })
})