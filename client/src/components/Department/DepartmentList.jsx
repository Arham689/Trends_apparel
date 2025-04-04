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
        <div className={` `}>
            <div className='flex justify-between p-5'>
                <div className=' text-xl '>Department List</div>
                <button onClick={handleAddList} className='rounded-md  bg-primary text-white py-2 px-4 '>
                    Add new Department
                </button>
            </div>

            <AddDepertment isOpen={isOpen} setIsOpen={setIsOpen} setDepartmentList={setDepartmentList} setInput={setInput} />
            <div className='flex flex-col gap-5'>
                {departmentList.map((item, index) => (
                    <DepartmentItem item={item} key={index} setDepartmentList={setDepartmentList} departmentList={departmentList}/>
                ))}
            </div>
        </div>
    )
}

export default DepartmentLIst

