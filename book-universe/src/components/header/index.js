import React, { useContext } from 'react'
import Link from '../link'
import styles from './index.module.css'
import getNavigation from '../../utils/navigation'
import UserContext from '../../Context'


const Header = () => {
  const context = useContext(UserContext);
  const links = getNavigation(context.user)

  return (
    <nav className={styles['nav-bar']}>
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