import React, { Component } from 'react'
import './index'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)

    this.state =  {
      hasError: false
    }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log('Component Did Catch is triggered', errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <img className='img' src='http://www.janvandamnatuurfotografie.nl/images/500.png' alt='error-occurred'/>
    }

    return (this.props.children)
  }
}

export default ErrorBoundary