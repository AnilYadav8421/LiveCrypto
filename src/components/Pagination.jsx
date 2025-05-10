import React, { useContext, useState } from 'react'
import paginationArrow from '../assets/pagination-arrow.svg'
import { CryptoContext } from '../context/CryptoContext';

const Pagination = () => {
  // const [currentPage, setCurrentPage] = useState(1);
  let { page, setPage } = useContext(CryptoContext);

  const totalNumber = 250;

  const next = () => {
    if (page === totalNumber) {
      return null;
    } else {
      setPage(page + 1);
    }
  }

  const prev = () => {
    if (page === 1) {
      return null;
    } else {
      setPage(page - 1);
    }
  }
  return (
    <div className='flex items-center'>
      <ul className='flex items-center justify-end text-sm'>
        <li className='flex items-center'>
          <button className='outline-0 hover:text-cyan-300 w-8' onClick={prev}>
            <img className='w-full h-auto rotate-180' src={paginationArrow} alt="left" />
          </button>
        </li>
        {/* <li><button className='outline-0 hover:text-cyan-300 rounded-full w-8 h-8 flex items-center justify-center text-lg'>...</button></li> */}
        {
          page > 1 && (
            <li>
              <button onClick={prev} className='outline-0 hover:text-cyan-300 rounded-full w-8 h-8 flex items-center justify-center bg-gray-700 mx-1.5'>{page - 1}</button>
            </li>
          )
        }

        <li><button disabled className='outline-0  rounded-full w-8 h-8 flex items-center justify-center bg-cyan-300 text-gray-800 mx-1.5'>{page}</button></li>
        <li><button onClick={next} className='outline-0 hover:text-cyan-300 rounded-full w-8 h-8 flex items-center justify-center bg-gray-700 mx-1.5'>{page + 1}</button></li>
        {/* <li><button>...</button></li> */}
        {/* <li><button onClick={() => setCurrentPage(totalNumber)} className='outline-0 hover:text-cyan-300 rounded-full w-8 h-8 flex items-center justify-center bg-gray-700 mx-1.5' >{totalNumber}</button></li> */}
        <li><button><img className='w-full h-auto' src={paginationArrow} alt="right" onClick={next} /></button></li>
      </ul>
    </div>
  )
}

export default Pagination