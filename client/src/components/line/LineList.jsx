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
            console.log(res.data.data)
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

    if (LineList.length === 0) {
        return <h1>loading...</h1>
    }

    return (
        <div className={` `}>
        <div className='flex justify-between p-5'>
            <div className=' text-xl '>Line List</div>
            <button onClick={handleAddList} className='rounded-md  bg-primary text-white py-2 px-4 '>
                Add new Line
            </button>
        </div>

        <AddLine isOpen={isOpen} setIsOpen={setIsOpen} setLineList={setLineList} setInput={setInput} input={input}/>
        <div className='flex flex-col gap-5'>
            {LineList.map((item, index) => (
                <LineItem item={item} key={index} setLineList={setLineList} LineList={LineList}/>
            ))}
        </div>
    </div>
  )
}

export default LineList
