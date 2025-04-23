import { Trash, Edit3 } from "lucide-react"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const base_url = import.meta.env.VITE_BASE_API_URL

const WorkerItem = ({ 
  item, 
  setItemList, 
  itemList, 
  fieldsToDisplay, 
  endpoint, 
  title,
  onEdit 
}) => {
  const id = item._id

  const handleDelete = async () => {
    try {
      await axios.delete(`${base_url}${endpoint}/${id}`, { withCredentials: true })
      const newList = itemList.filter((i) => i._id !== id)
      setItemList(newList)
    } catch (error) {
      console.log(error)  
    }   
  }
  const navigate = useNavigate() 
  const handleEditClick = () => {
    // Pass the item to the parent component for editing
    const currentItem = itemList.find(item => item._id === id)
    if (currentItem && onEdit) {
      onEdit(currentItem)
    }
  }

  return (
    <tr className="border-b border-gray-200">
      {fieldsToDisplay.map((field, i) => {
        // Handle image field
        if (field.label === 'image') {
          return (
            <td key={i} className="px-6 py-4 whitespace-nowrap">
              <img 
                src={item[field.label] || "/api/placeholder/80/80"} 
                alt={`${field.label} image`}
                className="h-12 w-12 rounded-md object-cover"
              />
            </td>
          )
        }

        // Special formatting for status field
        if (field.label === 'status') {
          return (
            <td key={i} className="px-6 py-4 whitespace-nowrap">
              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                item?.status === 'Active' 
                  ? 'bg-green-100 text-green-800 border border-green-800' 
                  : 'bg-red-100 text-red-800 border border-red-700'
              }`}>
                {item[field.label]}
              </span>
            </td>
          )
        }
        
        // Default rendering for other fields
        return (
          <td key={i} className="px-6 py-4 whitespace-nowrap text-lg font-light text-gray-500">
            {item[field.label]}
          </td>
        )
      })}
      
      {/* Actions column is always shown */}
      <td className="px-6 py-4 whitespace-nowrap text-start text-sm font-medium">
        <div className="flex justify-start space-x-3">
          <button 
            onClick={()=>{navigate(`/${title}/edit/${id}`)}}
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
  );
}

export default WorkerItem 