import React, { useEffect, useState } from 'react'
import SidebarForm from '../ui/SideBarForm'
import useFetch from '@/hooks/useFetch'
import DynamicItemList from '../ui/DynamicItemList'
import { CookingPot } from 'lucide-react'

const base_url = import.meta.env.VITE_BASE_API_URL

const SizeList = () => {
    const [sizeList, setSizeList] = useState([])
    const [input, setInput] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const fieldsToDisplay = [{label : 'sizeName' , value : 'NAME'}]
    const [sizeFields, setSizeFields] = useState([
        {
            name: 'sizeName',
            label: 'Size Name',
            placeholder: 'Type here...',
            type: 'text'
        },
    ])

    const { data, isLoading, error } = useFetch(`${base_url}/api/v1/size`)

    useEffect(() => {
        console.log("data" ,  data)
        if (data) {
            setSizeList(data)
        }
    }, [data])

    const handleLineSubmitSuccess = ({ data }) => {
        console.log("Submit success:", data)
        setSizeList(prev => Array.isArray(prev) ? [...prev, { sizeName: data.sizeName, _id: data._id }] : [])
        setInput('')
    }

    const handleAddList = () => {
        setIsOpen(prev => !prev)
    }

    const handleUpdate = ({ data }) => {
        console.log("Handle update:", data)
        setSizeList(prev =>
            Array.isArray(prev)
                ? prev.map(size =>
                      size._id === data._id
                          ? { ...size, ...data }
                          : size
                  )
                : []
        )
        setIsOpen(false)
    }

    return (
        <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="flex justify-between items-center p-5 border-b border-gray-200">
                <h2 className="text-xl font-medium text-gray-900">Size List</h2>
                <button 
                    onClick={handleAddList} 
                    className="rounded-md bg-primary text-white py-2 px-4 hover:bg-opacity-90 transition-colors"
                >
                    Add New Size
                </button>
            </div>

            <SidebarForm
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                title="Size"
                fields={sizeFields}
                endpoint="/api/v1/size"
                onSubmitSuccess={handleLineSubmitSuccess}
                initialValues={{ sizeName: input }}
            />

            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        {/* Render table headers dynamically */}
                        {fieldsToDisplay.map(field => (
                            <th 
                                key={field.label} 
                                scope="col" 
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                {/* Convert camelCase to Title Case for display */}
                                {field.value.toUpperCase()}
                            </th>
                        ))}
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {sizeList.map((item , i ) => (
                        <DynamicItemList 
                            key={i} 
                            item={item} 
                            setDepartmentList={setSizeList} 
                            departmentList={sizeList}
                            fieldsToDisplay={fieldsToDisplay}
                            endpoint={'api/v1/size'}
                            editingFields={sizeFields}
                            handleUpdate={handleUpdate}
                            initialValues={{
                                sizeName: input,
                            }}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default SizeList
