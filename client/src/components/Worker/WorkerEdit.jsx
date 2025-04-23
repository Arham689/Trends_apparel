import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import WorkerDynamicForm from '../ui/WorkerDynamicForm'
import useFetch from '@/hooks/useFetch'
const base_url = import.meta.env.VITE_BASE_API_URL

const WorkerEdit = () => {
    const {id} = useParams() 
    const {data} = useFetch(`${base_url}/api/v1/worker/${id}`)
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
            {!isLoading && <WorkerDynamicForm method='PATCH' initialValue={initialValue}/>}
        </div>
    )
}

export default WorkerEdit