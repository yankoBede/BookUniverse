import React from 'react'
import styles from './index.module.css'

const Footer = () => {
  return (
    <footer className="footer">
    <div className="container">
        <p className="text-muted text-center">
            <a href="https://softuni.bg/trainings/3023/reactjs--june-2020/internal">React Course</a>
            @
            <a href="https://www.softuni.bg">SoftUni</a>
        </p>
        <p className="text-muted text-center">
            All rights reserved &copy; 2020
        </p>
    </div>
  </footer>
  )
}

export default Footer