import React, { useContext, useEffect, useState } from 'react';
import { FaPlus, FaReceipt, FaWallet, FaTag, FaArrowUpFromBracket, FaTrash } from "react-icons/fa6";
import Ocr from '../utils/Ocr';
import { Userdatacontext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Addexpense = () => {
  const { expense, setexpense, classify, setclassify, stored, addmanually, target, settarget } = useContext(Userdatacontext);
  const [preview, setpreview] = useState(null);
  const navigate = useNavigate();

  const calculate = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setpreview(url);
  };
  
useEffect(() => {
  return () => {
    if (preview) URL.revokeObjectURL(preview);
  };
}, [preview]);
 const total = stored.reduce((acc, curr) => {
  return acc + (Number(curr.expense) || 0);
}, 0);
  const isOverBudget = target > 0 && total > target;

  return (
    <div className='bg-[#050505] w-full min-h-screen flex justify-center p-4 md:p-10 text-slate-100 font-sans selection:bg-blue-500/30'>
      
      <div className='w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 pt-16'>
        
        {/* --- LEFT: SMART SCANNER --- */}
        <div className='lg:col-span-5'>
          <div className='sticky top-24 bg-gradient-to-b from-white/10 to-transparent backdrop-blur-2xl border border-white/10 rounded-[3rem] p-8 shadow-2xl'>
            <div className='flex items-center justify-between mb-8'>
              <h2 className='text-2xl font-bold tracking-tight flex items-center gap-3'>
                <span className='p-3 bg-blue-500/20 rounded-2xl'>
                   <FaReceipt className='text-blue-400 text-xl' />
                </span>
                Smart Scan
              </h2>
              {preview && (
                <button onClick={() => setpreview(null)} className='text-xs text-red-400 hover:underline'>Clear</button>
              )}
            </div>
            
            <label className="group relative cursor-pointer w-full aspect-[4/3] flex flex-col items-center justify-center gap-4 border-2 border-dashed border-white/10 rounded-[2.5rem] hover:border-blue-500/40 hover:bg-blue-500/5 transition-all duration-500 overflow-hidden">
              {preview ? (
                <div className='relative w-full h-full'>
                  <img src={preview} className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110' alt="preview" />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-center p-6'>
                     <p className='text-sm font-medium flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10'>
                       <FaArrowUpFromBracket /> Change Image
                     </p>
                  </div>
                </div>
              ) : (
                <div className='flex flex-col items-center text-center px-6'>
                  <div className='w-20 h-20 rounded-3xl bg-gradient-to-tr from-blue-500/20 to-indigo-500/20 flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform'>
                    <FaArrowUpFromBracket className='text-3xl text-blue-400' />
                  </div>
                  <h3 className='text-lg font-medium text-slate-200'>Drop your receipt</h3>
                  <p className='text-sm text-slate-500 mt-1'>We'll automatically extract the amount and category</p>
                </div>
              )}
              <input type="file" accept="image/*" className="hidden" onChange={calculate} />
            </label>

            <div className='mt-8'>
              <Ocr img={preview} />
            </div>
          </div>
        </div>

        {/* --- RIGHT: DASHBOARD & HISTORY --- */}
        <div className='lg:col-span-7 flex flex-col gap-6'>
          
          {/*  Target Setting Card */}
          <div className='bg-white/5 border border-white/10 p-6 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-4'>
            <div className='flex items-center gap-4'>
              <div className='p-3 bg-indigo-500/20 rounded-2xl'>
                <FaTag className='text-indigo-400' />
              </div>
              <div>
                <p className='text-[10px] font-bold text-slate-500 uppercase tracking-widest'>Daily Limit</p>
                <h4 className='text-lg font-semibold'>Budget Target</h4>
              </div>
            </div>
            <div className='relative w-full md:w-auto'>
              <span className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold'>₹</span>
              <input 
                type='number' 
                value={target} 
                onChange={(e) => settarget(Number(e.target.value))}
                placeholder="Set Target"
                className='bg-black/40 border border-white/10 rounded-2xl py-3 pl-8 pr-4 w-full md:w-40 focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold text-blue-400'
              />
            </div>
          </div>

          {/* Header Stats */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {/* Dynamic Expense Card */}
            <div className={`relative overflow-hidden p-8 rounded-[2.5rem] shadow-xl group transition-all duration-500 ${isOverBudget ? 'bg-red-600' : 'bg-blue-600'}`}>
              <div className='absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all'></div>
              <p className='text-white/70 text-sm font-medium uppercase tracking-[0.2em] mb-2'>
                {isOverBudget ? "Budget Exceeded" : "Total Expense"}
              </p>
              <h2 className='text-5xl font-black tracking-tighter flex items-center gap-1'>
                <span className='text-3xl font-light opacity-70'>₹</span>
                {total.toLocaleString()}
              </h2>
              
              {/* Mini Progress Bar */}
              {target > 0 && (
                <div className='mt-4 w-full bg-black/20 rounded-full h-1.5 overflow-hidden'>
                  <div 
                    className={`h-full transition-all duration-1000 ${isOverBudget ? 'bg-white' : 'bg-blue-300'}`}
                    style={{ width: `${Math.min((total / target) * 100, 100)}%` }}
                  ></div>
                </div>
              )}
            </div>

            {/* Manual Quick Add */}
            <div className='bg-white/5 border border-white/10 p-6 rounded-[2.5rem] flex flex-col justify-center'>
              <p className='text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1'>Quick Add</p>
              <div className='flex gap-2 mb-3'>
                <input
                  type='number'
                  placeholder="0.00"
                  value={expense}
                  onChange={(e) => setexpense(e.target.value)}
                  className='w-full bg-transparent text-2xl font-bold border-b border-white/10 focus:border-blue-500 outline-none pb-1 transition-all'
                />
              </div>
              <div className='flex gap-2'>
                <input
                  type='text'
                  placeholder="Category"
                  value={classify}
                  onChange={(e) => setclassify(e.target.value)}
                  className='w-full bg-transparent text-sm text-slate-400 border-b border-white/10 focus:border-blue-500 outline-none pb-1 transition-all'
                />
                <button
                  onClick={addmanually}
                  className='bg-white text-black p-3 rounded-2xl hover:bg-blue-400 transition-colors active:scale-90'
                >
                  <FaPlus />
                </button>
              </div>
            </div>
          </div>

          {/* Transactions List */}
          <div className='bg-[#111111] border border-white/5 rounded-[3rem] p-8 flex flex-col shadow-inner'>
            <div className='flex items-center justify-between mb-8'>
               <h3 className='text-xl font-bold flex items-center gap-3'>
                 History <span className='text-xs bg-white/10 px-2 py-1 rounded-md text-slate-400'>{stored.length}</span>
               </h3>
               <button onClick={() => navigate('/history')} className='text-sm text-blue-400 font-medium hover:text-blue-300 transition-colors'>
                 View All
               </button>
            </div>

            <div className='flex flex-col gap-4 overflow-y-hidden max-h-[450px] pr-2 custom-scrollbar'>
              {stored.length > 0 ? (
                [...stored].reverse().map((exp, i) => (
                  <div key={i} className='flex justify-between items-center bg-white/5 hover:bg-white/[0.08] p-5 rounded-[2rem] border border-white/[0.03] transition-all duration-300 transform hover:-translate-y-1'>
                    <div className='flex items-center gap-5'>
                      <div className='w-14 h-14 rounded-[1.25rem] bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center border border-white/10 shadow-lg'>
                        <span className='text-xl font-bold text-blue-400'>{exp.classify?.charAt(0).toUpperCase() || 'E'}</span>
                      </div>
                      <div>
                        <p className='font-bold text-slate-100 text-lg'>{exp.classify || 'Expense'}</p>
                        <p className='text-xs font-medium text-slate-500 uppercase tracking-widest'>Today • Recent</p>
                      </div>
                    </div>
                    <div className='text-right'>
                      <p className='font-black text-xl text-white'>₹{exp.expense}</p>
                      <p className='text-[10px] text-green-500 font-bold bg-green-500/10 px-2 py-0.5 rounded-full inline-block'>SUCCESS</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className='flex flex-col items-center justify-center py-20 opacity-20'>
                  <FaWallet className='text-6xl mb-4' />
                  <p className='text-lg font-medium'>No transactions found</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}} />
    </div>
  );
};

export default Addexpense;