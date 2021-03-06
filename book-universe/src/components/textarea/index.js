import React from 'react'
import './index.module.css'

const TextArea = ({
  label, 
  id,
  name,
  value, 
  onChange, 
  divClass, 
  inputClass,
  placeholder
}) => {
  return (
    <div className={divClass}>
      <label htmlFor={id}>{label}</label>
      <textarea id={id} name={name} value={value} rows="10" onChange={onChange} className={inputClass} placeholder={placeholder}/>
    </div>
  )
}

export default TextArea