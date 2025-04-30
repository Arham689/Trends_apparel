import { toast } from '@/hooks/use-toast'
import axios from 'axios'
import { CookingPot, X } from 'lucide-react'
import React, { useState } from 'react'
const base_url = import.meta.env.VITE_BASE_API_URL
const EditDepartment = ({isEdit , setIsEdit , itemId ,departmentList, setDepartmentList  }) => {
    const [input, setInput] = useState('')
    // find the id of the item 
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.patch(`${base_url}/api/v1/departments/${itemId}`, {
                DepartmentName: e.target.department.value,
                status: e.target.ActiveOrInactive.value
            }, { withCredentials: true  , headers: {
                'Content-Type': 'application/json',
              }}  )
            
              // we can do this same thin inside the setdepartmentlist
              const newDepartment = departmentList.map((item) => {
                if (item._id === itemId) {
                  return { 
                    ...item, // Copy existing properties
                    DepartmentName: e.target.department.value.toUpperCase(),
                    status: e.target.ActiveOrInactive.value
                  };
                } else {
                  return item;
                }
              });
              toast({
                variant: "green",
                title: "Updated",
              })
            setDepartmentList(newDepartment)
            setIsEdit(false)
            setInput('')
            // setIsOpen(false)
        } catch (error) {
            console.log(error)
            toast({
                variant: "destructive",
                title: " Unsuccessful",
            })
        }
    }
  return (
        <>
            
            {isEdit && (<div onClick={()=>setIsEdit(false)} className="fixed inset-0 bg-black bg-opacity-50 z-40"/>)}

            <div className={`
                        fixed top-0 right-0 h-screen min-w-[350px] bg-white z-50 transform transition-transform duration-300 ease-in-out
                        ${isEdit ? 'translate-x-0' : 'translate-x-full'}
                        overflow-y-auto
                `}
                role="dialog"
                aria-modal="true"
            >
                {/* abloute div  */}
                {/* <div onClick={() => setIsOpen(false)} className={` ${isEdit ? 'h-screen w-screen absolute -z-10 bg-[#00000057] right-full top-0' : ' hidden '} `}></div> */}
                <div className='flex justify-between  p-3  pb-5'>
                    <h1 className='text-xl'>Edit Department </h1>
                    <button onClick={() => {
                        setIsEdit(s => !s)
                    }} >
                        <X />
                    </button>
                </div>

                <div className='w-full h-0.5 border-b-2'></div>

                <form onSubmit={handleSubmit} className='p-3'>
                    <br />
                    <div>
                        <div className='text-sm  focus:text-primary text-gray-400'>
                            <label htmlFor="department">Department Name</label>
                        </div>
                        <input className='w-full h-[30px] mb-3 focus:ring-primary focus:outline-2 focus:outline-primary p-1 ' value={input} onChange={(e) => { setInput(e.target.value) }} type="text" name='department' placeholder='Type here...' />
                    </div>

                    <div className='text-sm text-gray-400 mb-3'>
                        <div>
                            <label htmlFor="ActiveOrInactive">Select Status</label>
                        </div>
                        <select className='w-full h-[40px] focus:ring-primary focus:outline-2 focus:outline-primary' name="ActiveOrInactive" id="ActiveOrInactive">
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>

                    </div>
                    <button className='bg-primary rounded-md py-2 px-6 text-white'>Submit</button>
                </form>
            </div>
        </>
  )
}

export default EditDepartment
