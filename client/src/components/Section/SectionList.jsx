import React, { useEffect, useState } from 'react'
import SidebarForm from '../line/SideBarForm'
import axios from 'axios'
import { SectionItem } from './SectionItem'
const base_url = import.meta.env.VITE_BASE_API_URL
const SectionList = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [sectionList, setsectionList] = useState([])
    const [input, setInput] = useState('')
    const [lineList , setLineList ] = useState([])
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
      
    // get the data of lines
    // make this -> [{valuse: objid , lable "LINE 1 "}]
    const getLlineList = async ()=>{
        try {
            const data = await axios.get(`${base_url}/api/v1/line` , {withCredentials : true })
            // console.log(data.data.data[0].lineName , data.data.data[0]._id)
            // return data.data.data
            let list = data.data.data.map( i  =>  {
                return {value : i._id  , label : i.lineName }
            })
            setLineList(list)

            setSectionFields(prevFields => {
                return prevFields.map(field => {
                  if (field.name === 'lineName') {
                    return {...field, options: list}
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

    useEffect(()=>{
     getLlineList() ; 
     getSectionList()
    },[])

    const handleLineSubmitSuccess = ({data}) => {
      console.log(data)
      setsectionList(prev => [...prev, { sectionName: data.sectionName, _id: data.id , lineName : data.lineName}])// line name ??
      setInput('')
    }
    
    const getSectionList = async ()=>{
      try {
        const data = await axios.get(`${base_url}/api/v1/section`)
        console.log(data.data.data)
        setsectionList(data.data.data)
      } catch (error) {
          console.log(error)
      }
    }

    // isLoading 
    // if(sectionList.length === 0 )
    // {
    //   return <h1>loading....</h1>
    // }
  return (
    <div> 
        <div className='flex justify-between p-5'>
            <div className=' text-xl '>Section List</div>
            <button onClick={() => setIsOpen(true)} className="bg-primary text-white px-4 py-2 rounded">
            Add New Section
        </button>
        </div>

        

        {isFormReady ? (
        <SidebarForm
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title="Add New section"
            fields={sectionFields}
            endpoint="/api/v1/section"
            onSubmitSuccess={handleLineSubmitSuccess}
            initialValues={{ 
            sectionName: input, 
            lineName: sectionFields[1].options[0]?.value || "" 
            }}
        />
        ) : null}

        {/* render the list  */}
        {
          sectionList.length === 0 ? <h1>No Data Found</h1> : <table className="min-w-full divide-y divide-gray-200">
          <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3">NAME</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3">LINE</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3">ACTION</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {sectionList.map((item, index) => (
                <SectionItem 
                  item={item} 
                  key={index} 
                  setsectionList={setsectionList} 
                  sectionList={sectionList}
                />
              ))}
            </tbody>
        </table>
        }
       
    </div>
  )
}

export default SectionList
