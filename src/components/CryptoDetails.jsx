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

    const coinDetailsPromise = axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}`);
    const marketChartPromise = axios.get(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`,
      { params: { vs_currency: 'usd', days: 7 } }
    );

    Promise.all([coinDetailsPromise, marketChartPromise])
      .then(([coinRes, chartRes]) => {
        setCoin(coinRes.data);

        const prices = chartRes.data.prices.map(([timestamp, price]) => {
          const date = new Date(timestamp);
          return {
            date: date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
            price: price.toFixed(2),
          };
        });
        setChartData(prices);
      })
      .catch(() => {
        setError('Failed to fetch coin details or chart data.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [coinId]);

  if (loading) return <p className="mt-8 text-center text-white">Loading...</p>;
  if (error) return <p className="mt-8 text-center text-red-500">{error}</p>;
  if (!coin) return <p className="mt-8 text-center text-white">Coin not found.</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 mt-8 bg-gray-900 rounded-lg shadow-lg text-white">
      <Link to="/crypto" className="underline mb-6 inline-block">&larr; Back to List</Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left column: Coin info */}
        <div>
          <div className="flex items-center mb-6">
            <img src={coin.image.large} alt={coin.name} className="w-16 h-16 mr-6" />
            <h1 className="text-4xl font-bold">{coin.name} <span className="uppercase text-gray-400 text-2xl">({coin.symbol})</span></h1>
          </div>

          <p className="mb-6 leading-relaxed" dangerouslySetInnerHTML={{ __html: coin.description.en.split('. ')[0] + '.' }} />

          <ul className="space-y-3 text-lg">
            <li><strong>Price:</strong> ${coin.market_data.current_price.usd.toLocaleString()}</li>
            <li><strong>Market Cap:</strong> ${coin.market_data.market_cap.usd.toLocaleString()}</li>
            <li><strong>24h High / Low:</strong> ${coin.market_data.high_24h.usd.toLocaleString()} / ${coin.market_data.low_24h.usd.toLocaleString()}</li>
            <li><strong>Circulating Supply:</strong> {coin.market_data.circulating_supply.toLocaleString()}</li>
            <li><strong>Total Supply:</strong> {coin.market_data.total_supply?.toLocaleString() || 'N/A'}</li>
          </ul>
        </div>

        {/* Right column: Chart */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Price (Last 7 Days)</h2>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="date" stroke="#bbb" />
              <YAxis
                domain={['dataMin', 'dataMax']}
                stroke="#bbb"
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip formatter={(value) => [`$${value}`, 'Price']} />
              <Line type="monotone" dataKey="price" stroke="#0ff" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default CryptoDetails;
