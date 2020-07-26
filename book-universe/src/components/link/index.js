import React, { Component } from 'react'
import styles from './index.module.css'
import {
  Link
} from 'react-router-dom'
import UserContext from '../../Context'

class LinkComponent extends Component {
  constructor(props) {
    super(props)
  }

  static contextType = UserContext

  hadlerSubmit = e => {
    if(e.target.innerText === 'Logout') {
      this.context.logOut()
    }
  }

  render() {
    return (
      <div className={styles[`${this.props.position}-list-item`]}>
        <Link onClick={this.hadlerSubmit} to={this.props.href} className={styles['link']}>
          {this.props.title}
        </Link>
      </div>
    )
  }
} 

export default LinkComponent