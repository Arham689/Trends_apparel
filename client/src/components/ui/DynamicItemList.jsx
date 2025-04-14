import { Trash, Edit3, CookingPot } from "lucide-react"
import EditDepartment from '../Department/EditDepartment'
import { useState } from "react"
import axios from "axios"
import SidebarForm from "./SideBarForm"

const base_url = import.meta.env.VITE_BASE_API_URL

const DynamicItemList = ({ item, setDepartmentList, departmentList, fieldsToDisplay , endpoint , editingFields , handleUpdate  , title }) => {
    const [isEdit, setIsEdit] = useState(false)
    const [initialValues, setInitialValues] = useState({})
    const id = item._id 
    console.log("titem id " , id)
    // TODO : make the url also dynamic for 
    const handleDelete = async () => {
        
        try {
            await axios.delete(`${base_url}/${endpoint}/${id}`, { withCredentials: true })
            const newList = departmentList.filter((i) => i._id !== id)
            setDepartmentList(newList)
        } catch (error) {
            console.log(error)  
        }   
    }

    const handleEditClick = () => {
        const currentItem = departmentList.find(dep => dep._id === id)
        if (currentItem) {
            const initialData = {}
            fieldsToDisplay.forEach(field => {
                initialData[field.label] = currentItem[field.label]
            })
            setInitialValues(initialData)
            setIsEdit(true)
        }
    }
    // If no fields are specified, default to showing DepartmentName and status
    const fields = fieldsToDisplay || ['DepartmentName', 'status']
    return (
        <>
            {/* TODO : add side bar form for Editing */}
            {/* <EditDepartment 
                isEdit={isEdit} 
                setIsEdit={setIsEdit} 
                itemId={item._id} 
                departmentList={departmentList} 
                setDepartmentList={setDepartmentList}
            /> */}
            
            <SidebarForm
                isOpen={isEdit}
                setIsOpen={setIsEdit}
                title={title} // static??
                fields={editingFields}
                endpoint={endpoint}
                onSubmitSuccess={handleUpdate}
                isEditing={true}
                itemId={id}
                initialValues={initialValues}
            />
            <tr className="border-b border-gray-200">
                {fields.map((field , i) => {
                    // Special formatting for status field
                    if (field.value === 'status') {
                        return (
                            <td key={field.value} className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    item?.status === 'Active' 
                                        ? 'bg-green-100 text-green-800 border border-green-800' 
                                        : 'bg-red-100 text-red-800 border border-red-700'
                                }`}>
                                    {item[field.value]}
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
                            onClick={handleEditClick}
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

export default DynamicItemList