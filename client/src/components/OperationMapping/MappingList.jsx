import { toast } from '@/hooks/use-toast'
import useFetch from '@/hooks/useFetch'
import { flattenObject } from '@/lib/utils'
import axios from 'axios'
import { Edit3, Trash } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
const base_url = import.meta.env.VITE_BASE_API_URL 
const MappingList = () => {
    const [mappingList, setMappingList] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate() 
    const fieldsToDisplay = [
        {label : '_id' , value : 'id'}, 
        { label : 'style_styleName' , value : "STYLE"},
        { label : 'garment_garmentName' , value : "GARMENT CODE"},
        { label : 'OPERATIONS' , value : "operations"}, // faltednaed ??
    ]
    const {data , isLoading  , error  } = useFetch(`${base_url}/api/v1/mapping`)

    useEffect(()=>{
        if(data){
            console.log(data)
            
            setMappingList(data.map((i)=> flattenObject(i)))
        }
    } , [data])


    const handleDelete = async (id) => {
        
        try {
            await axios.delete(`${base_url}/api/v1/mapping/${id}`, { withCredentials: true })
            const newList = mappingList.filter((i) => i._id !== id)
            setMappingList(newList)
            toast({
              variant: "green",
              title: "Deleted Successful",
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
    <div className="bg-white shadow rounded-lg overflow-hidden"  >
        <div className="flex justify-between items-center p-5 border-b border-gray-200">
            <h2 className="text-xl font-medium text-gray-900">Operation List</h2>
            <button 
                // onClick={handleAddList} 
                className="rounded-md bg-primary text-white py-2 px-4 hover:bg-opacity-90 transition-colors"
                onClick={()=>{navigate('/operation-mapping/create')}}
            >
                Add New Mapping 
            </button>
        </div>

        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 ">
                <tr>
                    {/* Render table headers dynamically */}
                    {fieldsToDisplay.map(field => (
                        <th 
                            key={field.label} 
                            scope="col" 
                            className="px-6 py-5 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                        >
                            {/* Convert camelCase to Title Case for display */}
                            {field.value.toUpperCase()}
                        </th>
                    ))}
                    <th scope="col" className="px-6 py-3 w-10 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {
                mappingList.length > 0 || (
                  <tr>
                      <td colSpan="3" className="px-6 py-4  text-center text-sm text-gray-500">
                          No Mapping Found
                      </td>
                  </tr>
              )
              }
                {mappingList.map((item , i ) => (   
                    <tr className="border-b border-gray-200">
                      
                    {fieldsToDisplay.map((field, i) => {

                      console.log(field)
                      if (field.value === 'status') {
                        return (
                          <td key={field.value} className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                item?.status === 'Active'
                                  ? 'bg-green-100 text-green-800 border border-green-800'
                                  : 'bg-red-100 text-red-800 border border-red-700'
                              }`}
                            >
                              {item[field.value]}
                            </span>
                          </td>
                        );
                      }
                  
                      if (field.value === 'operations') {
                        return (
                          <td key={field.value} className="px-6 py-4 whitespace-nowrap max-w-xl">
                            <div className="flex flex-wrap gap-2">
                              {item.operations.map((op, index) => (
                                <span
                                  key={op._id}
                                  className="bg-gray-200 relative text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-md "
                                >
                                  {op.operationName}
                                    <span className="flex absolute text-slate-50 bg-primary rounded-full text-[10px] h-4 text-center w-4 -top-2 -right-1 ">
                                        <div className=" justify-center items-center -translate-y-[0px] w-full">
                                            {index + 1}
                                        </div>
                                    </span>
                                </span>
                              ))}
                            </div>
                          </td>
                        );
                      }
                      
                      if(field.value === 'id'){
                        return (
                            <td className="px-6 py-4 whitespace-nowrap text-lg font-light text-gray-500">
                                {item[field.label].substring(item[field.label].length - 3).toUpperCase()}
                            </td>
                        )
                      }
                      // Default field rendering
                      return (
                        <td
                          key={i}
                          className="px-6 py-4 whitespace-nowrap text-lg font-light text-gray-500"
                        >
                          {item[field.label]}
                        </td>
                      );
                    })}
                  
                    <td className="px-6 py-4 whitespace-nowrap text-start text-sm font-medium">
                      <div className="flex justify-start space-x-3">
                        <button onClick={()=>{navigate(`/operation-mapping/edit/${item._id}`)}} className="text-yellow-400 hover:text-yellow-600"> {/** add onClick  */}
                          <Edit3  size={18} />
                        </button>
                        <button onClick={()=>{handleDelete(item._id)}} className="text-red-500 hover:text-red-700"> {/** add onClick  */}
                          <Trash size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                  
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default MappingList
