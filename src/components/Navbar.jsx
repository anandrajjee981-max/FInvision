import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const linkStyles = ({ isActive }) =>
    `transition-all duration-300 text-sm uppercase tracking-widest ${
      isActive 
        ? 'text-indigo-400 font-bold border-b-2 border-indigo-400 pb-1' 
        : 'text-white/70 hover:text-white'
    }`;

  const mobileLinkStyles = ({ isActive }) =>
    `block px-4 py-3 rounded-lg transition-all ${
      isActive ? 'bg-indigo-600 text-white' : 'text-white/80 hover:bg-white/10'
    }`;

  return (
    <nav className="fixed top-0 left-0 z-[9999] w-full bg-black/70 backdrop-blur-md border-b border-white/10">
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-xl font-black text-white tracking-tighter">
              FIN<span className="text-indigo-500">VISION</span>
            </span>
          </div>

          {/* Desktop */}
          <div className="hidden md:flex space-x-10 items-center">
            <NavLink to="/" className={linkStyles}>Home</NavLink>
            <NavLink to="/addexpense" className={linkStyles}>Add Expense</NavLink>
            <NavLink to="/history" className={linkStyles}>History</NavLink>
            <NavLink to="/dashboard" className={linkStyles}>Dashboard</NavLink>
          </div>

          {/* Mobile Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-indigo-400 transition-colors"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 8h16M4 16h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${isOpen ? "block" : "hidden"} md:hidden absolute top-full left-0 w-full bg-zinc-900/95 backdrop-blur-2xl border-b border-white/10 shadow-2xl`}>
        <div className="px-4 pt-4 pb-6 space-y-2">
          <NavLink to="/" onClick={() => setIsOpen(false)} className={mobileLinkStyles}>Home</NavLink>
          <NavLink to="/addexpense" onClick={() => setIsOpen(false)} className={mobileLinkStyles}>Add Expense</NavLink>
          <NavLink to="/history" onClick={() => setIsOpen(false)} className={mobileLinkStyles}>History</NavLink>
          <NavLink to="/dashboard" onClick={() => setIsOpen(false)} className={mobileLinkStyles}>Dashboard</NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;