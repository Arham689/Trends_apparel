import { useIsAuth } from '@/hooks/useIsAuth'
import { fetchAndTransformList } from '@/utils/getAndTransformList';
import React, { useEffect, useRef, useState } from 'react'
const base_url = import.meta.env.VITE_BASE_API_URL
import { FormFields } from '@/utils/BundleFormFileds';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';



const BundleForm = ({setBundleOperations , setOperationError , setBundelQuantity , bundelQuantity}) => {
  const isFirstRender = useRef(true); 
  const navigate = useNavigate() 
  const [previousBundles , setPreviousBundles]  = useState([]);

  useIsAuth() 
  const [formData, setFormData] = useState({
    "production_date" :  new Date().toISOString().split('T')[0]
  });
  const [bundleFormFields, setBundleFormFields] = useState(FormFields)
  const [isFormReady, setIsFormReady] = useState(false)
  const [error, setError] = useState(false)
  
  // State to track which dropdown is open
  const [openDropdown, setOpenDropdown] = useState(null);
  
  const dropdownRefs = useRef({});
  
  const [tidnoList, setTidnoList] = useState([
    {
      name: 'Tidno',
      label: 'TIDNO',
      type: 'select',
      placeholder: 'Select Tidno',
      options: [],
    },
  ]);
  const [styleList, setStyleList] = useState([
    {
      name: 'style',
      label: 'Style',
      type: 'select',
      placeholder: 'Select style',
      options: [],
    },
  ]);

  const [selectedTidno, setSelectedTidno] = useState("");

  // This useEffect fetches garment codes whenever style changes
  useEffect(() => {
    if (formData.style) {
      fetchAndTransformList({
        url: `${base_url}/api/v1/garment-code/${formData.style}`,
        fieldName: "garment",
        setFields: setBundleFormFields,
        labelKey: "garmentName",
        setError: setError
      });
    }
  }, [formData.style]);
  
  // Handle clicks outside dropdowns to close them
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click was outside any dropdown
      const isOutside = Object.keys(dropdownRefs.current).every(name => {
        const ref = dropdownRefs.current[name];
        return !ref || !ref.contains(event.target);
      });
      
      if (isOutside) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // General handler for form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Initial data loading
  useEffect(() => {
    fetchAndTransformList({
      url: `${base_url}/api/v1/tidno`,
      fieldName: "Tidno",
      setFields: setTidnoList,
      labelKey: "TIDNOName",
      dataKey: 'tidnoData'
    });

    fetchAndTransformList({
      url: `${base_url}/api/v1/size`,
      fieldName: "size",
      setFields: setBundleFormFields,
      labelKey: "sizeName",
    });

    fetchAndTransformList({
      url: `${base_url}/api/v1/line`,
      fieldName: "line_id",
      setFields: setBundleFormFields,
      labelKey: "lineName",
    });

    fetchAndTransformList({
      url: `${base_url}/api/v1/section`,
      fieldName: "section_id",
      setFields: setBundleFormFields,
      labelKey: "sectionName",
    });
  }, []);

  // Toggle dropdown visibility
  const toggleDropdown = (name) => {
    setOpenDropdown(prev => prev === name ? null : name);
  };

  // Handle selection from custom dropdown
  const handleSelectOption = (fieldName, option) => {
    if (fieldName === 'Tidno') {
      handleTidnoChange(option.value);
    } else if (fieldName === 'style') {
      handleStyleChange(option.value);
    } else {
      setFormData(prev => ({
        ...prev,
        [fieldName]: option.value
      }));
    }
    setOpenDropdown(null);
  };

  const getBundleOperatoins =async ()=>{
    try {
      const data = await axios.get(`${base_url}/api/v1/mapping-bundle?tid=${formData.Tidno}&styledId=${formData.style}&garmentId=${formData.garment}` , {withCredentials : true })
      console.log(data.data.data[0].garment.color)
      setFormData((prev) => {
        return {...prev , 
          "color" : data?.data?.data[0]?.garment?.color,
          "bundle_operations" : data?.data?.data[0]?.operations
        }
      })
      setBundleOperations(data.data.data[0].operations)
      setOperationError(false )
    } catch (error) {
      console.log(error)
      setOperationError(true)
    }

  } 
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
  
    if (
      formData.style !== "" &&
      formData.garment !== "" &&
      formData.Tidno !== ""
    ) {
      getBundleOperatoins();
    }
  }, [formData.style, formData.garment, formData.Tidno]);


  // Handle Tidno selection change
  const handleTidnoChange = async (tidnoValue) => {
    // Update formData with the new tidno value
    setFormData(prev => ({
      ...prev,
      Tidno: tidnoValue,
      style: "", // Clear style when tidno changes
      garment: "" // Clear garment when tidno changes
    }));
    
    setSelectedTidno(tidnoValue);
    
    // Reset error state
    setError(false);
    
    try {
      // Fetch styles for the selected tidno
      fetchAndTransformList({
        url: `${base_url}/api/v1/style/${tidnoValue}`,
        fieldName: "style",
        setFields: setStyleList,
        labelKey: "styleName",
        setError: setError
      });
    } catch (err) {
      setError(true);
    }
  };

  // Handle Style selection change
  const handleStyleChange = async (styleValue) => {
    // Update formData with the new style value
    setFormData(prev => ({
      ...prev,
      style: styleValue,
      garment: "" // Clear garment when style changes
    }));
    
    setError(false);
    
    try {
      // Fetch garment codes for the selected style
      fetchAndTransformList({
        url: `${base_url}/api/v1/garment-code/${styleValue}`,
        fieldName: "garment",
        setFields: setBundleFormFields,
        labelKey: "garmentName",
        setError: setError
      });
    } catch (err) {
      setError(true);
    }
  };

  // Get display value for selected option
  const getSelectedValue = (field) => {
    if (!formData[field.name]) return field.placeholder;
    
    const option = field.options.find(opt => opt.value === formData[field.name]);
    return option ? option.label : field.placeholder;
  };

  const renderCustomDropdown = (field) => {
    const isOpen = openDropdown === field.name;
    const selectedLabel = getSelectedValue(field);
    
    return (
      <div className="flex text-sm flex-col relative">
        <label className="mb-2 text-gray-700">{field.label}</label>
        <div 
          ref={el => dropdownRefs.current[field.name] = el} 
          className="relative"
        >
          <div 
            onClick={() => toggleDropdown(field.name)}
            className="w-full p-3 border border-gray-200 rounded-md cursor-pointer flex justify-between items-center bg-white"
          >
            <span className={`${!formData[field.name] ? 'text-gray-400' : ''}`}>
              {selectedLabel}
            </span>
            <svg 
              className={`w-5 h-5 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          
          {isOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto transition-all duration-300 ease-in-out animate-dropdown">
              {field.options.map(option => (
                <div 
                  key={option.value} 
                  className={`p-3 cursor-pointer hover:bg-blue-50 ${formData[field.name] === option.value ? 'bg-indigo-100 text-primary' : ''}`}
                  onClick={() => handleSelectOption(field.name, option)}
                >
                  {option.label}
                </div>
              ))}
              {field.options.length === 0 && (
                <div className="p-3 text-gray-500">No options available</div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderField = (field) => {
    if (field.type === 'select') {
      return renderCustomDropdown(field);
    }
    

    return (
      <div className="flex flex-col">
        <label className="mb-2 focus:text-primary text-sm text-gray-700">{field.label}</label>
        <input
          type={field.type}
          name={field.name}
          value={field.type === "date" ? (formData["production_date"] || new Date().toISOString().split('T')[0]) : (formData[field.name] || '')}
          placeholder={field.placeholder}
          onChange={handleChange}
          className="p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-[1px] focus:ring-primary"
        />
      </div>
    );
  };

  const handleSubmit =async  (e) => {
    e.preventDefault();
    // console.log('Form data:', formData);
    try {
      console.log(bundelQuantity)
      await axios.post(`${base_url}/api/v1/bundle/bulk` , bundelQuantity , {withCredentials : true})
      navigate('/bundel')
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
      // set error state 
    }
   
  };
  const calculateBundle = (bundleSize, previousBundles = []) => {
    const ans = [];
  
    // Find the max serial_end and last bundle name
    let lastSerial = 0;
    let lastBundleIndex = 0;
  
    if (previousBundles.length > 0) {
      const lastBundle = previousBundles[previousBundles.length - 1];
  
      // Extract the bundle number from the name (e.g., Y08 -> 8)
      const bundleNumber = parseInt(lastBundle.bundleName?.replace('Y', '') || '0', 10);
  
      lastSerial = lastBundle.serial_end || 0;
      lastBundleIndex = bundleNumber;
    }
  
    let i = 0;
    let bundleCount = lastBundleIndex + 1;
  
    while (i < bundleSize) {
      const serial_start = lastSerial + i + 1;
      
      const serial_end = Math.min(lastSerial + i + 30, (lastSerial + parseInt(bundleSize) ));
      // console.log("serial end " , serial_end , lastSerial + bundleSize )
      const bundle = {
        bundleName: `Y${String(bundleCount).padStart(2, '0')}`, // e.g., Y09
        bundle_operations: formData.bundle_operations || ['67f65e2838fa7da31c4f24f8'],
        color: formData.color || '67f65e2838fa7da31c4f24f8',
        garment: formData.garment,
        production_date: formData.production_date,
        section_id: formData.section_id,
        serial_start,
        serial_end,
        size: formData.size,
        style: formData.style,
        supervisor_id: formData.supervisor_id || '67ff43fc58fbc3ae1d451411',
        Tidno: formData.Tidno,
        line_id: formData.line_id,
        status: 0,
      };
  
      ans.push(bundle);
      i += 30;
      bundleCount++;
    }
  
    console.log('Generated Bundles:', ans);
    setBundelQuantity(ans);
  };
  
  const getBundleByTid = async()=>{
    try {
      const data = await axios.get(`${base_url}/api/v1/bundle-by-tid/${formData.Tidno}` , {withCredentials : true })
      console.log(data.data.data)
      setPreviousBundles(data?.data?.data)
    } catch (error) {
      console.log('please select tid ' , error )
    }
  }

  useEffect(()=>{
    
    if( formData.garment !== undefined && 
        formData.size !== undefined && 
        formData.line_id !== undefined && 
        formData.section_id !== undefined 
    ){
      getBundleByTid()
      calculateBundle(formData.Total , previousBundles )
    }

  } , [formData.Total])

  return (
    <div >
      {/* Add dropdown animation keyframes */}
     
      {error && 
        <div className='bg-red-200 py-5 px-7 w-full text-red-500 font-bold mb-4 rounded-lg'>
          NO MAPPING FOUND TRY ANOTHER VALUE
        </div>
      }
      
      <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-3 gap-3'>
            {/* TIDNO custom dropdown */}
            <div key={tidnoList[0].name}>{renderField(tidnoList[0])}</div>

            {/* Style custom dropdown */}
            <div key={styleList[0].name}>{renderField(styleList[0])}</div>
            
            {/* Other form fields */}
            {bundleFormFields.map(field => (
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
            Go Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default BundleForm;