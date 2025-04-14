import OperationMappingForm from '@/components/ui/WithDynamicForm'
import useFetch from '@/hooks/useFetch'
import { useIsAuth } from '@/hooks/useIsAuth'
import { flattenObject } from '@/lib/utils'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
const base_url = import.meta.env.VITE_BASE_API_URL   
const OperationEdit = () => {
    const {id} = useParams()
    useIsAuth()
    const [isFormReady, setIsFormReady] = useState(false)
    const [inintialValues, setInintialValues] = useState({})
    const {data , isLoading , error } = useFetch(`${base_url}/api/v1/mapping/${id}`)

    useEffect(()=>{
        if(data){
            console.log(data.operations)
            setInintialValues(data)
            setIsFormReady(true)
        }
    } , [isLoading])
    return (
        <div>
            
            <div className="container mx-auto p-4">
            {isFormReady &&    <OperationMappingForm
                    title="Operation Mapping"
                    endpoint="/mapping"
                    // onSubmitSuccess={handleSubmitSuccess}
                    isEditing={true}
                    initialValues={{
                        operations : inintialValues.operations
                    }}
                    itemId={id}
                    setIsOpen={() => window.history.back()} // Example for going back
                    submitButtonText={ "Update Mapping"}
                    cancelButtonText="Go Back"
                />}
            </div>
        </div>
    )
}

export default OperationEdit
