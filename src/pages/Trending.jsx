import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Trending = () => {
  const [trending, setTrending] = useState([]);
  const [prices, setPrices] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrendingAndPrices = async () => {
      try {
        setLoading(true);
        setError(null);

        const trendingRes = await axios.get('https://api.coingecko.com/api/v3/search/trending');
        const topCoins = trendingRes.data.coins.slice(0, 10);
        setTrending(topCoins);

        const coinIds = topCoins.map(c => c.item.id).join(',');

        const pricesRes = await axios.get(`https://api.coingecko.com/api/v3/simple/price`, {
          params: { ids: coinIds, vs_currencies: 'usd' },
        });

        setPrices(pricesRes.data);
      } catch (e) {
        setError('Failed to load trending coins or prices');
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingAndPrices();
  }, []);

  if (loading) return <p className="text-center text-cyan-300 mt-10 text-lg">Loading trending coins...</p>;
  if (error) return <p className="text-center text-red-500 mt-10 text-lg">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold text-white mb-8 border-b border-gray-700 pb-2">
        Top 10 Trending Coins
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {trending.map(({ item }) => {
          const price = prices[item.id]?.usd;

          return (
            <div
              key={item.id}
              onClick={() => navigate(`/crypto/${item.id}`)}
              className="bg-gray-900 hover:bg-gray-800 transition-colors duration-300 rounded-2xl p-5 shadow-lg hover:shadow-cyan-500/20 cursor-pointer flex flex-col items-center text-center group"
            >
              <img
                src={item.large || item.small}
                alt={item.name}
                className="w-20 h-20 mb-4 object-contain group-hover:scale-105 transition-transform duration-200"
              />
              <h3 className="text-xl font-semibold text-white mb-1">{item.name}</h3>
              <p className="uppercase text-gray-400 text-sm">{item.symbol}</p>
              <p className="text-gray-400 text-sm mt-1">
                Rank: <span className="text-white font-medium">{item.market_cap_rank || 'N/A'}</span>
              </p>
              <p className="mt-2 text-green-400 text-lg font-bold">
                {price ? `$${price.toLocaleString()}` : 'Price N/A'}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Trending;
