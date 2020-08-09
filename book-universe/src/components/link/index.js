import React, { useContext } from 'react'
import styles from './index.module.css'
import { Link } from 'react-router-dom'
import UserContext from '../../Context'

const LinkComponent = (props) => {

  const context = useContext(UserContext)

  const hadlerSubmit = e => {
    if(e.target.innerText === 'Logout') {
      context.logOut()
    }
  }

  return (
    <div className={styles[`${props.position}-list-item`]}>
      <Link onClick={hadlerSubmit} to={props.href} className={styles['link']}>
        {props.title}
      </Link>
    </div>
  )
} 

export default LinkComponent