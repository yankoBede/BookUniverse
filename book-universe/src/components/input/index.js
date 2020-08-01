import React from 'react'
import styles from './index.module.css'

const Input = ({
  label, 
  id,
  name,
  value, 
  onChange, 
  onBlur,
  divClass, 
  inputClass,
  type,
  placeholder,
  error,
  errorMessage
}) => {
  return (
    <div className={divClass}>
      <label htmlFor={id}>{label}</label>
      <input id={id} value={value} name={name} onChange={onChange} onBlur={onBlur} className={inputClass} type={type} placeholder={placeholder}/>
      <div>
        {error ? (<div className={styles.inputInvalid}> {errorMessage} </div>) : null }
      </div>
    </div>
  )
}

export default Input

