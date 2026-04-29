import React from 'react'
import { FaAmazon, FaGoogle, FaMicrosoft, FaApple, FaMeta } from "react-icons/fa6";

const Second = () => {
  return (
    <div className='bg-black w-full py-20  items-center justify-center'>
      {/* Text Content */}
      <div className=' mb-12 '>
        <h2 className='text-white text-lg font-medium uppercase tracking-widest'>
          Trusted by thousands of users
        </h2>
        <h2 className='text-gray-500 text-sm mt-2'>
          at the world's leading companies
        </h2>
      </div>

      {/* Logo Container */}
      <div className='w-full max-w-5xl flex flex-wrap  gap-12 text-gray-600'>
        <FaAmazon className="hover:text-white transition-colors duration-300 text-5xl" />
        <FaGoogle className="hover:text-white transition-colors duration-300 text-5xl" />
        <FaMicrosoft className="hover:text-white transition-colors duration-300 text-5xl" />
        <FaApple className="hover:text-white transition-colors duration-300 text-5xl" />
        <FaMeta className="hover:text-white transition-colors duration-300 text-5xl" />
      </div>
<div className='flex flex-wrap '>
<div className="left">
      <h2 className='text-white'>the strategic choice</h2>
      <h2 className='text-gray-500'>where on a mission to bring transparency</h2>
      <h2 className='text--gray-500'>to finance and show your upfront</h2>
</div>
<div className="right">
<div className='w-[200px] h-fit bg-gray-500'></div>
<div className='w-[200px] h-fit bg-gray-500'></div>
<div className='w-[200px] h-fit bg-gray-500'></div>
<div className='w-[200px]  h-fit bg-gray-500'></div>
</div>

</div>

    </div>
  )
}

export default Second