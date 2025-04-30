import { toast } from '@/hooks/use-toast'
import axios from 'axios'
import { X } from 'lucide-react'
import React, { useState } from 'react'
const base_url = import.meta.env.VITE_BASE_API_URL

const AddLine = ({isOpen, setIsOpen,  setLineList, setInput ,input }) => {
    const [isFocused, setIsFocused] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log(e.target.ActiveOrInactive.value)
        try {
            const data = await axios.post(`${base_url}/api/v1/line`, {
                lineName: e.target.line.value,
                // status: e.target.ActiveOrInactive.value
            }, { withCredentials: true })

            setLineList((d) => [...d, { lineName: e.target.line.value , _id : data.data.id }])
            setInput('')
            setIsOpen(false)
            toast({
                variant: "green",
                title: " Successful",
            })
        } catch (error) {
            console.log(error)
            toast({
                variant: "destructive",
                title: " Unsuccessful",
              })
        }
    }
  return (
    <div>
      <>
            {isOpen && (<div onClick={()=>setIsOpen(false)} className="fixed inset-0 bg-black bg-opacity-50 z-40"/>)}

            <div className={`
                        fixed top-0 right-0 h-screen min-w-[350px] bg-white z-50 transform transition-transform duration-300 ease-in-out
                        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
                        overflow-y-auto
                `}
                role="dialog"
                aria-modal="true"
                >
                {/* abloute div  */}
                {/* <div onClick={() => setIsOpen(false)} className={` ${isOpen ? 'h-screen w-screen absolute -z-10 bg-[#00000057] right-full top-0' : ' hidden '} `}></div> */}
                <div className='flex justify-between  p-3  pb-5'>
                    <h1 className='text-xl'>Add New Line </h1>
                    <button onClick={() => {
                        setIsOpen(s => !s)
                    }} >
                        <X />
                    </button>
                </div>

                <div className='w-full h-0.5 border-b-2'></div>

                <form onSubmit={handleSubmit} className='p-3'>
                    <br />
                    <div>
                        <div className={`transition-all duration-200 ${isFocused ? 'text-primary text-sm' : 'text-gray-700'}`}>
                            <label htmlFor="line">Line Name</label>
                        </div>
                        <input onFocus={()=>setIsFocused(true)} onBlur={()=>setIsFocused(false)} className={`w-full transition-all duration-300  mb-3 focus:ring-primary focus:outline-2 focus:outline-primary p-1 ${isFocused ? 'h-10' : "h-[30px]"}`} value={input} onChange={(e) => { setInput(e.target.value) }} type="text" name='line' placeholder='Type here...' />
                    </div>

                    {/* <div className='text-sm text-gray-400 mb-3'>
                        <div>
                            <label htmlFor="ActiveOrInactive">Select Status</label>
                        </div>
                        <select className='w-full h-[40px] focus:ring-primary focus:outline-2 focus:outline-primary' name="ActiveOrInactive" id="ActiveOrInactive">
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>

                    </div> */}
                    <button className='bg-primary rounded-md py-2 px-6 text-white'>Submit</button>
                </form>
            </div>
        </>
    </div>
  )
}

export default AddLine
