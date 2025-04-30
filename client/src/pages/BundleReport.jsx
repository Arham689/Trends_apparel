import SidebarForm from '@/components/ui/SideBarForm'
import { toast } from '@/hooks/use-toast'
import axios from 'axios'
import { Plus } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
const base_url = import.meta.env.VITE_BASE_API_URL
const BundleReport = () => {
  const {id} = useParams()
  const [reportList , setReportList ] = useState([])
  const getreport =async ()=>{
    try {
      const data = await axios.get(`${base_url}/api/v1/hourlyReport/${id}` , {withCredentials : true })
      console.log(data.data.data)
      setReportList(data.data.data)
    } catch (error) {
        console.log(error)
        toast({
          variant: "destructive",
          title: `${error.response.data.message}`,
        })
    }
  }

  useEffect(()=>{
    // fetchOptions();
    getreport()
  },[])
  return (
    <div>
      <HourlyProductionReport data={reportList} getreport={getreport} />
    </div>
  )
}

export default BundleReport


function HourlyProductionReport({ data = null , getreport = null }) {
  // Use provided data or an empty array as fallback
  const reportData = data || [];
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [timeSlots, setTimeSlots] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [issues, setIssues] = useState([])
  const [currentOperationId, setCurrentOperationId] = useState(null);

  
  // Function to get value or display N/A if null
  const displayValue = (value) => {
    return value !== null && value !== undefined ? value : "N/A";
  };

  // Function to calculate row totals
  const calculateRowTotal = (timeSlots) => {
    if (!timeSlots || !Array.isArray(timeSlots)) return 0;
    
    return timeSlots.reduce((total, slot) => {
      const qty = slot.qty_done !== null && !isNaN(parseInt(slot.qty_done)) 
        ? parseInt(slot.qty_done) 
        : 0;
      return total + qty;
    }, 0);
  };

  const fetchOptions = async () => {
    try {
      // const timeSlotRes = await axios.get('your-api-endpoint-for-time-slots');
      const workerRes = await axios.get(`${base_url}/api/v1/worker` , {withCredentials : true});
      const issueres = await axios.get(`${base_url}/api/v1/issue` , {withCredentials : true});

      // setTimeSlots(
      //   timeSlotRes.data.map((slot) => ({
      //     label: slot.name,    // or whatever field you want to show
      //     value: slot._id,     // slot id
      //   }))
      // );

      setWorkers(
        workerRes.data.data.map((worker) => ({
          label: worker.workerName,  // or worker.fullName etc.
          value: worker._id,   // worker id
        }))
      );
      setIssues(
        issueres.data.data.map((worker) => ({
          label: worker.issueCode,  // or worker.fullName etc.
          value: worker._id,   // worker id
        }))
      )
    } catch (error) {
      console.error('Error fetching dropdown options', error);
    }
  };

  
  // Format time with AM/PM
  const formatTime = (timeStr) => {
    if (!timeStr) return "N/A";
    
    const parts = timeStr.split(':');
    const hour = parseInt(parts[0]);
    
    if (hour < 7) {
      return `${timeStr} PM`;
    } else {
      return `${timeStr} AM`;
    }
  };

  useEffect(() => {
    fetchOptions();
  }, []);


  return (
    <div className="w-full  rounded-md shadow-sm">
      {/* Header */}
      <div className="bg-red-500 rounded-t-lg text-white p-4">
        <h2 className="text-2xl text-center rounde font-bold">Hourly Production Report</h2>
      </div>
      
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 text-sm ">
            <tr>
              <th className="w-16 p-2 border text-left font-light">SEQ#</th>
              <th className="w-64 p-2 border text-left font-light">OPERATION NAME</th>
              <th className="p-2 border text-left font-light">OPERATOR</th>
              {reportData.length > 0 && reportData[0].time_slots && 
                reportData[0].time_slots.map((slot, index) => (
                  <th key={index} className="p-2 border text-left font-light">
                    {formatTime(slot.slot_time)}
                  </th>
                ))
              }
              <th className="p-2 border text-left font-light">TOTALS</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-gray-50 ">
              <td colSpan={reportData.length > 0 && reportData[0].time_slots ? reportData[0].time_slots.length + 4 : 12} className="p-2 border text-left font-extralight text-sm">
                Style# 15327-1002 LINE# BRAVO
              </td>
            </tr>
            
            {reportData.map((operation, index) => (
              <React.Fragment key={index}>
              <SidebarForm
                isOpen={isFormOpen}
                setIsOpen={setIsFormOpen}
                title="Assign TimeSlot and Worker"
                fields={[
                  {
                    name: 'timeSlotId',
                    label: 'Select Time Slot',
                    type: 'select',
                    options: timeSlots,
                  },
                  {
                    name: 'worker',
                    label: 'Select Worker',
                    type: 'select',
                    options: workers,
                  },
                  {
                    name: 'issue',
                    label: 'Select Issue',
                    type: 'select',
                    options: issues,
                  },
                  {
                    name: 'qty_done',
                    label: 'Enter completed amt',
                    type: 'number',
                  },
                ]}
                endpoint={`api/v1/hourlyReport/${currentOperationId}`}  // example: "/hourly-reports"
                onSubmitSuccess={(data) => {
                  console.log('Form submitted successfully!', data);
                  getreport(); // Refresh the data
                  setIsFormOpen(false);
                }}
                initialValues={{}}
                // itemId={operation._id}
              />

              <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="p-2 border text-center">{index + 1}</td>
                <td className="p-2 border text-left relative group ">{operation.operationName || "N/A"}
                    <button 
                      className=" absolute top-2 right-2 bg-green-500 text-white px-1 py-1 rounded"
                      onClick={()=>{
                        setIsFormOpen(true)
                        setCurrentOperationId(operation._id); 
                        const temp = operation.time_slots.map((slot)=>({
                          value : slot._id,
                          label : slot.slot_time
                        }))
                        console.log(temp)
                        setTimeSlots(temp)
                      }}
                      >
                      <Plus size={16}/>
                    </button>
                </td>
                <td className="p-2 border text-center">{operation.worker?.workerName || "N/A"}</td>
                
                {operation.time_slots && operation.time_slots.map((slot, slotIndex) => (
                  <td key={slotIndex} className=" border text-center relative ">
                    {displayValue(slot.qty_done)}
                    {slot?.issue?.issueCode  && <div className=' absolute bg-red-300 p-[1px] text-[8px] top-0 right-0 rounded-bl-sm'>{slot.issue?.issueCode}</div>}
                  </td>
                ))}
                
                <td className="p-2 border text-center font-medium">
                  {calculateRowTotal(operation.time_slots)}
                </td>
              </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}