import React from 'react';

const BundleDynamicQuantity = ({ bundelQuantity }) => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-6">Bundles (Generated from Total Quantity)</h2>
      {bundelQuantity.map((bundle, index) => (
        <div key={index} className=" p-2 mb-1">
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex-1 min-w-48">
              <label className="text-sm font-medium block mb-1">Bundle Name</label>
              <input
                type="text"
                readOnly
                value={bundle.bundleName}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
            </div>

            <div className="flex-1 min-w-48">
              <label className="text-sm font-medium block mb-1">Quantity</label>
              <input
                type="number"
                readOnly
                value={bundle.serial_end - bundle.serial_start + 1}
                className="w-full px-3 py-2 border border-gray-300  rounded-md bg-gray-50"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-[40%]">
              <label className="text-sm font-medium block mb-1">Serial Start</label>
              <input
                type="number"
                readOnly
                value={bundle.serial_start}
                className="w-full px-3 py-2 border border-gray-300  rounded-md bg-gray-50"
              />
            </div>

            <div className="w-[40%]">
              <label className="text-sm font-medium block mb-1">Serial End</label>
              <input
                type="number"
                readOnly
                value={bundle.serial_end}
                className="w-full px-3 py-2 border border-gray-300  rounded-md bg-gray-50"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BundleDynamicQuantity;
