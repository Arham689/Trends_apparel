import { Trash ,Edit3  } from "lucide-react"
import EditDepartment from "./EditDepartment"
import { useState } from "react"
import axios from "axios"
const base_url = import.meta.env.VITE_BASE_API_URL
const DepartmentItem = ({item , setDepartmentList , departmentList})=>{
    const [isEdit, setIsEdit] = useState(false)
    const handleDelete =async ()=>{
        const id = item._id 
        try {
            await axios.delete(`${base_url}/api/v1/departments/${id}` , {withCredentials : true })
            const newList = departmentList.filter((i)=> i._id !== id )
            setDepartmentList(newList)
        } catch (error) {
            console.log(error)  
        }   
    }       
    return (
        <>
            <EditDepartment 
                isEdit={isEdit} 
                setIsEdit={setIsEdit} 
                itemId={item._id} 
                departmentList={departmentList} 
                setDepartmentList={setDepartmentList}
            />
            
            <tr className={` border-b border-gray-200`}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.DepartmentName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        item?.status === 'Active' 
                            ? 'bg-green-100 text-green-800 border border-green-800' 
                            : 'bg-red-100 text-red-800 border border-red-700'
                    }`}>
                        {item?.status}
                    </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-start text-sm font-medium">
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

export default DepartmentItem