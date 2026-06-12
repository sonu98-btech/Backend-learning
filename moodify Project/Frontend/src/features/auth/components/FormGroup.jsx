import React from 'react'

const FormGroup = ({ label, id, placeholder, type = 'text', value, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input type={type} name={id} id={id} placeholder={placeholder} value={value} onChange={onChange} />
    </div>
  )
}

export default FormGroup