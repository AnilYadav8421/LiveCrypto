import React, { useContext } from 'react';
import paginationArrow from '../assets/pagination-arrow.svg';
import { CryptoContext } from '../context/CryptoContext';

const Pagination = () => {
  const { page, setPage } = useContext(CryptoContext);
  const totalPages = 250;

  const next = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const prev = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <div className="flex items-center justify-center sm:justify-end w-full">
      <ul className="flex items-center gap-2 text-sm">
        {/* Left Arrow */}
        <li>
          <button
            onClick={prev}
            disabled={page === 1}
            className={`w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition ${page === 1 ? 'opacity-30 cursor-not-allowed' : ''
              }`}
          >
            <img src={paginationArrow} alt="Previous" className="w-4 h-4 rotate-180" />
          </button>
        </li>

        {/* Page Numbers */}
        {page > 1 && (
          <li>
            <button
              onClick={prev}
              className="w-8 h-8 rounded-full bg-gray-800 text-white hover:text-cyan-300 transition"
            >
              {page - 1}
            </button>
          </li>
        )}

        <li>
          <button
            disabled
            className="w-8 h-8 rounded-full bg-cyan-300 text-gray-900 font-semibold"
          >
            {page}
          </button>
        </li>

        {page < totalPages && (
          <li>
            <button
              onClick={next}
              className="w-8 h-8 rounded-full bg-gray-800 text-white hover:text-cyan-300 transition"
            >
              {page + 1}
            </button>
          </li>
        )}

        {/* Right Arrow */}
        <li>
          <button
            onClick={next}
            disabled={page === totalPages}
            className={`w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition ${page === totalPages ? 'opacity-30 cursor-not-allowed' : ''
              }`}
          >
            <img src={paginationArrow} alt="Next" className="w-4 h-4" />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
