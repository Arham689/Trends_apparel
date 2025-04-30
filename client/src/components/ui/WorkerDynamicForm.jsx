import { toast } from '@/hooks/use-toast';
import useFetch from '@/hooks/useFetch';
import { fetchAndTransformList } from '@/utils/getAndTransformList';
import axios from 'axios';
import { CookingPot } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
const base_url = import.meta.env.VITE_BASE_API_URL
const WorkerDynamicForm = ({method = 'POST' , initialValue = {} }) => {
    const [formData, setFormData] = useState({});
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const dropdownRef = useRef(null);
    const {id} = useParams()
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
        ...prev,
        [name]: value
        }));
    };
    const {data} = useFetch(`${base_url}/api/v1/operation`)

    function transformOperationsData(data) {
        return data.map(item => ({
          value: item._id,
          label: item.operationName
      }));
    }
    useEffect(()=>{
        if(data){
            setOperationsOptions(transformOperationsData(data))
        }
    },[data])
    
    const [operationsOptions , setOperationsOptions] = useState([]);

    useEffect(() => {
        if (initialValue && Object.keys(initialValue).length > 0) {
            setFormData(initialValue)
            
            // Also handle setting the selected operations if they exist
            if (initialValue.operations && operationsOptions.length > 0) {
                const selectedOps = initialValue.operations.map(opId => {
                    const foundOp = operationsOptions.find(op => op.value === opId)
                    return foundOp || null
                }).filter(op => op !== null)
                
                setSelectedOptions(selectedOps)
            }
        }
    }, [initialValue, operationsOptions])

    const handleSubmit =async (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);

        try {
            if(method==='POST'){
                await axios.post(`${base_url}/api/v1/worker` , {...formData , image : `https://api.dicebear.com/9.x/open-peeps/svg?seed=${formData.workerName}`} , {withCredentials : true })
            }
            else if(method === 'PATCH'){
                await axios.patch(`${base_url}/api/v1/worker/${id}` , {...formData , image : `https://api.dicebear.com/9.x/open-peeps/svg?seed=${formData.workerName}`} , {withCredentials : true })
            }
            setTimeout(() => {
                window.history.back()
            },800);
            toast({
              variant: "green",
              title: "Successful",
            })
        } catch (error) {
            console.log(error)
            toast({
              variant: "destructive",
              title: " Unsuccessful",
            })

        }
    };

     useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

    const toggleOption = (option) => {
        setSelectedOptions(prev => {
        const isSelected = prev.some(item => item.value === option.value);
        
        if (isSelected) {
            // Remove option if already selected
            const newSelection = prev.filter(item => item.value !== option.value);
            setFormData(prevData => ({
            ...prevData,
            operations: newSelection.map(opt => opt.value)
            }));
            return newSelection;
        } else {
            // Add option if not selected
            const newSelection = [...prev, option];
            setFormData(prevData => ({
            ...prevData,
            operations: newSelection.map(opt => opt.value)
            }));
            return newSelection;
        }
        });
    };
  
  const formFields = [
    {
      name: 'workerName',
      label: 'Name',
      type: 'text',
      placeholder: 'Please enter worker name',
      gridPosition: 1,
    },
    {
      name: 'employeeId',
      label: 'Employee Id',
      type: 'text',
      placeholder: 'Please enter Employee Id',
      gridPosition: 2,
    },
    {
      name: 'operations',
      label: 'Operations',
      type: 'multiselect',
      placeholder: 'Please select skills',
      gridPosition: 3,
      options: operationsOptions
    },
    {
      name: 'mobileNo',
      label: 'Mobile',
      type: 'number',
      placeholder: 'Please enter phone number',
      gridPosition: 4,
    },
    {
      name: 'designation',
      label: 'Designation',
      type: 'text',
      placeholder: 'Please enter designation',
      gridPosition: 5,
    },
    {
      name: 'address',
      label: 'Address',
      type: 'text',
      placeholder: 'Please enter address',
      gridPosition: 6,
    },
    {
      name: 'city',
      label: 'City',
      type: 'text',
      placeholder: 'Please enter city',
      gridPosition: 7,
    },
    {
      name: 'status',
      label: 'Select Status',
      type: 'select',
      placeholder: 'Please select',
      gridPosition: 8,
      options: [
        {label : 'Active ' , value : 'Active'},
        {label : 'Inactive ' , value : 'Inactive'},
      ]
    },
    {
      name: 'uploadImage',
      label: 'Upload Image',
      type: 'file',
      placeholder: 'Choose a file',
      gridPosition: 9,
    }
  ];

  const renderField = (field) => {
    switch (field.type) {
    case 'multiselect':
        return (
            <div className="flex text-sm flex-col relative" key={field.name} ref={dropdownRef}>
            <label className="mb-2 text-gray-700">{field.label}</label>
            <div 
                className="p-3 border rounded-md cursor-pointer flex justify-between items-center"
                onClick={() => setDropdownOpen(!dropdownOpen)}
            >
                <div className="flex flex-wrap gap-1">
                {selectedOptions.length > 0 ? (
                    selectedOptions.map(option => (
                    <span 
                        key={option.value} 
                        className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full flex items-center"
                    >
                        {option.label}
                        <span 
                        className="ml-1 cursor-pointer" 
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleOption(option);
                        }}
                        >
                        ×
                        </span>
                    </span>
                    ))
                ) : (
                    <span className="text-gray-500">{field.placeholder}</span>
                )}
                </div>
                <div className="text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
                </div>
            </div>
            
            {dropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-md shadow-lg z-10 max-h-60 overflow-y-scroll">
                {field.options.map(option => (
                    <div 
                    key={option.value} 
                    className={`p-2 hover:bg-gray-100 cursor-pointer ${
                        selectedOptions.some(item => item.value === option.value) ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => toggleOption(option)}
                    >
                    <div className="flex items-center">
                        <input 
                        type="checkbox" 
                        className="mr-2" 
                        checked={selectedOptions.some(item => item.value === option.value)}
                        readOnly
                        />
                        {option.label}
                    </div>
                    </div>
                ))}
                </div>
            )}
            </div>
        );
      case 'select':
        return (
          <div className="flex text-sm flex-col" key={field.name}>
            <label className="mb-2 text-gray-700">{field.label}</label>
            <div className="relative">
              <select
                name={field.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-200 rounded-md appearance-none focus:outline-none focus:ring-[1px] focus:ring-primary"
                defaultValue=""
              >
                <option className='text-gray-200' value="" disabled>{field.placeholder}</option>
                {field.options && field.options.map(option => (
                  <option className="py-2 px-3 cursor-pointer hover:bg-gray-100" key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>
        );
      case 'file':
        return (
          <div className="flex flex-col" key={field.name}>
            <label className="mb-2 text-gray-700">{field.label}</label>
            <div className="flex items-center">
              <div className="mr-2 text-gray-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <label className="flex-1 cursor-pointer">
                <span className="text-gray-500">{field.placeholder}</span>
                <input
                  type="file"
                  name={field.name}
                  onChange={handleChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex flex-col" key={field.name}>
            <label className="mb-2 text-sm text-gray-700">{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name]}
              placeholder={field.placeholder}
              onChange={handleChange}
              className="p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-[1px] focus:text-primary focus:ring-primary"
            />
          </div>
        );
    }
  };

  return (

    <form onSubmit={handleSubmit} className="p-4 bg-white rounded-lg shadow-md ">
      <div className="grid grid-cols-3 gap-3">
        {formFields.map(field => (
          <div key={field.name} className="mb-4">
            {renderField(field)}
          </div>
        ))}
      </div>
      
      <div className="flex mt-6 space-x-4">
        <button 
          type="submit" 
          className="px-6 py-2 text-white bg-primary rounded-md hover:bg-indigo-600"
        >
          Submit
        </button>
        <button 
          type="button" 
          className="px-6 py-2 text-red-500 bg-red-100 rounded-md hover:bg-red-200"
          onClick={()=>{window.history.back()}}
        >
          Cancel
        </button>
      </div>
    </form>
        
  )
}

export default WorkerDynamicForm
