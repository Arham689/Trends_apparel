import useFetch from '@/hooks/useFetch'
import { flattenObject } from '@/lib/utils'
import { fetchAndTransformList } from '@/utils/getAndTransformList'
import React, { useEffect, useState } from 'react'
import SidebarForm from '../ui/SideBarForm'
import DynamicItemList from '../ui/DynamicItemList'
const base_url = import.meta.env.VITE_BASE_API_URL

const OperationList = () => {
    const [operationList, setOperationList] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [isFormReady, setIsFormReady] = useState(false)
    const fieldsToDisplay = [
        {label : 'operationName' , value : 'NAME'}, 
        { label : 'description' , value : "DESCREPTION"},
        { label : 'department_DepartmentName' , value : "DEPARTMENT"},
        { label : 'style_styleName' , value : "STYLE"},
        { label : 'garment_garmentName' , value : "GARMENT CODE"},
        { label : 'rate' , value : "RATE"},
        { label : 'sam' , value : "SAM"},
        { label : 'unitType_unitTypeName' , value : "Unit Type"}, // faltednaed ??
    ]
    const [operationFields, setOperationFields] = useState([
        {
            name: 'operationName',
            label: 'Operation Name',
            type: 'text',
            placeholder: 'Type here...',
        },
        {
            name: 'description',
            label: 'Description',
            type: 'textarea',
            placeholder: 'Optional description...',
        },
        {
            name: 'rate',
            label: 'Rate',
            type: 'number',
            placeholder: 'Enter rate...',
        },
        {
            name: 'unitType',
            label: 'Unit Type',
            type: 'select',
            options: [{value : '67f65dd638fa7da31c4f24c2' , label : 'PCS'}] // to be populated with unit types from API
        },
        {
            name: 'department',
            label: 'Department',
            type: 'select',
            options: [] // to be populated with departments
        },
        {
            name: 'style',
            label: 'Style',
            type: 'select',
            options: [] // to be populated with styles
        },
        {
            name: 'garment',
            label: 'Garment',
            type: 'select',
            options: [] // to be populated with garments
        },
        {
            name: 'sam',
            label: 'SAM',
            type: 'number',
            placeholder: 'Enter SAM value...',
        },
        {
            name: 'tgtPerHour',
            label: 'TGT per Hour',
            type: 'number',
            placeholder: 'Enter TGT value...'
        },
        {
            name: 'tgtPerDay',
            label: 'TGT per Day',
            type: 'number',
            placeholder: 'Enter TGT value...'
        },
    ])
    
    const {data , isLoading , error } = useFetch(`${base_url}/api/v1/operation`)

    useEffect(()=>{
        fetchAndTransformList({
            url :`${base_url}/api/v1/garment-code`,
            fieldName : "garment",
            setOptions : setOperationList,
            setFields : setOperationFields,
            labelKey : "garmentName",
            // setIsFormReady
        })
        

        fetchAndTransformList({
            url :`${base_url}/api/v1/style`,
            fieldName : "style",
            setOptions : setOperationList,
            setFields : setOperationFields,
            labelKey : "styleName",
            dataKey : 'styleData'
            // setIsFormReady
        })

        fetchAndTransformList({
            url :`${base_url}/api/v1/departments`,
            fieldName : "department",
            setOptions : setOperationList,
            setFields : setOperationFields,
            labelKey : "DepartmentName",
            dataKey : 'departmentData'
            // setIsFormReady
        })

        console.log( "operatons " ,  data)
        if(data){
            const flattenedGarment = data.map((i)=> flattenObject(i))
            console.log( "operatons " ,  flattenedGarment)
            setOperationList(flattenedGarment)
        }
    } , [data] )
    
    const handleLineSubmitSuccess = ({ data }) => {
        console.log("submit success", data);
    
        const flattened = flattenObject(data);
    
        setOperationList(prev => [...prev, flattened]);
    
        setInput('');
    }
    
    const handleAddList = () => {
        setIsOpen(s => !s)
    }

    const handleUpdate = (data)=>{
        console.log("handleSEctoin UPdate ", data.data)
        const list = flattenObject(data.data)
        setOperationList(prev =>
            prev.map((oper, i ) =>
                oper._id === list._id
                    ? { ...oper, ...list }
                    : oper
                // console.log(TIDNO)
            )
        )
        setIsOpen(false)
    }


    return (
        <div className="bg-white shadow rounded-lg overflow-hidden"  >
        <div className="flex justify-between items-center p-5 border-b border-gray-200">
            <h2 className="text-xl font-medium text-gray-900">Operation List</h2>
            <button 
                onClick={handleAddList} 
                className="rounded-md bg-primary text-white py-2 px-4 hover:bg-opacity-90 transition-colors"
            >
                Add New Operation list 
            </button>
        </div>

        <SidebarForm 
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title="Operation"
            fields={operationFields}
            endpoint="/api/v1/operation"
            onSubmitSuccess={handleLineSubmitSuccess} // name change 
            initialValues={''}
        />

        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 ">
                <tr>
                    {/* Render table headers dynamically */}
                    {fieldsToDisplay.map(field => (
                        <th 
                            key={field.label} 
                            scope="col" 
                            className="px-6 py-5 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
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
                {operationList.map((item , i ) => (
                    <DynamicItemList 
                        key={i} 
                        item={item} 
                        title={'Operation'}
                        setDepartmentList={setOperationList} 
                        departmentList={operationList}
                        fieldsToDisplay={fieldsToDisplay}
                        endpoint={'api/v1/operation'}
                        editingFields={operationFields}
                        handleUpdate={handleUpdate}
                        initialValues={''}
                    />
                ))}
            </tbody>
        </table>
        </div>
    )
}

export default OperationList
