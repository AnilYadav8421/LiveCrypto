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

        // Fetch trending coins
        const trendingRes = await axios.get('https://api.coingecko.com/api/v3/search/trending');
        const topCoins = trendingRes.data.coins.slice(0, 10);
        setTrending(topCoins);

        // Get IDs of trending coins
        const coinIds = topCoins.map(c => c.item.id).join(',');

        // Fetch prices for trending coins
        const pricesRes = await axios.get(
          `https://api.coingecko.com/api/v3/simple/price`,
          { params: { ids: coinIds, vs_currencies: 'usd' } }
        );
        setPrices(pricesRes.data);

      } catch (e) {
        setError('Failed to load trending coins or prices');
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingAndPrices();
  }, []);

  if (loading) return <p className="text-center text-white mt-8">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-8">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto mt-8 px-4">
      <h2 className="text-3xl font-bold mb-6 text-white">Top 10 Trending Coins</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {trending.map(({ item }) => {
          const price = prices[item.id]?.usd;
          return (
            <div
              key={item.id}
              onClick={() => navigate(`/crypto/${item.id}`)}
              className="bg-gray-800 rounded-lg shadow-md p-4 cursor-pointer hover:shadow-xl transition-shadow duration-300 flex items-center gap-6"
            >
              <img
                src={item.large || item.small}
                alt={item.name}
                className="w-20 h-20 object-contain"
              />
              <div className="flex flex-col justify-center text-white">
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p className="uppercase text-gray-400">{item.symbol}</p>
                <p className="mt-1 text-gray-300">
                  Market Cap Rank: {item.market_cap_rank || 'N/A'}
                </p>
                <p className="mt-1 text-green-400 font-semibold">
                  {price ? `$${price.toLocaleString()}` : 'Price N/A'}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Trending;
