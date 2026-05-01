import React, { useContext, useState } from 'react';
import { Userdatacontext } from '../context/UserContext';
import { FaArrowLeft, FaFilter, FaIndianRupeeSign, FaCalendarDays } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

const History = () => {
  const { stored } = useContext(Userdatacontext);
  const navigate = useNavigate();

  const [filter, setfilter] = useState({
    category: "all",
  });

  const categories = [
    "all",
    ...new Set(stored.map(item => item.classify).filter(Boolean))
  ];

  const filteredData = stored.filter(item => {
    if (filter.category !== "all" && item.classify !== filter.category) {
      return false;
    }
    return true;
  });

  const filteredTotal = filteredData.reduce((acc, curr) => acc + Number(curr.expense), 0);

  return (
    <div className='bg-[#050505] w-full min-h-screen text-slate-100 font-sans p-6 md:p-12'>
      
      {/* Header Section */}
      <div className='max-w-4xl mx-auto pt-20'>
        <button 
          onClick={() => navigate(-1)} 
          className='flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 group'
        >
          <FaArrowLeft className='group-hover:-translate-x-1 transition-transform' /> 
          Back to expense
        </button>

        <div className='flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12'>
          <div>
            <h1 className='text-4xl font-black tracking-tight mb-2'>Transaction History</h1>
            <p className='text-slate-500 flex items-center gap-2'>
              <FaCalendarDays className='text-blue-500' /> 
              Showing {filter.category === 'all' ? 'All' : filter.category} expenses
            </p>
          </div>
          <div className='bg-blue-600/10 border border-blue-500/20 px-6 py-4 rounded-[2rem] text-right'>
            <p className='text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1'>Filtered Total</p>
            <h2 className='text-3xl font-black text-blue-400'>₹{filteredTotal.toLocaleString()}</h2>
          </div>
        </div>

        {/* --- CATEGORY CHIPS --- */}
        <div className='mb-10'>
          <div className='flex items-center gap-3 mb-4 text-slate-400'>
            <FaFilter className='text-xs' />
            <span className='text-xs font-bold uppercase tracking-tighter'>Filter by Category</span>
          </div>
          <div className='flex gap-3 flex-wrap'>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setfilter({ category: cat })}
                className={`px-6 py-2.5 rounded-full text-sm font-medium capitalize transition-all duration-300 border ${
                  filter.category === cat 
                  ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]' 
                  : 'bg-white/5 text-slate-400 border-white/10 hover:border-white/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* --- TRANSACTION LIST --- */}
        <div className='space-y-4'>
          {filteredData.length > 0 ? (
            [...filteredData].reverse().map((item, index) => (
              <div 
                key={index} 
                className='group flex justify-between items-center bg-white/5 border border-white/5 p-6 rounded-[2.5rem] hover:bg-white/[0.08] hover:border-white/10 transition-all duration-300'
              >
                <div className='flex items-center gap-5'>
                  <div className='w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform'>
                    <span className='text-xl font-bold text-blue-400'>
                      {item.classify?.charAt(0).toUpperCase() || 'E'}
                    </span>
                  </div>
                  <div>
                    <h4 className='text-lg font-bold text-white capitalize'>{item.classify || 'Expense'}</h4>
                    <p className='text-xs text-slate-500 font-medium'>Transaction Verified</p>
                  </div>
                </div>

                <div className='text-right'>
                  <p className='text-2xl font-black text-white'>₹{Number(item.expense).toLocaleString()}</p>
                  <p className='text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1'>Settled</p>
                </div>
              </div>
            ))
          ) : (
            <div className='py-20 text-center border-2 border-dashed border-white/5 rounded-[3rem]'>
              <p className='text-slate-600 font-medium'>No transactions found in this category.</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Background Glows for Depth */}
      <div className='fixed top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] -z-10'></div>
      <div className='fixed bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/5 blur-[120px] -z-10'></div>
    </div>
  );
};

export default History;