import React, { useContext, useRef } from 'react'
import Search from './Search'
import submitBtn from '../assets/submit-icon.svg'
import selectBtn from '../assets/select-icon.svg'
import { CryptoContext } from '../context/CryptoContext'

const Filters = () => {
  let { setCurrency, setSortBy } = useContext(CryptoContext);
  const currencyRef = useRef(null);

  const handleCurrencySubmit = (e) => {
    e.preventDefault();
    let val = currencyRef.current.value;
    setCurrency(val);
    currencyRef.current.value = "";
  }

  const handleSort = (e) => {
    e.preventDefault();
    let val = e.target.value;
    setSortBy(val)
  }
  return (
    <div className='w-full h-12 border-2 border-gray-400 rounded-lg flex items-center justify-between relative'>
      <Search />
      <div className='flex mr-7'>
        <form className='relative flex items-center mr-12' onSubmit={handleCurrencySubmit}>
          <label htmlFor="currency" className='relative flex justify-center items-center mr-2 font-bold'>currency</label>
          <input className='w-16 rounded bg-gray-700 pl-2 required: outline-0 border border-transparent focus:border-cyan-300 leading-4' type="text" name='currency' placeholder='inr' ref={currencyRef} />
          <button type="submit">
            <img className='w-full h-auto cursor-pointer' src={submitBtn} alt="submit" />
          </button>
        </form>
        <label className='relative flex justify-center items-center'>
          <span className='font-bold mr-2'>sort by: </span>
          <select name="sortby" className='rounded bg-gray-700 text-base pl-2 pr-10 py-0.5 leading-4 focus:outline-0' onClick={handleSort} >
            <option value="market_cap_desc">market cap desc</option>
            <option value="market_cap_asc">market cap asc</option>
            <option value="volume_desc">volume desc</option>
            <option value="volume_asc">volume asc</option>
            <option value="id_desc">id desc</option>
            <option value="id_asc">id asc</option>
            <option value="gecko_desc">gecko desc</option>
            <option value="gecko_asc">gescko asc</option>
          </select>
          <img className='w-[1.1rem] absolute right-0 top-1 h-auto pointer-events-none ' src={selectBtn} alt="submit" />
        </label>
      </div>

    </div>
  )
}

export default Filters