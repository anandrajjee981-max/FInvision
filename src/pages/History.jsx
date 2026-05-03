import React, { useContext, useState } from 'react';
import { Userdatacontext } from '../context/UserContext';
import { FaArrowLeft, FaFilter, FaCalendarDays, FaTrash } from "react-icons/fa6"; 
import { useNavigate } from 'react-router-dom';

const History = () => {
  const { stored, deleteit } = useContext(Userdatacontext);
  const navigate = useNavigate();

  const [filter, setfilter] = useState({
    category: "all",
  });

  const categories = [
    "all",
    ...new Set(
      stored
        .map(item => item.classify?.toLowerCase().trim())
        .filter(Boolean)
    )
  ];

  const filteredData = stored.filter(item => {
    const itemCat = item.classify?.toLowerCase().trim();
    if (filter.category !== "all" && itemCat !== filter.category) return false;
    return true;
  });

  const filteredTotal = filteredData.reduce((acc, curr) => acc + Number(curr.expense), 0);

  return (
    <div className='bg-[#050505] w-full min-h-screen text-slate-100 font-sans p-4 md:p-12 overflow-x-hidden'>
      
      {/* Header Section */}
      <div className='max-w-4xl mx-auto pt-10 md:pt-25'>
        <button 
          onClick={() => navigate(-1)} 
          className='flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6 md:mb-8 group'
        >
          <FaArrowLeft className='group-hover:-translate-x-1 transition-transform' /> 
          <span className='text-sm font-medium'>Back</span>
        </button>

        <div className='flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10'>
          <div>
            <h1 className='text-3xl md:text-5xl font-black tracking-tighter mb-2 bg-gradient-to-r from-white to-slate-500 bg-clip-text text-transparent'>
              History
            </h1>
            <p className='text-slate-500 flex items-center gap-2 text-xs md:text-sm'>
              <FaCalendarDays className='text-blue-500' /> 
              {filter.category === 'all' ? 'All Transactions' : filter.category}
            </p>
          </div>
          <div className='bg-blue-600/10 border border-blue-500/20 px-6 py-4 md:px-8 md:py-5 rounded-3xl md:rounded-[2.5rem] backdrop-blur-md self-start md:self-auto'>
            <p className='text-[9px] md:text-[10px] font-bold text-blue-400 uppercase tracking-[0.2em] mb-1'>Total Spent</p>
            <h2 className='text-2xl md:text-4xl font-black text-blue-400'>₹{filteredTotal.toLocaleString()}</h2>
          </div>
        </div>

        {/* --- CATEGORY CHIPS (Scrollable on Mobile) --- */}
        <div className='mb-8'>
          <div className='flex items-center gap-3 mb-4 text-slate-500'>
            <FaFilter className='text-[10px]' />
            <span className='text-[10px] font-bold uppercase tracking-widest'>Categories</span>
          </div>
          <div className='flex gap-2 overflow-x-auto pb-2 no-scrollbar md:flex-wrap'>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setfilter({ category: cat })}
                className={`px-5 py-2 rounded-full text-[11px] font-bold capitalize transition-all duration-300 border flex-shrink-0 ${
                  filter.category === cat 
                  ? 'bg-white text-black border-white shadow-lg' 
                  : 'bg-white/5 text-slate-500 border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* --- TRANSACTION LIST --- */}
        <div className='space-y-3 md:space-y-4'>
          {filteredData.length > 0 ? (
            [...filteredData].reverse().map((item) => (
              <div 
                key={item.id}
                className='group relative flex justify-between items-center bg-white/[0.03] border border-white/5 p-4 md:p-6 rounded-3xl md:rounded-[2.5rem] hover:bg-white/[0.07] transition-all duration-500 overflow-hidden'
              >
                <div className='flex items-center gap-4 md:gap-6'>
                  <div className='w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-slate-800 to-black flex items-center justify-center border border-white/10'>
                    <span className='text-lg md:text-2xl font-black text-blue-500'>
                      {item.classify?.charAt(0).toUpperCase() || 'E'}
                    </span>
                  </div>
                  <div>
                    <h4 className='text-sm md:text-xl font-bold text-white capitalize'>{item.classify || 'Expense'}</h4>
                    <p className='text-[10px] text-slate-500 font-medium'>ID: #{item.id.toString().slice(-4)}</p>
                  </div>
                </div>

                <div className='flex items-center gap-3 md:gap-6 z-10'>
                  <div className='text-right group-hover:md:-translate-x-16 transition-transform duration-500'>
                    <p className='text-lg md:text-2xl font-black text-white'>₹{Number(item.expense).toLocaleString()}</p>
                    <p className='text-[9px] font-bold text-emerald-500 uppercase tracking-widest'>Success</p>
                  </div>

                  {/* Desktop Delete (Slide out) */}
                  <button 
                    onClick={() => deleteit(item.id)}
                    className='hidden md:flex absolute right-0 top-0 bottom-0 w-20 bg-red-600 items-center justify-center translate-x-full group-hover:translate-x-0 transition-transform duration-500 shadow-[-10px_0_30px_rgba(220,38,38,0.3)]'
                  >
                    <FaTrash className='text-white text-xl' />
                  </button>

                  {/* Mobile Delete (Always visible icon) */}
                  <button 
                    onClick={() => deleteit(item.id)}
                    className='md:hidden p-3 rounded-xl bg-red-500/10 text-red-500 active:bg-red-500 active:text-white transition-all'
                  >
                    <FaTrash className='text-xs' />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className='py-20 text-center border-2 border-dashed border-white/5 rounded-[2.5rem]'>
              <p className='text-slate-600 text-xs font-bold uppercase tracking-widest'>Empty History</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Background Glows */}
      <div className='fixed top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[100px] -z-10'></div>
      <div className='fixed bottom-0 left-0 w-64 h-64 bg-indigo-600/5 blur-[100px] -z-10'></div>
    </div>
  );
};

export default History;