import React, { useRef, useEffect, forwardRef } from 'react';
import JsBarcode from 'jsbarcode';

export const BarcodeLabel = forwardRef(({ data }, ref) => {
  const svgRef = useRef(null);

  useEffect(() => {
    JsBarcode(svgRef.current, data.barcodeText, {
      format: 'CODE128',
      lineColor: '#000',
      width: 2,
      height: 60,
      displayValue: false,
    });
  }, [data]);

  return (
    <div ref={ref} style={{ fontFamily: 'Arial', border: '1px solid #000', width: 500, padding: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <div>PO {data.po}</div>
          <div>FINAL PACKING</div>
        </div>
        <div>
          <div>PC {data.pc}</div>
          <div>{data.BN}</div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
        <div>OP {data.op}</div>
        <div>{data.mid}</div>
        <div>SZ {data.size}</div>
      </div>

      <svg className=' w-full' ref={svgRef}></svg>

      <div className=' '>{data.barcodeText}</div>
    </div>

  );
});