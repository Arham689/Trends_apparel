import useFetch from '@/hooks/useFetch'
import React, { useEffect, useState } from 'react'
import SidebarForm from '../ui/SideBarForm'
import DynamicItemList from '../ui/DynamicItemList'
const base_url = import.meta.env.VITE_BASE_API_URL
const MachineIssueList = () => {
    const [machineIssueList, setMachineIssueList] = useState([])
    const [input, setInput] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const {data , isLoading , error } = useFetch(`${base_url}/api/v1/issue`)
    const fieldsToDisplay = [
        {label : 'issueName' , value : 'NAME'}, 
        {label : 'issueCode' , value : 'Machine Code'}, 
    ]
    const [machineIssueFields, setMachineIssueFields] = useState([
        {
            name: 'issueName',
            label: 'Machine Name',
            placeholder: 'Type here...',
            type: 'text'
        },
        {
            name: 'issueCode',
            label: 'Machine Code',
            placeholder: 'Type here...',
            type: 'text'
        },
    ])
        
    useEffect(() => {
        // getDepartment()
        if(data)
        {
            console.log(data)
            setMachineIssueList(data)
        }

    }, [data])

    const handleUpdate = (data)=>{
        console.log("handleSEctoin UPdate ", data.data)
        setMachineIssueList(prev =>
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
        setMachineIssueList(prev => [...prev, { 
            _id: data._id, 
            issueName : data.issueName, 
            issueCode : data.issueCode , 
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
                <h2 className="text-xl font-medium text-gray-900">Machine Issue List</h2>
                <button 
                    onClick={handleAddList} 
                    className="rounded-md bg-primary text-white py-2 px-4 hover:bg-opacity-90 transition-colors"
                >
                    Add new Machine Issue
                </button>
            </div>



            <SidebarForm
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                title="Machine Issue"
                fields={machineIssueFields}
                endpoint="/api/v1/issue"
                onSubmitSuccess={handleLineSubmitSuccess} // name change 
                initialValues={{
                    issueName: input,
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
                    {machineIssueList.map((item , i ) => (
                        <DynamicItemList
                            key={i} 
                            item={item} 
                            title={'Issue'}
                            setDepartmentList={setMachineIssueList} 
                            departmentList={machineIssueList}
                            fieldsToDisplay={fieldsToDisplay}
                            endpoint={'api/v1/issue'}
                            editingFields={machineIssueFields}
                            handleUpdate={handleUpdate}
                            initialValues={{
                                issueName: input,
                            }}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default MachineIssueList
