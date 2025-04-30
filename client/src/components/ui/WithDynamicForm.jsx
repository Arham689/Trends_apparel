import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OperatoinMultiSearch from '../Operation/OperatoinMultiSearch';
import { fetchAndTransformList } from '@/utils/getAndTransformList';
import {ChevronDown } from "lucide-react"
import { toast } from '@/hooks/use-toast';
// import DropdownSelect from './DropdownSelect'; // Import our new component

/**
 * A component that renders a form matching the provided design
 */
const OperationMappingForm = ({ 
  onSubmitSuccess = () => {},
  initialValues = null,
  isEditing = false,
  itemId = null,
  endpoint = '/mapping',
  onCancel = () => window.history.back()
}) => {
  const [formValues, setFormValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fields, setFields] = useState([
    {
      name: 'tidno',
      label: 'TID NO.',
      type: 'select',
      required: true,
      options: []
    },
    {
      name: 'style',
      label: 'Style',
      type: 'select',
      required: true,
      options: []
    },
    {
      name: 'garment',
      label: 'Garment',
      type: 'select',
      required: true,
      options: []
    },
  ]);
  
  const baseApiUrl = import.meta.env.VITE_BASE_API_URL || '';

  useEffect(() => {
    fetchAndTransformList({
        url: `${baseApiUrl}/api/v1/style`,
        fieldName: "style",
        setFields: setFields,
        labelKey: 'styleName',
        dataKey: "styleData"
    });

    fetchAndTransformList({
        url: `${baseApiUrl}/api/v1/garment-code`,
        fieldName: "garment",
        setFields: setFields,
        labelKey: "garmentName",
    });

    fetchAndTransformList({
        url: `${baseApiUrl}/api/v1/tidno`,
        fieldName: "tidno",
        setFields: setFields,
        labelKey: "TIDNOName",
        dataKey: 'tidnoData'
    });
    
    setFormValues(initialValues);
    console.log("Initial form values:", initialValues);
  }, [initialValues]);

  const handleChange = (fieldName, value) => {
    setFormValues(prev => {
      const newValues = {
        ...prev,
        [fieldName]: value
      };
      
      console.log(`Form value changed - ${fieldName}:`, value);
      console.log("Updated form values:", newValues);
      
      return newValues;
    });
    
    // Clear error when field is changed
    if (errors[fieldName]) {
      setErrors(prev => ({
        ...prev,
        [fieldName]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    fields.forEach(field => {
      if (field.required && (!formValues[field.name] || formValues[field.name] === '')) {
        newErrors[field.name] = `${field.label} is required`;
        isValid = false;
      }
    });

    setErrors(newErrors);
    console.log("Form validation errors:", newErrors);
    console.log("Form validation result:", isValid ? "Valid" : "Invalid");
    
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submission started');
    console.log('Current form values:', formValues);
    
    if (!validateForm()) {
      console.log('Form validation failed');
      return;
    }

    setIsSubmitting(true);
    
    try {
      let response;
      
      if (isEditing && itemId) {
        console.log(`Updating item with ID: ${itemId}`);
        response = await axios.patch(
          `${baseApiUrl}/api/v1${endpoint}/${itemId}`,
          formValues,
          { withCredentials: true }
        );
      } else {
        console.log('Creating new item');
        response = await axios.post(
          `${baseApiUrl}/api/v1${endpoint}`,
          formValues,
          { withCredentials: true }
        );
      }

      console.log('API response:', response.data);
      
      if (onSubmitSuccess) {
        onSubmitSuccess(response.data);
      }
      
      setFormValues({});
      toast({
        variant: "green",
        title: "Successful",
    })
    } catch (error) {
      console.error(`Error ${isEditing ? 'updating' : 'submitting'} form:`, error);
      toast({
        variant: "destructive",
        title: " Unsuccessful",
      })
      // Handle API errors
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
        console.log('API returned errors:', error.response.data.errors);
      }
      
    } finally {
      setIsSubmitting(false);
      console.log('Form submission completed');
      onCancel()
    }
  };

  // Find field by name
  const getFieldByName = (fieldName) => {
    return fields.find(field => field.name === fieldName) || null;
  };

  return (
    <div className="w-full mx-auto shadow-[0px_0px_20px_10px_rgba(0,_0,_0,_0.1)] p-3 rounded-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-medium text-gray-700">{isEditing ? 'Edit ' : 'Add ' }Operation Maping</h1> 
        <button 
          onClick={onCancel} 
          className="px-4 py-2 bg-red-100 text-red-500 rounded-md hover:bg-red-200 transition-colors"
        >
          Go Back
        </button>
      </div>

      <div className="space-y-2">
        <div className="grid grid-cols-2 grid-rows-3 gap-4 mb-6">
          {/* Using our new dynamic DropdownSelect component */}
          <DropdownSelect
            name="tidno"
            label="TID NO."
            options={getFieldByName('tidno')?.options || []}
            value={formValues.tidno}
            onChange={handleChange}
            error={errors.tidno}
            required={true}
          />
          
          <DropdownSelect
            name="style"
            label="Style"
            options={getFieldByName('style')?.options || []}
            value={formValues.style}
            onChange={handleChange}
            error={errors.style}
            required={true}
          />
          
          <DropdownSelect
            name="garment"
            label="Garment"
            options={getFieldByName('garment')?.options || []}
            value={formValues.garment}
            onChange={handleChange}
            error={errors.garment}
            required={true}
          />

          {/* Operations Field */}
          <div className="col-span-2 row-start-3">
            <div className="mb-1">
              <label htmlFor="operations" className="text-gray-600 text-sm">
                Operations
              </label>
            </div>
            <div className="relative">
                <OperatoinMultiSearch setFormValues = {setFormValues} initialValues={initialValues}/>
            </div>
          </div>
        </div>

        <div className="flex mt-4 space-x-4">
          <button 
            type="submit"
            className="px-6 py-3 bg-primary hover:bg-indigo-600 text-white rounded-md transition-colors"
            disabled={isSubmitting}
            onClick={handleSubmit}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
          
          <button 
            type="button" 
            className="px-6 py-3 bg-indigo-100 text-primary rounded-md hover:bg-indigo-200 transition-colors"
            onClick={onCancel}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default OperationMappingForm;

/**
 * A reusable dropdown select component
 * 
 * @param {Object} props
 * @param {string} props.name - Field name
 * @param {string} props.label - Display label
 * @param {Array} props.options - Array of options with value and label
 * @param {string|null} props.value - Current selected value
 * @param {Function} props.onChange - Function to call when value changes
 * @param {string|null} props.error - Error message to display
 * @param {boolean} props.required - Whether field is required
 */
const DropdownSelect = ({
  name,
  label,
  options = [],
  value = null,
  onChange,
  error = null,
  required = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [animatingOut, setAnimatingOut] = useState(false);
  
  const handleToggle = () => {
    if (isOpen) {
      setAnimatingOut(true);
      setTimeout(() => {
        setIsOpen(false);
        setAnimatingOut(false);
      }, 200);
    } else {
      setIsOpen(true);
    }
  };
  
  const handleSelect = (optionValue) => {
    onChange(name, optionValue);
    setAnimatingOut(true);
    setTimeout(() => {
      setIsOpen(false);
      setAnimatingOut(false);
    }, 200);
  };
  
  const selectedLabel = value 
    ? options.find(option => option.value === value)?.label 
    : 'Select...';
  
  return (
    <div>
      <div className="mb-1">
        <label htmlFor={name} className="text-gray-600 text-sm">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      </div>
      <div className="relative">
        <div 
          className="w-full h-12 border border-gray-300 rounded-md px-4 flex items-center justify-between cursor-pointer bg-white"
          onClick={handleToggle}
        >
          <span className={value ? 'text-gray-700' : 'text-gray-400'}>
            {selectedLabel}
          </span>
          <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'transform -rotate-180' : ''}`} />
        </div>
        
        {isOpen && (
          <div className={`absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto ${animatingOut ? "animate-fadeOut" : "animate-fadeIn"}`}>
            {options.map((option) => (
              <div 
                key={option.value} 
                className={`p-3 cursor-pointer hover:bg-gray-100 ${value === option.value ? 'bg-blue-50 text-primary' : 'text-gray-700'}`}
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </div>
            ))}
            {options.length === 0 && (
              <div className="p-3 text-gray-500 text-center">No options available</div>
            )}
          </div>
        )}
        {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
      </div>
    </div>
  );
};


