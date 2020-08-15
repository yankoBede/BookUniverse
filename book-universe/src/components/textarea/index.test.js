import React from 'react'
import renderer from 'react-test-renderer'
import TextArea from './index'

describe('Text Area Component', () => {
    it('should render title with passes text', () => {
        const tree = renderer.create(
            <TextArea label="test text area label"
            id="test-text-id"
            name="test-text-name"
            value="test-text-value"
            onChange={() => { console.log('text cnahged')}}
            divClass="div-class" 
            inputClass="input-class"
            />
        ).toJSON()
        expect(tree).toMatchSnapshot()
    })
})