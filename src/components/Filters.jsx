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
    const val = currencyRef.current.value;
    setCurrency(val);
    currencyRef.current.value = "";
  };

  const handleSort = (e) => {
    e.preventDefault();
    const val = e.target.value;
    setSortBy(val);
  };

  return (
    <div className="w-full border-2 border-gray-400 rounded-lg p-4 flex flex-col gap-4 sm:flex-col md:flex-row md:items-center md:justify-between">
      {/* Search Input */}
      <div className="w-full md:w-1/2">
        <Search />
      </div>

      {/* Currency & Sort Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 md:gap-8">
        {/* Currency Input */}
        <form
          className="flex items-center gap-2"
          onSubmit={handleCurrencySubmit}
        >
          <label htmlFor="currency" className="font-bold">Currency</label>
          <input
            className="w-20 rounded bg-gray-700 pl-2 outline-0 border border-transparent focus:border-cyan-300 leading-4"
            type="text"
            name="currency"
            placeholder="inr"
            ref={currencyRef}
          />
          <button type="submit">
            <img
              className="w-5 h-5 cursor-pointer"
              src={submitBtn}
              alt="submit"
            />
          </button>
        </form>

        {/* Sort Select */}
        <label className="flex items-center gap-2 relative">
          <span className="font-bold">Sort by:</span>
          <select
            name="sortby"
            className="w-32 sm:w-40 rounded bg-gray-700 text-base pl-2 pr-8 py-1 leading-4 focus:outline-0"
            onChange={handleSort}
          >
            <option value="market_cap_desc">Market Cap Desc</option>
            <option value="market_cap_asc">Market Cap Asc</option>
            <option value="volume_desc">Volume Desc</option>
            <option value="volume_asc">Volume Asc</option>
            <option value="id_desc">ID Desc</option>
            <option value="id_asc">ID Asc</option>
            <option value="gecko_desc">Gecko Desc</option>
            <option value="gecko_asc">Gecko Asc</option>
          </select>
          <img
            className="w-4 h-4 absolute right-2 pointer-events-none"
            src={selectBtn}
            alt="dropdown"
          />
        </label>
      </div>
    </div>
  );
};

export default Filters;
