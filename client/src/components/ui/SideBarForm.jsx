import axios from 'axios'
import { ClockFading, X  , ChevronUp, ChevronDown } from 'lucide-react'
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
  const [openDropdown, setOpenDropdown] = useState(null);
  const [visibleDropdown, setVisibleDropdown] = useState(null);
  const [animatingOut, setAnimatingOut] = useState(false);

  useEffect(() => {
    setFormValues(initialValues)
  }, [initialValues])


  const handleChange = (fieldName, value) => {
    console.log(fieldName, value)
    setFormValues(prev => ({
      ...prev,
      [fieldName]: value
    }))
  }

  const handleToggleDropdown = (name) => {
    if (visibleDropdown === name) {
      setAnimatingOut(true);
      setTimeout(() => {
        setVisibleDropdown(null);
        setAnimatingOut(false);
      }, 200); // match your animation duration
    } else {
      setVisibleDropdown(name);
    }
    setOpenDropdown(openDropdown === name ? null : name);
  };


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      let response;
      console.log(formValues)
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
          <div className="relative">
            {/* Custom select component */}
            <div 
              className="w-full h-[40px] mb-3 border border-gray-300 rounded px-3 flex items-center justify-between cursor-pointer bg-white"
              onClick={() => handleToggleDropdown(field.name)}
            >
              <span className={formValues[field.name] ? 'text-gray-700' : 'text-gray-400'}>
                {formValues[field.name] ? 
                  field.options.find(option => option.value === formValues[field.name])?.label : 
                  'Please select...'}
              </span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${openDropdown === field.name ? 'transform -rotate-180' : ''}`}  />
              {/* <svg 
                
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg> */}
            </div>
            
            {/* Dropdown options */}
            {visibleDropdown === field.name && (
              <div className={`absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded shadow-lg max-h-60 overflow-auto ${animatingOut ? "animate-fadeOut" : "animate-fadeIn"}`}>
                {/* <div 
                  className="p-2 hover:bg-gray-100 cursor-pointer text-gray-400"
                  onClick={() => handleOptionSelect(field.name, '')}
                >
                  Please select...
                </div> */}
                {field.options.map((option) => (
                  <div 
                    key={option.value} 
                    className={`p-2 cursor-pointer hover:bg-gray-200 ${formValues[field.name] === option.value ? 'bg-blue-50 text-primary' : 'text-gray-700'}`}
                    onClick={() => handleOptionSelect(field.name, option.value)}
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            )}
            
            {/* Hidden native select for form submission */}
            <select
              className="hidden"
              name={field.name}
              id={field.name}
              value={formValues[field.name] || ''}
              onChange={(e) => handleChange(field.name, e.target.value)}
            >
              <option value="">Please select...</option>
              {field.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <input
            className='w-full h-[30px] mb-3 focus:ring-primary focus:outline-2 focus:outline-primary p-1 border border-gray-300 rounded'
            type={field.type || 'text'}
            name={field.name}
            placeholder={field.placeholder || 'Type here...'}
            value={formValues[field.name] || ''}
            onChange={(e) => handleChange(field.name, e.target.value)}
          />
        )}
      </div>
    ));
  };

const toggleDropdown = (fieldName) => {
  setOpenDropdown(openDropdown === fieldName ? null : fieldName);
};

const handleOptionSelect = (fieldName, value) => {
  handleChange(fieldName, value);
  setOpenDropdown(null);
  setVisibleDropdown(false)
};

// Add this style to your component or CSS file


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
