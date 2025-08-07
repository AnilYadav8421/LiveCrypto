import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const fetchData = async () => {
      try {
        const [coinRes, chartRes] = await Promise.all([
          axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}`),
          axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`, {
            params: { vs_currency: 'usd', days: 7 },
          }),
        ]);

        setCoin(coinRes.data);

        const prices = chartRes.data.prices.map(([timestamp, price]) => {
          const date = new Date(timestamp);
          return {
            date: date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
            price: price.toFixed(2),
          };
        });
        setChartData(prices);
      } catch (err) {
        setError('Failed to fetch coin details or chart data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [coinId]);

  if (loading) return <p className="mt-10 text-center text-cyan-300 text-lg">Loading...</p>;
  if (error) return <p className="mt-10 text-center text-red-400 text-lg">{error}</p>;
  if (!coin) return <p className="mt-10 text-center text-gray-300">Coin not found.</p>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 mt-8 bg-gray-900 rounded-2xl shadow-lg text-white">
      <Link to="/" className="text-cyan-300 hover:underline text-sm mb-6 inline-block">
        &larr; Back to Dashboard
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left column: Coin info */}
        <div>
          <div className="flex items-center gap-4 mb-6">
            <img src={coin.image.large} alt={coin.name} className="w-14 h-14" />
            <div>
              <h1 className="text-3xl font-bold">{coin.name}</h1>
              <p className="text-gray-400 uppercase text-sm">{coin.symbol}</p>
            </div>
          </div>

          <p className="mb-6 text-gray-300 leading-relaxed text-sm sm:text-base">
            {coin.description.en.split('. ')[0]}.
          </p>

          <ul className="space-y-3 text-sm sm:text-base">
            <li>
              <span className="text-gray-400">Price:</span>{' '}
              <span className="font-semibold">${coin.market_data.current_price.usd.toLocaleString()}</span>
            </li>
            <li>
              <span className="text-gray-400">Market Cap:</span>{' '}
              <span className="font-semibold">${coin.market_data.market_cap.usd.toLocaleString()}</span>
            </li>
            <li>
              <span className="text-gray-400">24h High / Low:</span>{' '}
              <span className="font-semibold">
                ${coin.market_data.high_24h.usd.toLocaleString()} / ${coin.market_data.low_24h.usd.toLocaleString()}
              </span>
            </li>
            <li>
              <span className="text-gray-400">Circulating Supply:</span>{' '}
              <span className="font-semibold">{coin.market_data.circulating_supply.toLocaleString()}</span>
            </li>
            <li>
              <span className="text-gray-400">Total Supply:</span>{' '}
              <span className="font-semibold">
                {coin.market_data.total_supply?.toLocaleString() || 'N/A'}
              </span>
            </li>
          </ul>
        </div>

        {/* Right column: Chart */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-cyan-300">Price (Last 7 Days)</h2>
          <div className="bg-gray-800 p-4 rounded-xl">
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="date" stroke="#bbb" />
                <YAxis
                  domain={['dataMin', 'dataMax']}
                  stroke="#bbb"
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '6px' }}
                  labelStyle={{ color: '#ccc' }}
                  formatter={(value) => [`$${value}`, 'Price']}
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#06b6d4"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoDetails;
