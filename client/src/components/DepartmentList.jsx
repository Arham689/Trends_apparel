import axios from 'axios'
import { X } from 'lucide-react'
import React, { use, useEffect, useState } from 'react'
import DepartmentItem from './DepartmentItem'
const base_url = import.meta.env.VITE_BASE_API_URL 
const DepartmentLIst = () => {
    const [departmentList , setDepartmentList] = useState([])
    const [input , setInput] = useState('')
    const [isOpen , setIsOpen] = useState(false)
    const getDepartment =async ()=>{
        try {
            const res = await axios.get(`${base_url}/api/v1/departments` ,{withCredentials : true})
            console.log(res.data.data.departmentData)
            setDepartmentList(res.data.data.departmentData)
        } catch (error) {
            console.log(error)

        }
    }

    const handleAddList = ()=>{
        try {
            setIsOpen(s => !s)

        } catch (error) {
            
        }
    }

    useEffect(()=>{
        getDepartment()
    },[])

    if(departmentList.length === 0){
        return <h1>loading...</h1>
    }
    return (
        <div className=''>
            <div className='flex justify-between p-5'>
                <div className=' text-xl '>Department List</div>
                <button onClick={handleAddList} className='rounded-md  bg-primary text-white py-2 px-4 '>
                    Add new Department
                </button>
            </div>

            <AddDepertment isOpen={isOpen} setIsOpen={setIsOpen} setDepartmentList={setDepartmentList} setInput={setInput}/>
            <div className='flex flex-col gap-5'>
            {departmentList.map((item, index )=>(
                <DepartmentItem item={item} key={index} input={input} setInput={setInput}/>
            ))}
            </div>
        </div>
    )
}

export default DepartmentLIst


const AddDepertment = ({isOpen , setIsOpen , input , setInput , setDepartmentList})=>{
    const handleSubmit =async (e)=>{
        e.preventDefault()
        console.log(e.target.department.value)
        console.log(e.target.ActiveOrInactive.value)
        try {
            await axios.post(`${base_url}/api/v1/departments` , {
                DepartmentName : e.target.department.value,
                status : e.target.ActiveOrInactive.value
            } , {withCredentials : true})

            setDepartmentList((d)=> [...d , {DepartmentName :e.target.department.value , status: e.target.ActiveOrInactive.value}])
            
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            {
                isOpen && (
                    <div className=' absolute bg-slate-200 top-0 rounded-lg right-0 h-screen' >
                        <button onClick={()=>{setIsOpen(s => !s)}} >
                            <X/>
                        </button>
                        <form onSubmit={handleSubmit}>
                                <input value={input} onChange={(e)=>{setInput(e.target.value)}} type="text" name='department' placeholder='Type here...'/>
                                <select name="ActiveOrInactive" id="ActiveOrInactive">
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                                <button>Submit</button>
                        </form>
                    </div>            
                )
            }
        </>
    )
}