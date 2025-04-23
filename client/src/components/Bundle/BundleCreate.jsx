import { useIsAuth } from '@/hooks/useIsAuth'
import { fetchAndTransformList } from '@/utils/getAndTransformList';
import React, { useEffect, useRef, useState } from 'react'
const base_url = import.meta.env.VITE_BASE_API_URL
import { FormFields } from '@/utils/BundleFormFileds';
import BundleForm from './BundleForm';
import BundleOperations from './BundleOperations';
import BundleDynamicQuantity from './BundleDynamicQuantity';
// const FormFields = [
//   {
//     name: 'garment',
//     label: 'Garment Code',
//     type: 'select',
//     placeholder: 'Select Garment Code',
//     options: [],
//   },
//   {
//     name: 'size',
//     label: 'Size',
//     type: 'select',
//     placeholder: 'Select Size',
//     options: [],
//   },
//   {
//     name: 'production_date',
//     label: 'Production Date',
//     type: 'date',
//     placeholder: 'Select DATE',
//     options: [],
//   },
//   {
//     name: 'Total',
//     label: 'Total Quantity',
//     type: 'number',
//     placeholder: 'Enter Quantity',
//     options: [],
//   },
//   {
//     name: 'line_id',
//     label: 'Line',
//     type: 'select',
//     placeholder: 'Select Line',
//     options: [],
//   },
//   {
//     name: 'section_id',
//     label: 'Section',
//     type: 'select',
//     placeholder: 'Select Section',
//     options: [],
//   },
// ];

const BundlesCreate = () => {
  useIsAuth()

  const [bundleOperations, setBundleOperations] = useState([])
  const [operationError, setOperationError] = useState(false)
  const [inputQuantity, setInputQuantity] = useState({})
  const [bundelQuantity, setBundelQuantity] = useState([])
  return (
    <div className='p-3 shadow-[0px_0px_20px_10px_rgba(0,_0,_0,_0.1)] rounded-lg mx-1 mt-2'>
      {/* Add dropdown animation keyframes */}

      <BundleForm setBundleOperations={setBundleOperations} setOperationError={setOperationError} setBundelQuantity={setBundelQuantity} bundelQuantity={bundelQuantity} />

      <br />
      <hr />
      <div>
        <BundleDynamicQuantity bundelQuantity={bundelQuantity} />
      </div>
      <br />
      <div>
        <h1 className=' font-bold text-xl mb-2'>Operations</h1>
        {
          operationError ? <div className=' bg-orange-200 p-4 rounded-lg text-red-700'>NO MAPPING FOUND PLEASE SELECT OTHER OPTIONS </div> : bundleOperations.length > 0 && <BundleOperations bundleOperations={bundleOperations} />
        }

      </div>
    </div>
  );
};

export default BundlesCreate;