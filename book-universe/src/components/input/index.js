import React from 'react'

const Input = ({
  label, 
  id,
  name,
  value, 
  onChange, 
  divClass, 
  inputClass,
  type,
  placeholder
}) => {
  return (
    <div className={divClass}>
      <label htmlFor={id}>{label}</label>
      <input id={id} value={value} name={name} onChange={onChange} className={inputClass} type={type} placeholder={placeholder}/>
    </div>
  )
}

export default Input

