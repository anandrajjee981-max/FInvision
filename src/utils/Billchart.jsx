import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

const Billchart = ({ subtotal, total, tax }) => {
  // Data ko filter kar rahe hain taaki null values chart kharab na karein
  const data = [
    { name: "Subtotal", value: subtotal || 0, color: "#6366f1" },
    { name: "Tax", value: tax || 0, color: "#f43f5e" },
    { name: "Total", value: total || 0, color: "#10b981" }
  ];

  // Custom Tooltip for better UI
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800 border border-slate-700 p-3 rounded-lg shadow-xl">
          <p className="text-slate-400 text-sm">{payload[0].payload.name}</p>
          <p className="text-white font-bold text-lg">₹{payload[0].value.toLocaleString()}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full bg-black p-6 rounded-2xl border border-white/10 shadow-2xl">
      <h3 className="text-slate-400 text-sm font-medium mb-4 uppercase tracking-wider">Bill Summary Analysis</h3>
      
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <defs>
            {/* Gradient effects for bars */}
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#818cf8" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0.3}/>
            </linearGradient>
          </defs>
          
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
          
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#94a3b8', fontSize: 12 }}
            dy={10}
          />
          
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#94a3b8', fontSize: 12 }}
            tickFormatter={(v) => `₹${v}`}
          />

          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />

          <Bar 
            dataKey="value" 
            radius={[6, 6, 0, 0]} 
            barSize={50}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.8} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      
      {/* Quick Info Cards below chart */}
      <div className="flex justify-between mt-6 pt-6 border-t border-white/5">
        <div className="text-center">
          <p className="text-xs text-slate-500 uppercase">Payable</p>
          <p className="text-xl font-bold text-emerald-400">₹{total || 0}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-slate-500 uppercase">Tax Paid</p>
          <p className="text-xl font-bold text-rose-400">₹{tax || 0}</p>
        </div>
      </div>
    </div>
  );
};

export default Billchart;