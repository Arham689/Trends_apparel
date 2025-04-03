import React from 'react'
import { Button } from '../components/ui/button'
import { useToast } from '@/hooks/use-toast'

const Contact = () => {
  const {toast} = useToast()
  return (
    <div>
      <Button onClick={()=>{
        toast({
          title: "Scheduled: Catch up",
          description: "Friday, February 10, 2023 at 5:57 PM",
        })
      }}>contact us</Button>
    </div>
  )
}

export default Contact
