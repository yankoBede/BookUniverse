import React from 'react'
import renderer from 'react-test-renderer'
import Title from './index'

describe('Header Component', () => {
    it('should render authenticated routes', () => {
        const tree = renderer.create(
            <Title title="My Test"/>
        ).toJSON()
        expect(tree).toMatchSnapshot()
    })
})