import React from 'react'
import {LineChart, Line,XAxis, YAxis,CartesianGrid, Tooltip,ResponsiveContainer} from 'recharts';


const Billchart = ({subtotal , total , tax}) => {
const data = [
  { name: "Subtotal", value: subtotal },
  { name: "Tax", value: tax },
  { name: "Total", value: total }
];


  return (
    <div>
       <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
  <CartesianGrid strokeDasharray="3 3" />

  <XAxis dataKey="name" />   {/* ✅ correct */}
  
  <YAxis
    domain={[0, 'auto']}
    tickFormatter={(v) => `₹${v}`}
  />

  <Tooltip formatter={(value) => `₹${value}`} />

  <Line
    type="monotone"
    dataKey="value"   
    stroke="#6366f1"
    strokeWidth={2}
  />
</LineChart>
    </ResponsiveContainer>


    </div>
  )
}

export default Billchart
