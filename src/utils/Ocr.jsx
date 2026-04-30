import React, { useEffect, useState } from 'react';
import Tesseract from 'tesseract.js';
import Billchart from './Billchart';

const Ocr = ({ img }) => {
  const [progress, setProgress] = useState(0);
  const [scanText, setScanText] = useState([]);
  const [error, setError] = useState(null);

  // --- Real Image Processing (Not just CSS) ---
  const preprocessImage = (imageSrc) => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const image = new Image();
      
      image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;
        
        // CSS filters ko canvas par apply karna
        ctx.filter = 'grayscale(100%) contrast(200%)';
        ctx.drawImage(image, 0, 0);
        
        // Processed image ka data URL nikalna jo Tesseract samajh sake
        resolve(canvas.toDataURL('image/jpeg'));
      };
      image.src = imageSrc;
    });
  };

  const getScan = async (originalImage) => {
    try {
      setError(null);
      setProgress(0);

      // 1. Image ko sach mein convert karein
      const processedImage = await preprocessImage(originalImage);

      // 2. Processed image ko Tesseract ko dein
      const result = await Tesseract.recognize(processedImage, 'eng', {
        logger: (m) => {
          if (m.status === 'recognizing text') {
            setProgress(Math.round(m.progress * 100));
          }
        }
      });

      const text = result.data.text;
      getdetaildata(text);

    } catch (err) {
      console.error(err);
      setError("Scan failed");
    }
  };

  useEffect(() => {
    if (img) getScan(img);
  }, [img]);

  // ... (getdetaildata function same rahega)
  function getdetaildata(text) {
    const lines = text.split('\n').map(l => l.trim().toLowerCase()).filter(Boolean);
 const extractAmount = (line) => {
  const matches = line.match(/[\d,]+\.?\d*/g);
  if (!matches) return null;

  const last = matches[matches.length - 1];
  return parseFloat(last.replace(/,/g, ''));
};
const subtotalLines = lines.filter(l =>
  l.includes("subtotal")
);

const subtotal = subtotalLines.length > 0
  ? extractAmount(subtotalLines[0])
  : null;
const taxLines = lines.filter(l =>
  /cgst|sgst|tax|gst/i.test(l)
);

let taxAmount = 0;

taxLines.forEach(line => {
  const val = extractAmount(line);
  if (val) taxAmount += val;
});
let taxRate = null;

taxLines.forEach(line => {
  const match = line.match(/(\d+(\.\d+)?)\s*%/);
  if (match) taxRate = parseFloat(match[1]);
});
  const totalLines = lines.filter(l =>
  l.includes("total") && !l.includes("subtotal")
);

// last total usually correct
const total = totalLines.length > 0
  ? extractAmount(totalLines[totalLines.length - 1])
  : null;

    const computedSubtotal = subtotal ?? (total && taxAmount ? total - taxAmount : null);

    const items = lines
      .filter(l => /\d+\.\d{2}/.test(l) && !/total|tax|gst|sub|vat|cgst|sgst/i.test(l))
      .map(l => {
        const amount = parseFloat(l.match(/[\d,]+\.\d{2}/)?.[0]);
        const name = l.replace(/[\d,\.]+/g, '').trim();
        return { name, amount };
      });

    const dateMatch = text.match(/\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}/);
    const date = dateMatch ? dateMatch[0] : null;

    setScanText([{
      merchant: lines[0],
      date,
      items,
      subtotal: computedSubtotal,
      taxRate,
      taxAmount,
      total
    }]);
  }

  const note = scanText[0];
  return (
    <div className="text-white">
      {error && <p className="text-red-500">{error}</p>}
      {!error && progress < 100 && <p>Scanning: {progress}%</p>}
      {!error && progress === 100 && <p>Done </p>}
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