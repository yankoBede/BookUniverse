import React from 'react'
import Link from '../link'
import styles from './index.module.css'
import getNavigation from '../../utils/navigation'


const Header = () => {
  const links = getNavigation()

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

export default Header