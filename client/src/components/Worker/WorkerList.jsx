import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import WorkerItem from './WorkerItem'
import useFetch from '@/hooks/useFetch'
import { flattenObject } from '@/lib/utils'
const base_url = import.meta.env.VITE_BASE_API_URL
export const WorkerList = () => {
    const [workerList, setWorkerList] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()
    const fieldsToDisplay = [
        { label: 'image', value: 'image' },
        { label: 'workerName', value: 'NAME' },
        { label: 'employeeId', value: 'EMPLOYEE ID' },
        // { label: 'operations', value: 'OPERATIONS' },
        { label: 'mobileNo', value: 'MOBILE' },
        { label: 'designation', value: 'DESIGNATION' },
        { label: 'address', value: 'ADDRESS' },
        { label: 'city', value: 'CITY' },
        { label: 'status', value: ' STATUS' },
      ]
    const {data , isLoading , error } = useFetch(`${base_url}/api/v1/worker`)
    useEffect(()=>{
        const temp = data?.map((i) => flattenObject(i))
        if(data){
            setWorkerList(temp)
        }
    } , [data])
    return (
        <div className="bg-white shadow rounded-lg overflow-hidden"  >
            <div className="flex justify-between items-center p-5 border-b border-gray-200">
                <h2 className="text-xl font-medium text-gray-900">Worker List</h2>
                <button 
                    onClick={()=>{navigate('/worker/create')}} 
                    className="rounded-md bg-primary text-white py-2 px-4 hover:bg-opacity-90 transition-colors"
                >
                    Add New Worker 
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
                        workerList.length > 0 ?
                        workerList.map(item => (
                            <WorkerItem
                                key={item._id}
                                item={item}
                                setItemList={setWorkerList}
                                itemList={workerList}
                                fieldsToDisplay={fieldsToDisplay}
                                endpoint={'/api/v1/worker'}
                                title={'worker'}
                                // onEdit={handleEdit}
                            />
                            )) : (
                            <tr>
                                <td colSpan="3" className="px-6 py-4  text-center text-sm text-gray-500">
                                    No Worker Found
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
