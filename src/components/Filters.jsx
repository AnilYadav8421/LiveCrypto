import React, { useContext, useRef } from 'react'
import Search from './Search'
import submitBtn from '../assets/submit-icon.svg'
import { CryptoContext } from '../context/CryptoContext'

const Filters = () => {
  let {setCurrency, currency} = useContext(CryptoContext);
  const currencyRef = useRef(null);

  const handleCurrencySubmit = (e) => {
    e.preventDefault();
    let val = currencyRef.current.value;
    setCurrency(val);
    currencyRef.current.value = "";
  }
  return (
    <div className='w-full h-12 border-2 border-gray-400 rounded-lg flex items-center justify-between relative'>
        <Search/>
        <div className='flex mr-7'>
          <form className='relative flex items-center mr-12'onSubmit={handleCurrencySubmit}>
            <label htmlFor="currency" className='relative flex justify-center items-center mr-2 font-bold'>currency</label>
            <input className='w-16 rounded bg-gray-500 pl-2 required: outline-0 border border-transparent focus:border-cyan-300 leading-4' type="text" name='currency' placeholder='inr' ref={currencyRef}/>
            <button type="submit">
              <img className='w-full h-auto cursor-pointer' src={submitBtn} alt="submit" />
            </button>
          </form>
        </div>
        <div>Sorting</div>
    </div>
  )
}

export default Filters