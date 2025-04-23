import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import JsBarcode from 'jsbarcode';

export async function generateBarcodesPdf(labels) {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // 2 inch x 1 inch = 144 x 72 points
  const pageWidth = 144;
  const pageHeight = 72;

  for (const label of labels) {
    const page = pdfDoc.addPage([pageWidth, pageHeight]);
    const { width, height } = page.getSize();
    const departmentName = label.department?.DepartmentName || 'NA';

    // Header line
    page.drawText(`PO ${label.TIDNOName}`, {
      x: 5,
      y: height - 10,
      size: 6,
      font,
    });

    page.drawText(`PC ${label.serial_end - label.serial_start}`, {
      x: width - 30,
      y: height - 10,
      size: 6,
      font,
    });

    // Second line
    page.drawText(`${label.operationName}`, {
      x: 5,
      y: height - 18,
      size: 5,
      font,
    });

    page.drawText(`BN ${label.bundleName}`, {
      x: width - 30,
      y: height - 18,
      size: 5,
      font,
    });

    // Third line
    page.drawText(`OP ${label.serial_start}`, {
      x: 5,
      y: height - 26,
      size: 6,
      font,
    });

    page.drawText(`${label.serial_end}`, {
      x: width / 2 - 10,
      y: height - 26,
      size: 6,
      font,
    });

    page.drawText(`SZ ${label.sizeName}`, {
      x: width - 30,
      y: height - 26,
      size: 5,
      font,
    });

    // Barcode generation
 
    const canvas = document.createElement('canvas');
    JsBarcode(canvas, `/d${departmentName}/f${label.styleName}/h${label.bundleName}`, {
      format: 'CODE128',
      lineColor: '#000',
      width: 1,
      height: 20,
      displayValue: false,
      margin: 0,
    });

    const pngUrl = canvas.toDataURL('image/png');
    const pngImageBytes = await fetch(pngUrl).then(res => res.arrayBuffer());
    const pngImage = await pdfDoc.embedPng(pngImageBytes);

    // Draw barcode
    page.drawImage(pngImage, {
      x: 5,
      y: height - 60,
      width: width - 10,
      height: 20,
    });

    // Barcode text (bottom)
    page.drawText(`/d${departmentName}/f${label.styleName}/h${label.bundleName}`, {
      x: (width / (`/d${departmentName}/f${label.styleName}/h${label.bundleName}`.length * 2.5)) + 5 ,
      y: 3,
      size: 5.5,
      font,
    });
  }

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  window.open(url, '_blank');
}
