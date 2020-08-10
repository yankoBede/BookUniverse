import React from 'react'
import renderer from 'react-test-renderer'
import TestingEnvironment from '../../test-utils/router'
import PageLayout from './index'
jest.mock('../header', () => 'Header')
jest.mock('../footer', () => 'Footer')

describe('Page lAYOUT Component', () => {
    it('should render authenticated routes', () => {
        const tree = renderer.create(
            <TestingEnvironment value= {{
                user: {
                    loggedIn: true,
                    id: '123'
                }
            }}>
                <PageLayout/>
            </TestingEnvironment>
        ).toJSON()
        expect(tree).toMatchSnapshot()
    })


    it('should render non-authenticated routes', () => {
        const tree = renderer.create(
            <TestingEnvironment value= {{
                user: {
                    loggedIn: false
                }
            }}>
                <PageLayout/>
            </TestingEnvironment>
        ).toJSON()
        expect(tree).toMatchSnapshot()
    })
})