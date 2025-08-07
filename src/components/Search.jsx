import React, { useContext, useState } from 'react';
import searchIcon from '../assets/search-icon.svg';
import { CryptoContext } from '../context/CryptoContext';
import { debounce } from 'lodash';

const SearchInput = ({ handleSearch }) => {
    const [searchText, setSearchText] = useState('');
    const { searchData, setCoinSearch, setSearchData } = useContext(CryptoContext);

    const handleInput = (e) => {
        const query = e.target.value;
        setSearchText(query);
        handleSearch(query);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSearch(searchText);
    };

    const selectCoin = (coin) => {
        setCoinSearch(coin);
        setSearchText('');
        setSearchData([]);
    };

    return (
        <div className="relative w-full">
            <form
                onSubmit={handleSubmit}
                className="flex items-center relative"
            >
                <input
                    type="text"
                    value={searchText}
                    onChange={handleInput}
                    name="search"
                    placeholder="Search Crypto"
                    className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder:text-gray-400 border border-transparent focus:outline-none focus:border-cyan-400 transition duration-200"
                />
                <button type="submit" className="absolute right-3">
                    <img src={searchIcon} alt="Search" className="w-5 h-5 opacity-80 hover:opacity-100 transition" />
                </button>
            </form>

            {searchText.length > 0 && (
                <ul className="absolute z-50 mt-2 w-full max-h-80 overflow-y-auto rounded-lg bg-white/10 backdrop-blur border border-white/20 text-white shadow-lg">
                    {searchData && searchData.length > 0 ? (
                        searchData.map((coin) => (
                            <li
                                key={coin.id}
                                onClick={() => selectCoin(coin.id)}
                                className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-white/20 transition"
                            >
                                <img src={coin.thumb} alt={coin.name} className="w-5 h-5" />
                                <span>{coin.name}</span>
                            </li>
                        ))
                    ) : (
                        <div className="flex items-center justify-center py-4">
                            <div
                                className="w-5 h-5 border-4 border-cyan-300 rounded-full border-b-transparent animate-spin"
                                role="status"
                            />
                            <span className="ml-2 text-sm text-gray-300">Searching...</span>
                        </div>
                    )}
                </ul>
            )}
        </div>
    );
};

const Search = () => {
    const { getSearchResult } = useContext(CryptoContext);

    const debounceFunction = debounce((val) => {
        getSearchResult(val);
    }, 800);

    return (
        <div className="w-full max-w-md px-4">
            <SearchInput handleSearch={debounceFunction} />
        </div>
    );
};

export default Search;
