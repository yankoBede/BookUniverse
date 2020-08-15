import React from 'react'
import renderer from 'react-test-renderer'
import NoBooks from './index'

describe('NoBooks Component', () => {
    it('should render No Books image and text', () => {
        const tree = renderer.create(
            <NoBooks/>
        ).toJSON()
        expect(tree).toMatchSnapshot()
    })
})