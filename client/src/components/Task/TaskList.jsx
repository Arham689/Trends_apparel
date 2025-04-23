import useFetch from '@/hooks/useFetch'
import { fetchAndTransformList } from '@/utils/getAndTransformList'
import axios from 'axios'
import { CookingPot } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
const base_url = import.meta.env.VITE_BASE_API_URL

const TaskList = () => {
    const {data, isLoading, error} = useFetch(`${base_url}/api/v1/grouped-bundle`)
    const [TaskList, setTaskList] = useState([])   
    const [dropdownStates, setDropdownStates] = useState({});
    let bundel = {} 
    const [lineOptions, setlineOptions] = useState([{
        name: 'line_id',
        options : [] 
    }])
    const [sectionOptions, setSectionOptions] = useState([{
        name: 'section_id',
        options : [] 
    }])
    const [supervisorOptions, setSupervisorOptions] = useState([{
        name: 'supervisor_id',
        options : [] 
    }])

    useEffect(() => {
        // get and transform supervisor , line , section 
        fetchAndTransformList({
            url: `${base_url}/api/v1/line`,
            fieldName: "line_id",
            setFields: setlineOptions,
            labelKey: "lineName",
        });
    
        fetchAndTransformList({
            url: `${base_url}/api/v1/section`,
            fieldName: "section_id",
            setFields: setSectionOptions,
            labelKey: "sectionName",
        });

        fetchAndTransformList({
            url: `${base_url}/api/v1/supervisor`,
            fieldName: "supervisor_id",
            setFields: setSupervisorOptions,
            labelKey: "supervisorName",
        });

        if(data){
            setTaskList(data.groupedBundles)
            bundel = data
            console.log(data)
        }
    }, [data])

    const handleDropdownChange = async (index, fieldName, option) => {
        const updatedValue = option.value;

        // 1. Update local state
        setDropdownStates((prev) => ({
            ...prev,
            [`row-${index}`]: {
            ...prev[`row-${index}`],
            [fieldName]: updatedValue,
            },
        }));

        // 2. Extract garmentId, styleId, production_date from that row
        const rowData = TaskList[index];
        let key = ''
        switch (fieldName) {
            case 'section':
                key = "section_id"
                break;
            case 'line' :
                key = 'line_id'
                break;
            case 'supervisor':
                key =  "supervisor_id"
            default:
                break;
        }
        console.log(fieldName , updatedValue )
         const payload = {
            garmentId: rowData.garmentId,
            styleId: rowData.styleId,
            production_date: rowData.production_date,
            updateData: {
            [key]: updatedValue,
            },
        };


        console.log(payload)
        try {
            const res = await axios.patch(`${base_url}/api/v1/groupedBundles`, payload ,  {withCredentials : true });
            console.log('Update successful:', res.data);
        } catch (err) {
            console.error('Update failed:', err.response?.data || err.message);
        }
    };


    return (
        <div>
            <table className="w-full overflow-y-scroll text-left">
                <thead className="bg-gray-100 text-sm font-light">
                    <tr>
                        <th className="px-4 py-2 font-light">SUPERVISOR</th>
                        <th className="px-4 py-2 font-light">PRODUCTION DATE</th>
                        <th className="px-4 py-2 font-light">STYLE CODE</th>
                        <th className="px-4 py-2 font-light">GARMENT CODE</th>
                        <th className="px-4 py-2 font-light">TOTAL QTY PRODUCTION</th>
                        <th className="px-4 py-2 font-light">LINE</th>
                        <th className="px-4 py-2 font-light">SECTION</th>
                    </tr>
                </thead>
                <tbody className='text-gray-500'>
                    {
                        TaskList.map((i, index) => {
                            return (
                                <tr key={index} className="border-t">
                                    <td className="px-4 py-4">
                                        <Dropdown
                                            name="supervisor"
                                            label="Supervisor"
                                            options={supervisorOptions[0].options}
                                            value={dropdownStates[`row-${index}`]?.supervisor || `${i.supervisorName}` || '' }
                                            onChange={(fieldName, option) => 
                                                handleDropdownChange(index, fieldName, option)
                                            }
                                            placeholder={`${i.supervisorName}` || 'supervisor'}
                                        />
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className='text-center p-1 bg-gray-200 rounded-lg'>
                                            {new Date(i.production_date).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </div>
                                    </td>
                                    <td className="px-4 py-4">{i.styleName}</td>
                                    <td className="px-4 py-4">{i.garmentName}</td>
                                    <td className="px-4 py-4">{i.serial_end}</td>
                                    <td className="px-4 py-4">
                                        <Dropdown
                                            name="line"
                                            label="Line"
                                            options={lineOptions[0].options}
                                            value={dropdownStates[`row-${index}`]?.line || `${i.lineName}` || ""}
                                            onChange={(fieldName, option) => 
                                                handleDropdownChange(index, fieldName, option)
                                            }
                                            placeholder={`${i.lineName}` || "Line" }
                                        />
                                    </td>
                                    <td className="px-4 py-4">
                                        <Dropdown
                                            name="section"
                                            label="Section"
                                            options={sectionOptions[0].options}
                                            value={dropdownStates[`row-${index}`]?.section ||`${i.sectionName}` || ""}
                                            onChange={(fieldName, option) => 
                                                handleDropdownChange(index, fieldName, option)
                                            }
                                            placeholder={`${i.sectionName}` || 'section'}
                                        />
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default TaskList

const Dropdown = ({
  name,
  label,
  value,
  options,
  onChange,
  placeholder = 'Select an option',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const dropdownRef = useRef(null);
  
  // Store dropdown position
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });

  const selectedLabel = options.find(opt => opt.value === value)?.label || placeholder;

  const toggleDropdown = () => {
    if (!isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom,
        left: rect.left,
        width: rect.width
      });
    }
    setIsOpen(prev => !prev);
  };

  const handleSelect = (option) => {
    onChange(name, option);
    setIsOpen(false);
  };
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen && 
        containerRef.current && 
        !containerRef.current.contains(event.target) &&
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="flex text-sm  flex-col relative">
      {label && <label className=" -top-2 px-2 left-3 z-10 bg-white absolute text-xs text-gray-700">{label}</label>}
      <div ref={containerRef} className="relative">
        <div 
          onClick={toggleDropdown}
          className="w-full p-3 border border-gray-200 rounded-md cursor-pointer flex justify-between items-center bg-white"
        >
          <span className={`${!value ? 'text-gray-400' : ''}`}>{selectedLabel}</span>
          <svg 
            className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {isOpen && (
          <div 
            ref={dropdownRef}
            className="fixed z-20 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto"
            style={{
              top: `${dropdownPosition.top}px`,
              left: `${dropdownPosition.left}px`,
              width: `${dropdownPosition.width}px`
            }}
          >
            {options.length > 0 ? (
              options.map(option => (
                <div 
                  key={option.value}
                  className={`p-3 cursor-pointer hover:bg-indigo-100 ${
                    value === option.value ? 'bg-indigo-100 text-primary' : ''
                  }`}
                  onClick={() => handleSelect(option)}
                >
                  {option.label}
                </div>
              ))
            ) : (
              <div className="p-3 text-gray-500">No options available</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};