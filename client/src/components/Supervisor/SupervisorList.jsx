import useFetch from '@/hooks/useFetch'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import WorkerItem from '../Worker/WorkerItem'
const base_url = import.meta.env.VITE_BASE_API_URL
const SupervisorList = () => {
    const navigate = useNavigate()
    const [supervisorList, setSupervisorList] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const fieldsToDisplay = [
        { label: 'image', value: 'IMAGE' },
        { label: 'supervisorName', value: 'NAME' },
        { label: 'employeeId', value: 'EMPLOYEE ID' },
        { label: 'email', value: 'EMAIL' },
        { label: 'mobile', value: 'MOBILE' },
        { label: 'designation', value: 'DESIGNATION' },
        { label: 'address', value: 'ADDRESS' },
        { label: 'status', value: 'STATUS' }
    ]
    
    const {data , isLoading , error } = useFetch(`${base_url}/api/v1/supervisor`)
    useEffect(()=>{
        if(data){
            setSupervisorList(data)
        }
    } , [data])

    return (
        <div className="bg-white shadow rounded-lg overflow-hidden"  >
            <div className="flex justify-between items-center p-5 border-b border-gray-200">
                <h2 className="text-xl font-medium text-gray-900">Supervisor List</h2>
                <button 
                    onClick={()=>{navigate('/supervisor/create')}} 
                    className="rounded-md bg-primary text-white py-2 px-4 hover:bg-opacity-90 transition-colors"
                >
                    Add New Supervisor 
                </button>
            </div> 

            <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg overflow-x-scroll">
                <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                    {fieldsToDisplay.map((field, index) => (
                        <th 
                        key={index}
                        scope="col" 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                        {field.label}
                        </th>
                    ))}
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                    </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 ">
                    {
                        supervisorList.length > 0 ?
                        supervisorList.map(item => (
                            <WorkerItem
                                key={item._id}
                                item={item}
                                setItemList={setSupervisorList}
                                itemList={supervisorList}
                                fieldsToDisplay={fieldsToDisplay}
                                endpoint={'/api/v1/supervisor'}
                                title={'supervisor'}
                                // onEdit={handleEdit}
                            />
                            )) : (
                            <tr>
                                <td colSpan="3" className="px-6 py-4  text-center text-sm text-gray-500">
                                    No Supervisor Found
                                </td>
                            </tr>
                        )
                    }
                </tbody>
                </table>
          </div>
        </div>
    )
}

export default SupervisorList
