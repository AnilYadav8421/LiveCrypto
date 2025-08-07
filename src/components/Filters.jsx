import React, { useContext, useRef } from 'react';
import Search from './Search';
import submitBtn from '../assets/submit-icon.svg';
import selectBtn from '../assets/select-icon.svg';
import { CryptoContext } from '../context/CryptoContext';

const Filters = () => {
  const { setCurrency, setSortBy } = useContext(CryptoContext);
  const currencyRef = useRef(null);

  const handleCurrencySubmit = (e) => {
    e.preventDefault();
    const val = currencyRef.current.value.trim().toLowerCase();
    if (val) {
      setCurrency(val);
      currencyRef.current.value = '';
    }
  };

  const handleSort = (e) => {
    e.preventDefault();
    const val = e.target.value;
    setSortBy(val);
  };

  return (
    <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-md flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      {/* 🔍 Search */}
      <div className="w-full md:w-1/2">
        <Search />
      </div>

      {/* ⚙️ Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6 text-white">
        {/* Currency Input */}
        <form
          className="flex items-center gap-2"
          onSubmit={handleCurrencySubmit}
        >
          <label htmlFor="currency" className="font-semibold text-sm">Currency</label>
          <input
            ref={currencyRef}
            name="currency"
            placeholder="e.g. inr"
            className="w-20 rounded-lg bg-gray-800 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-400 border border-transparent transition"
          />
          <button type="submit">
            <img src={submitBtn} alt="submit" className="w-5 h-5 opacity-80 hover:opacity-100 transition" />
          </button>
        </form>

        {/* Sort Dropdown */}
        <label className="flex items-center gap-2 relative">
          <span className="font-semibold text-sm">Sort by:</span>
          <select
            name="sortby"
            onChange={handleSort}
            className="w-36 sm:w-40 appearance-none rounded-lg bg-gray-800 text-sm px-2 py-1 pr-8 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition"
          >
            <option value="market_cap_desc">Market Cap ↓</option>
            <option value="market_cap_asc">Market Cap ↑</option>
            <option value="volume_desc">Volume ↓</option>
            <option value="volume_asc">Volume ↑</option>
            <option value="id_desc">ID ↓</option>
            <option value="id_asc">ID ↑</option>
            {/* <option value="gecko_desc">Gecko ↓</option> */}
            {/* <option value="gecko_asc">Gecko ↑</option> */}
          </select>
          <img
            src={selectBtn}
            alt="dropdown"
            className="w-4 h-4 absolute right-3 pointer-events-none"
          />
        </label>
      </div>
    </div>
  );
};

export default Filters;
