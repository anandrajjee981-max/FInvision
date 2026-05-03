import React, { useContext, useEffect, useState, useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import { Userdatacontext } from '../context/UserContext';

// Custom Tooltip for that "High-End" feel
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-zinc-900/90 backdrop-blur-md border border-zinc-700 p-3 rounded-lg shadow-2xl">
        <p className="text-zinc-400 text-xs font-medium uppercase tracking-wider mb-1">{label}</p>
        <p className="text-white text-lg font-bold">
          ₹{payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

const Dashboard = () => {
  const { stored } = useContext(Userdatacontext);
  const [data, setData] = useState([]);
  const [activeRange, setActiveRange] = useState(10);

  // Pure White to Zinc palette for a clean look on black
  const COLORS = ['#ffffff', '#e4e4e7', '#a1a1aa', '#71717a', '#3f3f46'];

  const findchart = (days) => {
    const today = new Date();
    const lastXday = stored.filter(item => {
      if (!item.id) return false;
      const itemDate = new Date(item.id);
      const diff = (today - itemDate) / (1000 * 60 * 60 * 24);
      return diff <= days;
    });

    const grouped = {};
    lastXday.forEach(element => {
      const category = element.classify || "Other";
      if (!grouped[category]) grouped[category] = 0;
      grouped[category] += Number(element.expense);
    });

    return Object.keys(grouped).map(cat => ({
      category: cat,
      amount: grouped[cat]
    }));
  };

  useEffect(() => {
    setData(findchart(activeRange));
  }, [stored, activeRange]);

  const totalAmount = useMemo(() => 
    data.reduce((acc, curr) => acc + curr.amount, 0), 
  [data]);

  return (
    <div className='min-h-screen bg-black text-white p-6 md:p-12 selection:bg-white selection:text-black'>
      <div className='max-w-6xl mx-auto'>
        
        {/* HEADER */}
        <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 pt-20'>
          <div>
            <h1 className='text-4xl font-bold tracking-tighter italic'>FINANCE.</h1>
            <p className='text-zinc-500 font-medium'>Spending analytics for the last {activeRange} days</p>
          </div>

          <div className='flex bg-zinc-900 rounded-full p-1 border border-zinc-800'>
            {[10, 20, 30].map((range) => (
              <button
                key={range}
                onClick={() => setActiveRange(range)}
                className={`px-5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeRange === range 
                    ? "bg-white text-black" 
                    : "text-zinc-500 hover:text-zinc-200"
                }`}
              >
                {range}D
              </button>
            ))}
          </div>
        </div>

        {/* STATS SECTION */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-10'>
          <div className='md:col-span-1 bg-zinc-900/40 border border-zinc-800 p-6 rounded-3xl flex flex-col justify-between'>
            <span className='text-zinc-500 text-sm font-semibold uppercase tracking-widest'>Total Burn</span>
            <h2 className='text-4xl font-bold mt-4'>₹{totalAmount.toLocaleString()}</h2>
          </div>

          {/* CHART AREA */}
          <div className='md:col-span-3 bg-zinc-900/20 border border-zinc-800 p-6 rounded-3xl'>
            {data.length === 0 ? (
              <div className='h-[300px] flex items-center justify-center'>
                <p className="text-zinc-700 tracking-widest uppercase text-xs">No Data Found</p>
              </div>
            ) : (
              <div className='h-[300px] w-full'>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity={1} />
                        <stop offset="100%" stopColor="#ffffff" stopOpacity={0.6} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="0" vertical={false} stroke="#18181b" />
                    <XAxis 
                      dataKey="category" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#52525b', fontSize: 11, fontWeight: 600 }}
                      dy={10}
                    />
                    <YAxis hide />
                    <Tooltip 
                      content={<CustomTooltip />} 
                      cursor={{ fill: '#18181b' }}
                    />
                    <Bar 
                      dataKey="amount" 
                      radius={[4, 4, 4, 4]} 
                      barSize={32}
                    >
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 0 ? "url(#barGradient)" : "#27272a"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;