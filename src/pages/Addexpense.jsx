import React, { useState } from 'react';
import { FaImage, FaPlus, FaWallet, FaReceipt } from "react-icons/fa6";
import Ocr from '../utils/Ocr';

const Addexpense = () => {
  const [expense, setExpense] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [preview, setpreview] = useState(null);

  const calculate = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setpreview(url);
  };

  const handleAdd = () => {
    if (!expense) return;
    const newExpense = {
      id: Date.now(),
      amount: Number(expense),
      title: "Manual Entry",
      date: new Date().toLocaleDateString()
    };
    setExpenses(prev => [newExpense, ...prev]);
    setExpense("");
  };

  const total = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className='bg-[#050505] w-full min-h-screen flex items-start md:items-center justify-center p-4 md:p-8 font-sans text-slate-200 pt-45'>
      
      {/* Main Container */}
      <div className='w-full max-w-5xl flex flex-col md:flex-row gap-6 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-6 md:p-10 shadow-2xl relative overflow-hidden'>
        
        {/* Glow Effects */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-emerald-600/10 rounded-full blur-[100px] pointer-events-none"></div>

        {/* RIGHT SECTION (Ab Mobile pe ye UPAR dikhega) 
            md:order-2 ensures desktop pe ye right side hi rahe
        */}
        <div className='w-full md:w-1/2 flex flex-col items-center justify-center p-6 bg-white/5 rounded-[2rem] border border-white/10 order-1 md:order-2'>
          <label className="group cursor-pointer w-full flex flex-col items-center gap-4">
            <div className='relative'>
              <div className='w-20 h-20 md:w-28 md:h-28 rounded-3xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/20 flex items-center justify-center group-hover:scale-105 transition-transform duration-300'>
                {preview ? (
                  <img src={preview} className='w-full h-full object-cover rounded-3xl' alt="bill" />
                ) : (
                  <FaReceipt className='text-3xl md:text-4xl text-blue-400' />
                )}
              </div>
              <div className='absolute -bottom-2 -right-2 bg-blue-600 p-2 rounded-xl shadow-lg'>
                <FaImage className='text-white text-xs' />
              </div>
            </div>
            
            <div className='text-center'>
              <h2 className='text-lg font-bold text-white'>Scan Receipt</h2>
              <p className='text-xs text-slate-400 mt-1'>Upload image to auto-fill details</p>
            </div>

            <input type="file" accept="image/*" className="hidden" onChange={calculate} />
          </label>

          <div className='mt-6 w-full'>
            <Ocr img={preview} />
          </div>
        </div>

        {/* LEFT SECTION (Mobile pe niche, Desktop pe left)
            md:order-1 ensures desktop pe ye pehle rahe
        */}
        <div className='w-full md:w-1/2 flex flex-col gap-6 order-2 md:order-1'>
          <header className='hidden md:block'>
            <h1 className='text-3xl font-extrabold tracking-tight text-white'>Dash<span className='text-blue-500'>Board</span></h1>
          </header>

          {/* Stats Card */}
          <div className='bg-gradient-to-br from-blue-600 to-blue-800 p-6 rounded-[2rem] shadow-xl shadow-blue-900/20 relative overflow-hidden group'>
            <div className='relative z-10'>
              <p className='text-blue-100/80 text-xs uppercase tracking-widest font-semibold'>Total Spending</p>
              <h2 className='text-4xl font-mono font-bold text-white mt-1'>₹{total.toLocaleString()}</h2>
            </div>
            <FaWallet className='absolute right-[-10px] bottom-[-10px] text-8xl text-white/10 -rotate-12 group-hover:rotate-0 transition-transform duration-500' />
          </div>

          {/* Input Area */}
          <div className='flex flex-col gap-3'>
            <label className='text-xs font-medium text-slate-500 ml-2 uppercase'>Add Manually</label>
            <div className='flex gap-2 flex-wrap'>
              <input
                type='number'
                placeholder="0.00"
                value={expense}
                onChange={(e) => setExpense(e.target.value)}
                className='flex-1 px-5 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-xl font-mono'
              />
              <button 
                onClick={handleAdd} 
                className='bg-white text-black hover:bg-slate-200 px-6 py-4 rounded-2xl font-bold transition-all active:scale-90 flex items-center justify-center'
              >
                <FaPlus />
              </button>
            </div>
          </div>

          {/* History List */}
          <div className='flex-1'>
             <div className='flex justify-between items-center mb-4 px-2'>
                <h3 className='text-sm font-bold text-slate-300'>Recent Activity</h3>
                <span className='text-[10px] bg-white/10 px-2 py-1 rounded-md text-slate-400'>{expenses.length} Items</span>
             </div>
             
             <div className='space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar'>
                {expenses.length === 0 ? (
                  <div className='text-center py-10 border-2 border-dashed border-white/5 rounded-3xl'>
                    <p className='text-slate-600 text-sm'>No expenses tracked yet</p>
                  </div>
                ) : (
                  expenses.map(exp => (
                    <div key={exp.id} className='flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5 hover:border-white/20 transition-colors'>
                      <div className='flex items-center gap-3'>
                        <div className='w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-500'>
                          <FaPlus className='text-xs'/>
                        </div>
                        <div>
                          <p className='text-sm font-semibold text-white'>{exp.title}</p>
                          <p className='text-[10px] text-slate-500'>{exp.date}</p>
                        </div>
                      </div>
                      <span className='font-mono font-bold text-white'>₹{exp.amount}</span>
                    </div>
                  ))
                )}
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Addexpense;