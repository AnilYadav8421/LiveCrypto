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
    <div className="w-full mt-9 border border-gray-400 rounded overflow-x-auto">
      <div className="min-w-[700px]">
        <table className="w-full table-auto">
          <thead className="capitalize text-sm sm:text-base text-gray-100 font-medium border-b border-gray-300">
            <tr>
              <th className="py-2 px-2">Assets</th>
              <th className="py-2 px-2">Name</th>
              <th className="py-2 px-2">Price</th>
              <th className="py-2 px-2">Total Volume</th>
              <th className="py-2 px-2">Market Cap Change</th>
              <th className="py-2 px-2">24H Change</th>
            </tr>
          </thead>
          <tbody>
            {cryptoData.map((data) => (
              <tr
                key={data.id}
                className="text-center text-sm sm:text-base border-b border-gray-300 hover:bg-gray-800 last:border-b-0 cursor-pointer"
                onClick={() => navigate(`/crypto/${data.id}`)}
              >
                <td className="py-3 px-2 flex items-center justify-evenly uppercase">
                  <button className="outline-0 border-0 bg-none cursor-pointer">
                    <img
                      className="ml-1.5 w-6 sm:w-[1.5rem] hover:bg-cyan-300 hover:rounded-2xl"
                      src={star}
                      alt="star"
                    />
                  </button>
                  <img src={data.image} alt={data.name} className="w-6 h-6 sm:w-8 sm:h-8 mx-auto" />
                </td>
                <td className="py-3 px-2">{data.name}</td>
                <td className="py-3 px-2">
                  {new Intl.NumberFormat('en-IN', {
                    style: 'currency',
                    currency: currency,
                  }).format(data.current_price || 0)}
                </td>
                <td className="py-3 px-2">{data.total_volume?.toLocaleString() || 'N/A'}</td>
                <td className="py-3 px-2">
                  {data.market_cap_change_percentage_24h?.toFixed(2) || 'No Data'}%
                </td>
                <td className="py-3 px-2">
                  {data.price_change_percentage_24h ? (
                    <span
                      className={
                        data.price_change_percentage_24h > 0
                          ? 'text-green-500'
                          : 'text-red-500'
                      }
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

    <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-3 sm:gap-0 text-sm sm:text-base text-gray-300">
      <span>
        Data provided by{' '}
        <a
          className="text-cyan-300 hover:underline"
          href="https://www.coingecko.com"
          rel="noreferrer"
          target="_blank"
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
