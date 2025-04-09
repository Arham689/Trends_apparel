import axios from 'axios'
import React, { use, useEffect, useState } from 'react'
import DepartmentItem from './DepartmentItem'
import AddDepertment from './AddDepertment'
import useFetch from '../../hooks/useFetch.js'
const base_url = import.meta.env.VITE_BASE_API_URL
const DepartmentLIst = () => {
    const [departmentList, setDepartmentList] = useState([])
    const [input, setInput] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const {data , isLoading , error } = useFetch(`${base_url}/api/v1/departments`)

    const handleAddList = () => {
        setIsOpen(s => !s)
    }

    useEffect(() => {
        // getDepartment()
        if(data)
        {
            setDepartmentList(data.departmentData)
        }

    }, [data])

    if (isLoading) {
        return <h1>loading...</h1>
    }

    if(error)
    {
        return <h1 className='py-12 px-5 bg-red-200 rounded-lg text-red-600 text-2xl border-red-500 border-[2px]'>Something Went Wrong Please Try Again Later... </h1>
    }
    return (
        <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="flex justify-between items-center p-5 border-b border-gray-200">
                <h2 className="text-xl font-medium text-gray-900">Department List</h2>
                <button 
                    onClick={handleAddList} 
                    className="rounded-md bg-primary text-white py-2 px-4 hover:bg-opacity-90 transition-colors"
                >
                    Add new Department
                </button>
            </div>
    
            <AddDepertment 
                isOpen={isOpen} 
                setIsOpen={setIsOpen} 
                setDepartmentList={setDepartmentList} 
                setInput={setInput} 
            />
            
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Department
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {departmentList.length > 0 ? (
                            departmentList.map((item, index) => (
                                <DepartmentItem 
                                    item={item} 
                                    key={index} 
                                    setDepartmentList={setDepartmentList} 
                                    departmentList={departmentList}
                                    isLast={index === departmentList.length - 1}
                                />
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500">
                                    No departments found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default DepartmentLIst

