import useFetch from '@/hooks/useFetch'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import SupervisorDynamicForm from '../ui/SupervisorDynamicForm'
const base_url = import.meta.env.VITE_BASE_API_URL
const SupervisorEdit = () => {
    const {id} = useParams()
    const {data} = useFetch(`${base_url}/api/v1/supervisor/${id}`)
    const [initialValue, setInitialValue] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    
    useEffect(() => {
        if(data) {
            console.log(data)
            setInitialValue(data)
            setIsLoading(false)
        }
    }, [data])
    
    return (
        <div>
            {!isLoading && <SupervisorDynamicForm method='PATCH' initialValue={initialValue}/>}
        </div>
    )
}

export default SupervisorEdit
