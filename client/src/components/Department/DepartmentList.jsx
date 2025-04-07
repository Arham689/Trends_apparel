import axios from 'axios'
import React, { use, useEffect, useState } from 'react'
import DepartmentItem from './DepartmentItem'
import AddDepertment from './AddDepertment'
const base_url = import.meta.env.VITE_BASE_API_URL
const DepartmentLIst = () => {
    const [departmentList, setDepartmentList] = useState([])
    const [input, setInput] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const getDepartment = async () => {
        try {
            const res = await axios.get(`${base_url}/api/v1/departments`, { withCredentials: true })
            console.log(res.data.data.departmentData)
            setDepartmentList(res.data.data.departmentData)
        } catch (error) {
            console.log(error)

        }
    }

    const handleAddList = () => {
        setIsOpen(s => !s)
    }

    useEffect(() => {
        getDepartment()
    }, [])

    if (departmentList.length === 0) {
        return <h1>loading...</h1>
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

