import useFetch from '@/hooks/useFetch'
import React, { useEffect, useState } from 'react'
import SidebarForm from '../ui/SideBarForm'
import axios from 'axios'
import { flattenObject } from '@/lib/utils'
import DynamicItemList from '../ui/DynamicItemList'
const base_url = import.meta.env.VITE_BASE_API_URL

const GarmentList = () => {
    const [garmentList, setGarmentList] = useState([])
    const [input, setInput] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const [isFormReady, setIsFormReady] = useState(false)
    const [styleList, setStyleList] = useState([])
    const [colorList, setColorList] = useState([])

    const fieldsToDisplay = [
        {label : 'garmentName' , value : 'Garment Code'}, 
        { label : 'orderQuantity' , value : "Order Quantity"},
        { label : 'style_styleName' , value : "style"},
        { label : 'color_colorName' , value : "color"},
    ]
    const [garmentFields, setGarmentFields] = useState([
        {
            name: 'garmentName',
            label: 'Garment Name',
            placeholder: 'Type here...',
            type: 'text'
        },
        {
            name: 'orderQuantity',
            label: 'Order Quantity',
            type: 'text',
            placeholder: 'Type here...',
        },
        {
            name : 'style',
            label : 'Style',
            type : 'select',
            options: [] // // Empty initially, will be populated with style data 
        },
        {
            name : 'color',
            label : 'Color',
            type : 'select',
            options: [] // // Empty initially, will be populated with color data 
        }
    ])

    const {data , isLoading , error } = useFetch(`${base_url}/api/v1/garment-code`)
    
    useEffect(() => {
        // getDepartment()
        getStylelist() 
        getColorList()
        console.log( "garment data" , data)
        if(data)
        {
            const flattenedGarment = data.map((i)=> flattenObject(i))
            setGarmentList(flattenedGarment)
        }

    }, [data])

    const handleLineSubmitSuccess = ({ data }) => {
        console.log("submit success", data);
    
        const flattened = flattenObject(data);
    
        setGarmentList(prev => [...prev, flattened]);
    
        setInput('');
    }

    const handleAddList = () => {
        setIsOpen(s => !s)
    }

    const handleUpdate = (data)=>{
        console.log("handleSEctoin UPdate ", data.data)
        const list = flattenObject(data.data)
        setGarmentList(prev =>
            prev.map((Garment, i ) =>
                Garment._id === list._id
                    ? { ...Garment, ...list }
                    : Garment
                // console.log(TIDNO)
            )
        )
        setIsOpen(false)
    }
    
    const getStylelist  =async ()=>{

        try {
            const data = await axios.get(`${base_url}/api/v1/style` , {withCredentials : true })
            console.log(data.data.data.styleData)
    
            let list = data.data.data.styleData.map(( i ) => { return  {value : i._id , label : i.styleName} })
            console.log(list)
    
            setStyleList(list)
    
            setGarmentFields(prevFields => {
                return prevFields.map(field => {
                    if (field.name === 'style') {
                        return { ...field, options: list }
                    }
                    return field
                })
            })
    
        } catch (error) {
            console.log(error)
        }
    }

    const getColorList = async ()=>{
        try {
            const data = await axios.get(`${base_url}/api/v1/color` , {withCredentials : true })
            console.log(data.data.data.colorData)
    
            let list = data.data.data.colorData.map(( i ) => { return  {value : i._id , label : i.colorName} })
            console.log(list)
    
            setColorList(list)

            setGarmentFields(prevFields => {
                return prevFields.map(field => {
                    if (field.name === 'color') {
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
    
    // if (isLoading) {
    //     return <h1>loading...</h1>
    // }

    // if(error)
    // {
    //     return <h1 className='py-12 px-5 bg-red-200 rounded-lg text-red-600 text-2xl border-red-500 border-[2px]'>Something Went Wrong Please Try Again Later... </h1>
    // }

    return (
        <div className="bg-white shadow rounded-lg overflow-hidden" >
        <div className="flex justify-between items-center p-5 border-b border-gray-200">
            <h2 className="text-xl font-medium text-gray-900">Garment Code List</h2>
            <button 
                onClick={handleAddList} 
                className="rounded-md bg-primary text-white py-2 px-4 hover:bg-opacity-90 transition-colors"
            >
                Add New Garment list 
            </button>
        </div>

        <SidebarForm 
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title="Garment Code"
            fields={garmentFields}
            endpoint="/api/v1/garment-code"
            onSubmitSuccess={handleLineSubmitSuccess} // name change 
            initialValues={{
                garmentName: input,
                orderQuantity : "" ,
                style : "",
                color : ""
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
                {garmentList.map((item , i ) => (
                    <DynamicItemList 
                        key={i} 
                        item={item} 
                        title={'Garemnt Code'}
                        setDepartmentList={setGarmentList} 
                        departmentList={garmentList}
                        fieldsToDisplay={fieldsToDisplay}
                        endpoint={'api/v1/garment-code'}
                        editingFields={garmentFields}
                        handleUpdate={handleUpdate}
                        initialValues={{
                            garmentName: input,
                            orderQuantity : "" ,
                            style : "",
                            color : ""
                        }}
                    />
                ))}
            </tbody>
        </table>
        </div>
    )
}

export default GarmentList
