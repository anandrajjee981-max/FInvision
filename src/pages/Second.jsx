import React from 'react';
import { FaAmazon, FaGoogle, FaMicrosoft, FaApple, FaMeta } from "react-icons/fa6";
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Second = () => {
  const navigate = useNavigate();

  // Define icons in an array for easy duplication
  const icons = [
    <FaAmazon key="amz" />,
    <FaGoogle key="goo" />,
    <FaMicrosoft key="mic" />,
    <FaApple key="app" />,
    <FaMeta key="met" />,
  ];

  return (
    <div className='bg-black w-full py-20 px-6 flex flex-col items-center overflow-hidden'>
      {/* Text Content */}
      <div className='text-center mb-12'>
        <h2 className='text-white text-lg font-medium uppercase tracking-widest'>
          Trusted by thousands of users
        </h2>
        <p className='text-gray-500 text-sm mt-2'>
          at the world's leading companies
        </p>
      </div>

      {/* --- INFINITE SCROLL SECTION --- */}
   <div className='relative overflow-hidden w-full max-w-5xl mb-24 z-30'>
  {/* The Gradients with your requested logic */}
  <div className='absolute inset-y-0 left-0 w-20 md:w-35 bg-gradient-to-r from-black to-transparent z-40 pointer-events-none' />
  <div className='absolute inset-y-0 right-0 w-20 md:w-35 bg-gradient-to-l from-black to-transparent z-40 pointer-events-none' />

  <motion.div
    className='flex gap-16 items-center'
    animate={{ x: ['0%', '-50%'] }}
    transition={{
      ease: 'linear',
      duration: 15,
      repeat: Infinity,
    }}
    style={{ width: 'fit-content' }}
  >
    {[...icons, ...icons].map((icon, index) => (
      <div 
        key={index} 
        className="text-gray-600 hover:text-white transition-colors duration-300 text-5xl md:text-6xl flex-shrink-0"
      >
        {icon}
      </div>
    ))}
  </motion.div>
</div>
      {/* --- END SCROLL SECTION --- */}

      {/* Strategy Section */}
      <div className='flex flex-col md:flex-row justify-between w-full max-w-5xl gap-10 mb-10'>
        <div className="left flex-1">
          <h2 className='text-white text-3xl font-bold mb-4'>The strategic choice</h2>
          <p className='text-gray-500 leading-relaxed'>
            We're on a mission to bring transparency <br />
            to finance and show you everything upfront.
          </p>
        </div>

        <div className="right grid grid-cols-2 gap-4 flex-1">
          {['receipt scanner', 'track spending', 'stay on budget', 'visualize charts'].map((item) => (
            <div key={item} className='p-6 bg-zinc-900 text-gray-300 rounded-xl text-center border border-zinc-800 hover:border-zinc-600 transition-all'>
              {item}
            </div>
          ))}
        </div>
      </div>

      <button 
        onClick={() => navigate('/addexpense')}
        className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-all uppercase tracking-tight"
      >
        Get Started
      </button>
    </div>
  );
}

export default Second;