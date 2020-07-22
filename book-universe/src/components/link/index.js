import React from 'react'
import styles from './index.module.css'
import {
  Link
} from 'react-router-dom'

const LinkComponent = ({ title, href, position }) => {
  return (
    <div className={styles[`${position}-list-item`]}>
      <Link to={href} className={styles['link']}>
        {title}
      </Link>
    </div>
  )
}

export default LinkComponent