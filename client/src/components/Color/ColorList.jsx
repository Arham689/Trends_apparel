import useFetch from '@/hooks/useFetch'
import React, { useEffect, useState } from 'react'
import SidebarForm from '../ui/SideBarForm'
import DynamicItemList from '../ui/DynamicItemList'
const base_url = import.meta.env.VITE_BASE_API_URL

const ColorList = () => {
    const [colorList, setColorList] = useState([])
    const [input, setInput] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const fieldsToDisplay = [{label : 'colorName' , value : 'NAME'}, { label : 'status' , value : "status"}]
    const {data , isLoading , error } = useFetch(`${base_url}/api/v1/color`)
    const [colorFields, setColorFields] = useState([
        {
            name: 'colorName',
            label: 'Color Name',
            placeholder: 'Type here...',
            type: 'text'
        },
        {
            name: 'status',
            label: 'Select status',
            type: 'select',
            options: [
                {value : "Active" , label : "Active"},
                {value : "Inactive" , label : "Inactive"}
            ] // Empty initially, will be populated with line data
        }
    ])

    useEffect(() => {
        // getDepartment()
        if(data)
        {
            setColorList(data.tidnoData)
        }

    }, [data])

    const handleAddList = () => {
        setIsOpen(s => !s)
    }

    useEffect(() => {
        // getDepartment()
        if(data)
        {
            setColorList(data.colorData)
        }

    }, [data])



    const handleUpdate = (data)=>{
        console.log("handleSEctoin UPdate ", data.data)
        setColorList(prev =>
            prev.map((color, i ) =>
                color._id === data.data._id
                    ? { ...color, ...data.data }
                    : color
                // console.log(TIDNO)
            )
        )
        setIsOpen(false)
    }

    const handleLineSubmitSuccess = ({ data }) => {
        console.log("submit success" , data)
        setColorList(prev => [...prev, { colorName : data.colorName, _id: data._id, status: data.status }])
        setInput('')
    }

    if (isLoading) {
        return <h1>loading...</h1>
    }

    if(error)
    {
        return <h1 className='py-12 px-5 bg-red-200 rounded-lg text-red-600 text-2xl border-red-500 border-[2px]'>Something Went Wrong Please Try Again Later... </h1>
    }
    

    return (
        <div className="bg-white shadow rounded-lg overflow-hidden" >
            <div className="flex justify-between items-center p-5 border-b border-gray-200">
                <h2 className="text-xl font-medium text-gray-900">Color List</h2>
                <button 
                    onClick={handleAddList} 
                    className="rounded-md bg-primary text-white py-2 px-4 hover:bg-opacity-90 transition-colors"
                >
                    Add new Color
                </button>
            </div>

            <SidebarForm
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                title="Color"
                fields={colorFields}
                endpoint="/api/v1/color"
                onSubmitSuccess={handleLineSubmitSuccess} // name change 
                initialValues={{
                    TIDNOName: input,
                    status : "Active" 
                }}
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
                    {colorList.map((item , i ) => (
                        <DynamicItemList 
                            key={i} 
                            item={item} 
                            title={'Color'}
                            setDepartmentList={setColorList} 
                            departmentList={colorList}
                            fieldsToDisplay={fieldsToDisplay}
                            endpoint={'api/v1/color'}
                            editingFields={colorFields}
                            handleUpdate={handleUpdate}
                            initialValues={{
                                TIDNOName: input,
                                status : "Active" 
                            }}
                        />
                    ))}
                </tbody>
            </table>


        </div>
    )
}

export default ColorList
