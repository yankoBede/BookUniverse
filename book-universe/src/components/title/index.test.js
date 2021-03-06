import React from 'react'
import renderer from 'react-test-renderer'
import Title from './index'

describe('Title Component', () => {
    it('should render title with passes text', () => {
        const tree = renderer.create(
            <Title title="My Test"/>
        ).toJSON()
        expect(tree).toMatchSnapshot()
    })
})