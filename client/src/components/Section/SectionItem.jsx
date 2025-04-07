import axios from 'axios'
import { Edit3, Trash } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import SidebarForm from '../line/SideBarForm'
const base_url = import.meta.env.VITE_BASE_API_URL

export const SectionItem = ({ item, setsectionList, sectionList }) => {
    const [isEdit, setIsEdit] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [lineList, setLineList] = useState([])
    const [isFormReady, setIsFormReady] = useState(false)
    const [sectionFields, setSectionFields] = useState([
        {
            name: 'sectionName',
            label: 'section Name',
            placeholder: 'Type here...',
            type: 'text'
        },  
        {
            name: 'lineName',
            label: 'Select Line',
            type: 'select',
            options: [] // Empty initially, will be populated with line data
        }
    ])

    const getLlineList = async () => {
        try {
            const data = await axios.get(`${base_url}/api/v1/line`, { withCredentials: true })
            // console.log(data.data.data[0].lineName , data.data.data[0]._id)
            // return data.data.data
            let list = data.data.data.map(i => {
                return { value: i._id, label: i.lineName }
            })
            setLineList(list)

            setSectionFields(prevFields => {
                return prevFields.map(field => {
                    if (field.name === 'lineName') {
                        return { ...field, options: list }
                    }
                    return field
                })
            })


            if (list.length > 0) {
                setIsFormReady(true)
            }


        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getLlineList();
    }, [])


    const handleSectionUpdated = (data) => {
        console.log("handleSEctoin UPdate ", data)
        setsectionList(prev =>
            prev.map(section =>
                section._id === data.data._id
                    ? { ...section, ...data.data }
                    : section
            )
        )
        setIsOpen(false)
    }// line name ??


    const handleDelete = async () => {
        const id = item._id

        try {
            await axios.delete(`${base_url}/api/v1/section/${id}`, { withCredentials: true })
            const newList = sectionList.filter((i) => i._id !== id)
            setsectionList(newList)
        } catch (error) {
            console.log(error)
        }
    }
    console.log(sectionList)

    return (
        <>
            {isFormReady ?
                <SidebarForm
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    title="Section"
                    fields={sectionFields}
                    endpoint="api/v1/section"
                    onSubmitSuccess={handleSectionUpdated}
                    initialValues={{ sectionName: item.sectionName }}
                    isEditing={true}
                    itemId={item._id}
                /> : null
            }

            <tr className="hover:bg-gray-50 border-b">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.sectionName}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{item.lineName.lineName}</td>
                <td className="px-6 py-4 text-sm font-medium">
                    <div className="flex space-x-3">
                        <button 
                            onClick={() => setIsOpen(e => !e)}
                            className="text-yellow-600 hover:text-orange-900"
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
    )
}
