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
        <div>        
        <div className="flex justify-around">
            <h1>{item.lineName}</h1> 

            <EditLine isEdit={isEdit} setIsEdit={setIsEdit} itemId={item._id} LineList={LineList} setLineList={setLineList}/>

            <div className="flex gap-5">
                <button onClick={() => setIsEdit(e => !e)} >
                    <Edit3 color="orange"/>
                </button>
                <button onClick={handleDelete}>
                    <Trash color="red"/>
                </button>
            </div>  
        </div>
        </div>
  )
}

export default LineItem
