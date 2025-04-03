import { Trash ,Edit3  } from "lucide-react"
const DepartmentItem = ({item})=>{
    return (
    <>
        {/* <h1>{item.DepartmentName} {item.status}</h1> */}
        <div className="flex justify-around">
            <h1>{item.DepartmentName}</h1> 

            <p className={`${item.status === 'Active' ?"bg-green-400 border-green-800 border rounded-full p-[2px] text-sm" : 'bg-red-400 border-red-700 border rounded-full p-[2px] text-sm"'}`}>{item.status}</p>
            
            <div className="flex gap-5">
                <button>
                    <Edit3 color="orange"/>
                </button>
                <button>
                    <Trash color="red"/>
                </button>
                
            </div>
        </div>
    </>
    )
}

export default DepartmentItem