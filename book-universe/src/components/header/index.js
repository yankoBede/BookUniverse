import React, { Component } from 'react'
import Link from '../link'
import styles from './index.module.css'
import getNavigation from '../../utils/navigation'
import UserContext from '../../Context'


class Header extends Component {

  static contextType = UserContext

  render() {
    const { 
      loggedIn,
      user
    } = this.context

    const links = getNavigation(loggedIn, user)


    return (
      <nav>
       {
          links.map(navElement => {
            return (
              <Link
                key={navElement.title}
                href={navElement.link}
                title={navElement.title}
                position={navElement.position}
              />
            )
          })
        }
      </nav>
    )
  }
}

export default Header