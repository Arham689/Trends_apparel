import useFetch from '@/hooks/useFetch'
import React, { useEffect, useState } from 'react'
import SidebarForm from '../ui/SideBarForm'
import { flattenObject } from '@/lib/utils'
import axios from 'axios'
import TidNo from '@/pages/Design/TidNo'
import DynamicItemList from '../ui/DynamicItemList'
const base_url = import.meta.env.VITE_BASE_API_URL

const StyleList = () => {

    const [styleList, setStyleList] = useState([])
    const [input, setInput] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const [isFormReady, setIsFormReady] = useState(false)
    const [tidNoList, setTidNoList] = useState([])
    const fieldsToDisplay = [
        {label : 'styleName' , value : 'Name'}, 
        {label : 'Tidno_TIDNOName' , value : 'TIDNO.'} , 
        { label : 'status' , value : "status"}
    ]
    const [styleFields, setStyleFields] = useState([
        {
            name: 'styleName',
            label: 'Style Name',
            placeholder: 'Type here...',
            type: 'text'
        },
        {
            name : 'Tidno',
            label : "Select TIDNO.",
            type : 'select',
            options : []// Empty initially, will be populated with tidno data
        },
        {
            name: 'status',
            label: 'Select status',
            type: 'select',
            options: [
                {value : "Active" , label : "Active"},
                {value : "Inactive" , label : "Inactive"}
            ] 
        }
    ])
    const {data , isLoading , error } = useFetch(`${base_url}/api/v1/style`)

    const getTidNoList = async()=>{
        try {
            
            const data = await axios.get(`${base_url}/api/v1/tidno` , {withCredentials: true })
            console.log(data.data.data.tidnoData)

            let list = data.data.data.tidnoData.map(( i ) => { return  {value : i._id , label : i.TIDNOName} })
            console.log(list)
            
            setTidNoList(list)

            setStyleFields(prevFields => {
                return prevFields.map(field => {
                    if (field.name === 'Tidno') {
                        return { ...field, options: list }
                    }
                    return field
                })
            })

            if(list.length > 0 ) setIsFormReady(true)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getTidNoList();
    
        if (data && data.styleData) {
            console.log("data", data);
            const flattenedStyles = data.styleData.map(item => flattenObject(item));
            setStyleList(flattenedStyles);
        }
    }, [data]);

    // const handleStyleSubmitSuccess = ({ data }) => {
    //     console.log("submit success" , data)
    //     // TODO UPDATE TIDNO IN STATE PROPERLY 
    //     setTidNoList(prev => [...prev, { styleName: data.styleName, _id: data._id, status: data.status , Tidno_TIDNOName : data.Tidno.TIDNOName }]) //data.Tidno.TIDNOName
    //     setInput('')
    // }

    const handleStyleSubmitSuccess = ({ data }) => {
        console.log("submit success", data);
    
        const flattened = flattenObject(data);
    
        setStyleList(prev => [...prev, flattened]);
    
        setInput('');
    }

    const handleAddList = () => {
        setIsOpen(s => !s)
    }

    const handleUpdate = (data)=>{
        console.log("handleSEctoin UPdate ", data.data) 
        // flatten obj update ?? 
        setStyleList(prev =>
            prev.map((style, i ) =>
                style._id === data.data._id
                    ? { ...style, ...data.data }
                    : style
                // console.log(TIDNO)
            )
        )
        setIsOpen(false)
    }

    
    if (isLoading) {
        return <h1>loading...</h1>
    }

    if(error)
    {
        return <h1 className='py-12 px-5 bg-red-200 rounded-lg text-red-600 text-2xl border-red-500 border-[2px]'>Something Went Wrong Please Try Again Later... </h1>
    }


  return (
    <div className="bg-white shadow rounded-lg overflow-hidden" >
        <div className="flex justify-between items-center p-5 border-b border-gray-200">
                <h2 className="text-xl font-medium text-gray-900">Styles List</h2>
                <button 
                    onClick={handleAddList} 
                    className="rounded-md bg-primary text-white py-2 px-4 hover:bg-opacity-90 transition-colors"
                >
                    Add New Style
                </button>
        </div>

        {isFormReady && <SidebarForm 
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title="Style"
            fields={styleFields}
            endpoint="/api/v1/style"
            onSubmitSuccess={handleStyleSubmitSuccess} // name change 
            initialValues={{
                styleName: input,
                TidNo : tidNoList[0].value,
                status : "Active" 
            }}
        />}

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
                        styleList.length > 0 ? 
                        styleList.map((item , i ) => (
                            <DynamicItemList
                                key={i} 
                                item={item} 
                                title={"Style"}
                                setDepartmentList={setStyleList} 
                                departmentList={styleList}
                                fieldsToDisplay={fieldsToDisplay}
                                endpoint={'api/v1/style'}
                                editingFields={styleFields}
                                handleUpdate={handleUpdate}
                                initialValues={{
                                    styleName: input,
                                    TidNo : tidNoList[0]?.value,
                                    status : "Active" 
                                }}
                            />
                        )) : (
                            <tr>
                                <td colSpan="3" className="px-6 py-4  text-center text-sm text-gray-500">
                                    No Style Found
                                </td>
                            </tr>
                        )
                    }
                </tbody>

        </table>

    </div>
  )
}

export default StyleList
