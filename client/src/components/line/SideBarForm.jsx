import axios from 'axios'
import { ClockFading, X } from 'lucide-react'
import React, { useState, useEffect } from 'react'
const base_url = import.meta.env.VITE_BASE_API_URL

const SidebarForm = ({
  isOpen,
  setIsOpen,
  title,
  fields,
  endpoint,
  onSubmitSuccess,
  initialValues = {},
  isEditing = false,
  itemId = null
}) => {

  const [formValues, setFormValues] = useState(initialValues)


  useEffect(() => {
    setFormValues(initialValues)
  }, [initialValues])


  const handleChange = (fieldName, value) => {
    setFormValues(prev => ({
      ...prev,
      [fieldName]: value
    }))
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      let response;
      if (isEditing && itemId) {
        console.log(`/${itemId}`)
        response = await axios.patch(
          `${base_url}/${endpoint}/${itemId}`, 
          formValues, 
          { withCredentials: true }
        )
      } else {

        response = await axios.post(
          `${base_url}${endpoint}`, 
          formValues, 
          { withCredentials: true }
        )
      }
      

      if (onSubmitSuccess) {
        console.log("onSubmitSuccess",response.data)
        onSubmitSuccess(response.data)
      }
      
      setFormValues(initialValues)
      setIsOpen(false)
    } catch (error) {
      console.error(`Error ${isEditing ? 'updating' : 'submitting'} form:`, error)

    }
  }


  const renderFields = () => {
    return fields.map((field) => (
      <div key={field.name}>
        <div className='text-sm focus:text-primary text-gray-400'>
          <label htmlFor={field.name}>{field.label}</label>
        </div>
        {field.type === 'select' ? (
          <select
            className='w-full h-[40px] mb-3 focus:ring-primary focus:outline-2 focus:outline-primary'
            name={field.name}
            id={field.name}
            value={formValues[field.name] || ''}
            onChange={(e) => handleChange(field.name, e.target.value)}
          >
            {field.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            className='w-full h-[30px] mb-3 focus:ring-primary focus:outline-2 focus:outline-primary p-1'
            type={field.type || 'text'}
            name={field.name}
            placeholder={field.placeholder || 'Type here...'}
            value={formValues[field.name] || ''}
            onChange={(e) => handleChange(field.name, e.target.value)}
          />
        )}
      </div>
    ))
  }

  return (
    <div>
      {isOpen && (
        <div onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black bg-opacity-50 z-40" />
      )}

      <div
        className={`
          fixed top-0 right-0 h-screen min-w-[350px] bg-white z-50 transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
          overflow-y-auto
        `}
        role="dialog"
        aria-modal="true"
      >
        <div className='flex justify-between p-3 pb-5'>
          <h1 className='text-xl'>{isEditing ? `Edit ${title}` : `New ${title}`}</h1>
          <button onClick={() => setIsOpen(false)}>
            <X />
          </button>
        </div>

        <div className='w-full h-0.5 border-b-2'></div>

        <form onSubmit={handleSubmit} className='p-3'>
          <br />
          {renderFields()}
          <button className='bg-primary rounded-md py-2 px-6 text-white'>
            {isEditing ? 'Update' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default SidebarForm
