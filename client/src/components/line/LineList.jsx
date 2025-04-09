import React, { useEffect, useState } from 'react'
import axios from 'axios'
import DepartmentItem from '../Department/DepartmentItem'
import LineItem from './LineItem'
import AddLine from './AddLine'
const base_url = import.meta.env.VITE_BASE_API_URL

const LineList = () => {
    const [LineList, setLineList] = useState([])
    const [input, setInput] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const getlineList = async () => {
        try {
            const res = await axios.get(`${base_url}/api/v1/line`, { withCredentials: true })
            setLineList(res.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleAddList = () => {
            setIsOpen(s => !s)
    }

    useEffect(()=>{
        getlineList()
    },[])

    // if (LineList.length === 0) {
    //     return <h1>loading...</h1>
    // }

    return (
        <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="flex justify-between items-center p-5 border-b border-gray-200">
                <h2 className="text-xl font-medium text-gray-900">Line List</h2>
                <button 
                    onClick={handleAddList} 
                    className="rounded-md bg-primary text-white py-2 px-4 hover:bg-opacity-90 transition-colors"
                >
                    Add new Line
                </button>
            </div>
    
            <AddLine 
                isOpen={isOpen} 
                setIsOpen={setIsOpen} 
                setLineList={setLineList} 
                setInput={setInput} 
                input={input}
            />
            
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/3">
                                Line Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {LineList.length > 0 ? (
                            LineList.map((item, index) => (
                                <LineItem 
                                    item={item} 
                                    key={index} 
                                    setLineList={setLineList} 
                                    LineList={LineList}
                                    isLast={index === LineList.length - 1}
                                />
                            ))
                        ) : (
                            <tr>
                                <td colSpan="2" className="px-6 py-4 text-center text-sm text-gray-500">
                                    No lines found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default LineList
