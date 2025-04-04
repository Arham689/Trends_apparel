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
        {/* <h1>{item.DepartmentName} {item.status}</h1> */}
        <div className="flex justify-around">
            <h1>{item.DepartmentName}</h1> 

            <p className={`${item?.status === 'Active' ?"bg-green-400 border-green-800 border rounded-full p-[2px] text-sm" : 'bg-red-400 border-red-700 border rounded-full p-[2px] text-sm"'}`}>{item?.status}</p>
            <EditDepartment isEdit={isEdit} setIsEdit={setIsEdit} itemId={item._id} departmentList={departmentList} setDepartmentList={setDepartmentList}/>

            <div className="flex gap-5">
                <button onClick={() => setIsEdit(e => !e)} >
                    <Edit3 color="orange"/>
                </button>
                <button onClick={handleDelete}>
                    <Trash color="red"/>
                </button>
            </div>
        </div>
    </>
    )
}

export default DepartmentItem