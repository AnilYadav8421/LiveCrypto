import React, { useContext } from 'react';
import { CryptoContext } from '../context/CryptoContext';
import star from '../assets/star.svg';

const TableComponents = () => {
    const { cryptoData, currency } = useContext(CryptoContext);

    if (!cryptoData || cryptoData.length === 0) {
        return <p>No crypto data available</p>;
    }

    return (
        <div className='flex flex-col mt-9 border border-gray-400 rounded'>
            <table className='w-full table-auto'>
                <thead className='capitalize text-base text-gray-100 font-medium border-b border-gray-300'>
                    <tr>
                        <th className='py-1'>Assets</th>
                        <th className='py-1'>Name</th>
                        <th className='py-1'>Price</th>
                        <th className='py-1'>Total Volume</th>
                        <th className='py-1'>Market Cap Change</th>
                        <th className="py-1">24H Change</th>
                    </tr>
                </thead>
                <tbody>
                    {cryptoData.map((data) => (
                        <tr key={data.id} className="text-center text-base border-b border-gray-300 hover:bg-gray-600 last:border-b-0">
                            <td className="py-3 flex items-center justify-evenly uppercase">
                                <button className='outline-0 border-0 bg-none cursor-pointer'>
                                    <img className='ml-1.5 w-[1.5rem] hover:bg-cyan-300 hover:rounded-2xl text-cyan-300' src={star} alt="star" />
                                </button>
                                <img src={data.image} alt={data.name} className="w-8 h-8 mx-auto" />
                            </td>
                            <td className="py-3">{data.name}</td>
                            <td className="py-3">{
                                new Intl.NumberFormat("en-IN", {
                                    style: "currency",
                                    currency: currency
                                }).format(data.current_price || 0)
                            }</td>
                            <td className="py-3">{data.total_volume?.toLocaleString() || "N/A"}</td>
                            <td className="py-3">
                                {data.market_cap_change_percentage_24h?.toFixed(2) || "No Data"}%
                            </td>
                            <td className="py-3">
                                {data.price_change_percentage_24h ? (
                                    <span
                                        className={data.price_change_percentage_24h > 0 ? "text-green-500" : "text-red-500"}
                                    >
                                        {data.price_change_percentage_24h.toFixed(2)}%
                                    </span>
                                ) : (
                                    "No Data"
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableComponents;
