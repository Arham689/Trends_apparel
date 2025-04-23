import useFetch from '@/hooks/useFetch';
import { flattenObject } from '@/lib/utils';
import { generateBarcodesPdf } from '@/utils/generateBarcodesPdf';
import axios from 'axios';
import { Brush, DeleteIcon, Edit2, FileText, Trash, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
const base_url = import.meta.env.VITE_BASE_API_URL

const BundleList = () => {

  const [bundles, setBundles] = useState([]);
  const [operations, setOperations] = useState([]);

  const {data , isLoading , error } = useFetch(`${base_url}/api/v1/bundle`)
  useEffect(() => {
    if (data) {
      console.log(data);
  
      const extractedOperations = [];
      const temp = data.map((item) => {
        const flat = flattenObject(item);
  
        // Save operations with the corresponding ID
        extractedOperations.push({
          id: item._id,  
          operations: item.bundle_operations || [],
        });
  
        delete flat.bundle_operations;
  
        return flat;
      });
  
      setOperations(extractedOperations);  
      setBundles(temp);                    
    }
  }, [data]);

  const onDelete = async (bundle) => {
    // const confirmDelete = window.confirm(`Are you sure you want to delete bundle "${bundle.bundleName}"?`);
    // if (!confirmDelete) return;
  
    try {
      const res = await axios.delete(`${base_url}/api/v1/bundle/${bundle._id}`, {withCredentials : true  });
      // Filter out the deleted bundle from state
      setBundles(prev => prev.filter(b => b._id  !== bundle._id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleGenerateBolb = (bundle)=>{

    console.log(bundle._id)

    const tempOperation = operations.filter((i)=> i.id === bundle._id )
    
    console.log(bundle) 

    const lable = tempOperation[0]?.operations.map((i)=>{
      return {
        ...i,
        bundleName : bundle.bundleName,
        TIDNOName :bundle.Tidno_TIDNOName,
        sizeName : bundle.size_sizeName,
        serial_start : bundle.serial_start,
        serial_end : bundle.serial_end , 
        styleName : bundle.style_styleName 
      }
    })

    console.log("lable" ,  lable)
    generateBarcodesPdf(lable)
  }
  return (  
    <div className="overflow-x-auto">
      <table className="min-w-full text-left">
        <thead className="bg-gray-100 text-sm ">
        <tr>
          <th className="px-4 py-2 font-light">ID</th>
          <th className="px-4 py-2 font-light">STYLE</th>
          <th className="px-4 py-2 font-light">GARMENT CODE</th>
          <th className="px-4 py-2 font-light">BUNDLE NAME</th>
          <th className="px-4 py-2 font-light">SERIAL</th>
          <th className="px-4 py-2 font-light">SIZE</th>
          <th className="px-4 py-2 font-light text-center">PRODUCTION DATE</th>
          <th className="px-4 py-2 font-light">ACTIONS</th>
        </tr>
        </thead>
        <tbody className='text-gray-500'>
          {bundles.map((bundle, index) => (
            <tr key={index} className="border-t">
              <td className="px-4 py-4">{index + 1}</td>
              <td className="px-4 py-4">{bundle.style_styleName}</td>
              <td className="px-4 py-4">{bundle.garment_garmentName}</td>
              <td className="px-4 py-4">{bundle.bundleName}</td>
              <td className="px-4 py-4 bg-gray-100 rounded ">
                {bundle.serial_start}-{bundle.serial_end}
              </td>
              <td className="px-4 py-4">{bundle.size_sizeName}</td>
              <td className="text-center ">
                <div className='text-center bg-red-100 text-red-800 mx-auto px-4 w-fit p-1'>
                  {new Date(bundle.production_date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
              </td>
              <td className="px-4 py-4 flex justify-around text-left">
                <button
                  onClick={() => onDelete(bundle)}
                  className="text-red-500 hover:text-red-400 font-light text-[5px]"
                >
                  <Trash2 size={22}/>
                </button>
                <button className=' text-green-400 ' onClick={()=>{handleGenerateBolb(bundle)}}>
                  <FileText size={22}/>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BundleList;
