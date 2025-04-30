import useFetch from '@/hooks/useFetch'
import React, { useEffect, useState } from 'react'
import SidebarForm from '../ui/SideBarForm'
import DynamicItemList from '../ui/DynamicItemList'
const base_url = import.meta.env.VITE_BASE_API_URL
const MachineList = () => {
    const [machineList, setMachineList] = useState([])
    const [input, setInput] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const {data , isLoading , error } = useFetch(`${base_url}/api/v1/machine`)
    const fieldsToDisplay = [
        {label : 'machineName' , value : 'NAME'}, 
        {label : 'machineCode' , value : 'Machine Code'}, 
        {label : 'machineValue' , value : 'Machine Value'}, 
        { label : 'status' , value : "status"}
    ]
    const [machineFields, setMachineFields] = useState([
        {
            name: 'machineName',
            label: 'Machine Name',
            placeholder: 'Type here...',
            type: 'text'
        },
        {
            name: 'machineCode',
            label: 'Machine Code',
            placeholder: 'Type here...',
            type: 'text'
        },
        {
            name: 'machineValue',
            label: 'Machine Value',
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
            console.log(data)
            setMachineList(data)
        }

    }, [data])

    const handleUpdate = (data)=>{
        console.log("handleSEctoin UPdate ", data.data)
        setMachineList(prev =>
            prev.map((machine, i ) =>
                machine._id === data.data._id
                    ? { ...machine, ...data.data }
                    : machine
                // console.log(TIDNO)
            )
        )
        setIsOpen(false)
    }

    const handleAddList = () => {
        setIsOpen(s => !s)
    }

    const handleLineSubmitSuccess = ({ data }) => {
        console.log("submit success" , data)
        setMachineList(prev => [...prev, { 
            machieName : data.machineName, 
            _id: data._id, 
            status: data.status , 
            machineCode : data.machineCode , 
            machineValue : data.machineValue 
        }])
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
                <h2 className="text-xl font-medium text-gray-900">Machine List</h2>
                <button 
                    onClick={handleAddList} 
                    className="rounded-md bg-primary text-white py-2 px-4 hover:bg-opacity-90 transition-colors"
                >
                    Add new Machine
                </button>
            </div>

            <SidebarForm
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                title="Machine"
                fields={machineFields}
                endpoint="/api/v1/machine"
                onSubmitSuccess={handleLineSubmitSuccess} // name change 
                initialValues={{
                    MachieName: input,
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
                    {
                        machineList.length > 0 ? 
                        machineList.map((item , i ) => (
                            <DynamicItemList
                                key={i} 
                                item={item} 
                                title={'machine'}
                                setDepartmentList={setMachineList} 
                                departmentList={machineList}
                                fieldsToDisplay={fieldsToDisplay}
                                endpoint={'api/v1/machine'}
                                editingFields={machineFields}
                                handleUpdate={handleUpdate}
                                initialValues={{
                                    machineName: input,
                                    status : "Active" 
                                }}
                            />
                        )) :(
                            <tr>
                                <td colSpan="3" className="px-6 py-4  text-center text-sm text-gray-500">
                                    No Machine Found
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>


        </div>
    )
}

export default MachineList
