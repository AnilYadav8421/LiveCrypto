import React, { useContext } from 'react';
import { CryptoContext } from '../context/CryptoContext';
import star from '../assets/star.svg';
import Pagination from './Pagination';
import { useNavigate } from 'react-router-dom';

const TableComponents = () => {
  const { cryptoData, currency } = useContext(CryptoContext);
  const navigate = useNavigate();

  if (!cryptoData || cryptoData.length === 0) {
    return <p className="text-white text-center mt-10">No crypto data available</p>;
  }

  return (
    <>
      <div className="w-full mt-9 rounded-xl border border-white/10 bg-white/5 overflow-x-auto shadow-md">
        <div className="min-w-[700px]">
          <table className="w-full text-left">
            <thead className="text-sm text-gray-300 uppercase tracking-wide border-b border-white/10 bg-white/10">
              <tr>
                <th className="py-3 px-4">Assets</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Volume</th>
                <th className="py-3 px-4">Market Cap Change</th>
                <th className="py-3 px-4">24H Change</th>
              </tr>
            </thead>
            <tbody>
              {cryptoData.map((data) => (
                <tr
                  key={data.id}
                  className="text-sm text-white hover:bg-white/10 transition cursor-pointer border-b border-white/5 last:border-b-0"
                  onClick={() => navigate(`/crypto/${data.id}`)}
                >
                  <td className="py-3 px-4 flex items-center gap-2">
                    <button
                      className="bg-transparent border-none outline-none p-0 hover:opacity-80"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <img
                        src={star}
                        alt="Save"
                        className="w-5 h-5 hover:scale-110 transition-transform"
                      />
                    </button>
                    <img
                      src={data.image}
                      alt={data.name}
                      className="w-6 h-6 sm:w-8 sm:h-8"
                    />
                  </td>
                  <td className="py-3 px-4">{data.name}</td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    {new Intl.NumberFormat('en-IN', {
                      style: 'currency',
                      currency: currency,
                    }).format(data.current_price || 0)}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    {data.total_volume?.toLocaleString() || 'N/A'}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    {typeof data.market_cap_change_percentage_24h === 'number'
                      ? `${data.market_cap_change_percentage_24h.toFixed(2)}%`
                      : 'No Data'}
                  </td>

                  <td className="py-3 px-4">
                    {typeof data.price_change_percentage_24h === 'number' ? (
                      <span
                        className={`font-medium ${data.price_change_percentage_24h > 0
                          ? 'text-green-400'
                          : 'text-red-400'
                          }`}
                      >
                        {data.price_change_percentage_24h.toFixed(2)}%
                      </span>
                    ) : (
                      'No Data'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 🔻 Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-3 sm:gap-0 text-sm sm:text-base text-gray-300">
        <span>
          Data provided by{' '}
          <a
            href="https://www.coingecko.com"
            target="_blank"
            rel="noreferrer"
            className="text-cyan-300 hover:underline"
          >
            CoinGecko
          </a>
        </span>
        <Pagination />
      </div>
    </>
  );
};

export default TableComponents;
