import React from 'react'
import { useState } from "react"
import axios from "axios"
import { Edit3, Trash } from 'lucide-react'
import EditLine from './EditLine'
const base_url = import.meta.env.VITE_BASE_API_URL

const LineItem = ({item , setLineList , LineList }) => {
    const [isEdit, setIsEdit] = useState(false)
    const handleDelete =async ()=>{
        const id = item._id 
        try {
            await axios.delete(`${base_url}/api/v1/line/${id}` , {withCredentials : true })
            const newList = LineList.filter((i)=> i._id !== id )
            setLineList(newList)
        } catch (error) {
            console.log(error)  
        }   
    }  
    return (
        <>
            <EditLine 
                isEdit={isEdit} 
                setIsEdit={setIsEdit} 
                itemId={item._id} 
                LineList={LineList} 
                setLineList={setLineList}
            />
            
            <tr className={`border-b border-gray-200`}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.lineName}
                </td>
                <td className="px-6 py-4 text-sm font-medium">
                    <div className="flex justify-start space-x-3">
                        <button 
                            onClick={() => setIsEdit(e => !e)}
                            className="text-yellow-400 hover:text-orange-900"
                        >
                            <Edit3 size={18} />
                        </button>
                        <button 
                            onClick={handleDelete}
                            className="text-red-600 hover:text-red-900"
                        >
                            <Trash size={18} />
                        </button>
                    </div>
                </td>
            </tr>
        </>
    );
}

export default LineItem
