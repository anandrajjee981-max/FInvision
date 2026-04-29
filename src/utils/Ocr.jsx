import React, { useEffect, useState } from 'react'
import Tesseract from 'tesseract.js';
import Billchart from './Billchart';

const Ocr = ({ img }) => {
  const [progress, setProgress] = useState(0);
  const [scanText, setScanText] = useState([]);
  const [error, setError] = useState(null);

  const getScan = async (image) => {
    try {
      setError(null);
      setProgress(0);

      const result = await Tesseract.recognize(image, 'eng', {
        logger: (m) => {
          if (m.status === 'recognizing text') {
            setProgress(Math.round(m.progress * 100));
          }
        }
      });

     
    const text = result.data.text;
getdetaildata(text); // yahi call hona chahiye

    } catch (err) {
      setError("Scan failed");
    }
  };

  useEffect(() => {
    if (img) getScan(img);
  }, [img]);
function getdetaildata(text){
  const lines =text.split('\n').map(l => l.trim()).filter(Boolean)
  // kise bhi line say phela number nikalo
const extractAmount = (line) => { 
  const match = line.match(/[\d,]+\.?\d*/);
  return match ? parseFloat(match[0].replace(/,/g, '')) : null;
}
  //subtoatal
   const subtotalLine = lines.find(l => /sub\s*total|subtotal/i.test(l));
  const subtotal = subtotalLine ? extractAmount(subtotalLine) : null;

    const taxLine = lines.find(l => /gst|tax|vat|cgst|sgst/i.test(l));
  const taxAmount = taxLine ? extractAmount(taxLine) : null;

   const taxRateMatch = taxLine?.match(/(\d+(\.\d+)?)\s*%/);
  const taxRate = taxRateMatch ? parseFloat(taxRateMatch[1]) : null;

  const totalLine = lines.find(l => /grand\s*total|total/i.test(l));
  const total = totalLine ? extractAmount(totalLine) : null;

    const computedSubtotal =
    subtotal ?? (total && taxAmount ? total - taxAmount : null);

      const items = lines
    .filter(l =>
      /\d+\.\d{2}/.test(l) &&
      !/total|tax|gst|sub|vat|cgst|sgst/i.test(l)
    )
    .map(l => {
      const amount = parseFloat(l.match(/[\d,]+\.\d{2}/)?.[0]);
      const name   = l.replace(/[\d,\.]+/g, '').trim();
      return { name, amount };
    });

const dateMatch = text.match(/\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}/);
  const date = dateMatch ? dateMatch[0] : null;
let arr = [];

arr.push({
  merchant: lines[0],
  date: date,
  items: items,
  subtotal: computedSubtotal, // before tax
  taxRate: taxRate,           // 5 (meaning 5%)
  taxAmount: taxAmount,       // 21.25
  total: total                // after tax
});
setScanText(arr)


}
const note = scanText[0];
  return (
    <div className="text-white">
      {error && <p>{error}</p>}
      {!error && progress < 100 && <p>Scanning: {progress}%</p>}
      {!error && progress === 100 && <p>Done ✅</p>}
{note && (
  <Billchart 
    subtotal={note.subtotal} 
    total={note.total} 
    tax={note.taxAmount}
  />
)}  
    </div>
  );
};

export default Ocr;