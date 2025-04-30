
import DynamicItemList from '@/components/ui/DynamicItemList'
import SidebarForm from '@/components/ui/SideBarForm'
import useFetch from '@/hooks/useFetch'
import React, { useEffect, useState } from 'react'
const base_url = import.meta.env.VITE_BASE_API_URL

const TidNoLIst = () => {
    const [tidNoList, setTidNoList] = useState([])
    const [input, setInput] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const fieldsToDisplay = [{label : 'TIDNOName' , value : 'TIDNO.'}, { label : 'status' , value : "status"}]
    const [tidNoFields, setTidNoFields] = useState([
        {
            name: 'TIDNOName',
            label: 'TID NO. Name',
            placeholder: 'Type here...',
            type: 'text'
        },
        {
            name: 'status',
            label: 'Select status',
            type: 'select',
            options: [
                {value : "Active" , label : "Active"},
                {value : "Inactive" , label : "Inactive"}
            ] // Empty initially, will be populated with line data
        }
    ])
    const {data , isLoading , error } = useFetch(`${base_url}/api/v1/tidno`)

    useEffect(() => {
        // getDepartment()
        if(data)
        {
            setTidNoList(data.tidnoData)
        }

    }, [data])

    const handleLineSubmitSuccess = ({ data }) => {
        console.log("submit success" , data)
        setTidNoList(prev => [...prev, { TIDNOName: data.TIDNOName, _id: data._id, status: data.status }])// line name ??
        setInput('')
    }

    const handleAddList = () => {
        setIsOpen(s => !s)
    }

    const handleUpdate = (data)=>{
        console.log("handleSEctoin UPdate ", data.data)
        setTidNoList(prev =>
            prev.map((TIDNO, i ) =>
                TIDNO._id === data.data._id
                    ? { ...TIDNO, ...data.data }
                    : TIDNO
                // console.log(TIDNO)
            )
        )
        setIsOpen(false)
    }

    return (
        <div className="bg-white shadow rounded-lg overflow-hidden" >
            <div className="flex justify-between items-center p-5 border-b border-gray-200">
                <h2 className="text-xl font-medium text-gray-900">TID NO. List</h2>
                <button 
                    onClick={handleAddList} 
                    className="rounded-md bg-primary text-white py-2 px-4 hover:bg-opacity-90 transition-colors"
                >
                    Add New TID NO.
                </button>
            </div>

            <SidebarForm 
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                title="TID NO."
                fields={tidNoFields}
                endpoint="/api/v1/tidno"
                onSubmitSuccess={handleLineSubmitSuccess} // name change 
                initialValues={{
                    TIDNOName: input,
                    status : "Active" 
                }}
            />

            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        {/* Render table headers dynamically */}
                        {fieldsToDisplay.map(field => (
                            <th 
                                key={field.label} 
                                scope="col" 
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                {/* Convert camelCase to Title Case for display */}
                                {field.value.toUpperCase()}
                            </th>
                        ))}
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {
                        tidNoList.length > 0 ?
                        tidNoList.map((item , i ) => (
                            <DynamicItemList 
                                key={i} 
                                item={item} 
                                title={'TIDNO.'}
                                setDepartmentList={setTidNoList} 
                                departmentList={tidNoList}
                                fieldsToDisplay={fieldsToDisplay}
                                endpoint={'api/v1/tidno'}
                                editingFields={tidNoFields}
                                handleUpdate={handleUpdate}
                                initialValues={{
                                    TIDNOName: input,
                                    status : "Active" 
                                }}
                            />
                        )): (
                            <tr>
                                <td colSpan="3" className="px-6 py-4  text-center text-sm text-gray-500">
                                    No Tid No. Found
                                </td>
                            </tr>
                        )
                    }
                    {}
                </tbody>
            </table>

        </div>
    )
}

export default TidNoLIst
