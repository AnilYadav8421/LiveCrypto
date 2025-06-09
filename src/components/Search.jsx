import React, { useContext, useState } from 'react'
import serachIcon from '../assets/search-icon.svg'
import { CryptoContext } from '../context/CryptoContext';
import { debounce } from 'lodash';

const SearchInput = ({ handleSearch }) => {
    const [searchText, setSearchText] = useState("");
    let { searchData, setCoinSearch, setSearchData } = useContext(CryptoContext);

    let handleInput = (e) => {
        e.preventDefault();
        let query = e.target.value;
        setSearchText(query);
        handleSearch(query);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSearch(searchText);
    }

    const selectCoin = (coin) => {
        setCoinSearch(coin);
        setSearchText("");
        setSearchData([])
    }

    return (
        <>
            <form className='w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg relative flex items-center ml-0 sm:ml-4 ' onSubmit={handleSubmit} onChange={handleInput} value={searchText} >
                <input className='w-full rounded bg-gray-700 placeholder:text-gray-200 pl-2 required: outline-0 border-transparent border focus:border-cyan-300' type="text" name='search' placeholder='Search Crypto' />
                <button className='absolute right-1 cursor-pointer' type='submit'>
                    <img className='h-auto w-full' src={serachIcon} alt="search-icon" />
                </button>
            </form>
            {
                searchText.length > 0 ?
                    <ul className='absolute top-11 right-0 w-96 h-96 rounded overflow-x-hidden py-1 p-2 bg-gray-800 bg-opacity-50 '>
                        {
                            searchData ? searchData.map(coin => {
                                return <li className='flex items-center ml-4 my-2 cursor-pointer'
                                    key={coin.id}
                                    onClick={() => selectCoin(coin.id)}>
                                    <img className='w-[1rem] h-[1rem] mx-1.5' src={coin.thumb} alt="coin.thumb" />
                                    <span>{coin.name}</span>
                                </li>
                            }) : <div className='w-full h-full flex justify-center items-center'>
                                <div className='w-8 h-8 border-4 border-cyan-300 rounded-full border-b-gray-800 animate-spin' role='status' />
                                <span className='ml-2'>Searching...</span>
                            </div>
                        }
                    </ul> : null
            }

        </>
    )

}

const Search = () => {
  const { getSearchResult } = useContext(CryptoContext);

  const debounceFunction = debounce((val) => {
    getSearchResult(val);
  }, 800);

  return (
    <div className="relative w-full max-w-md px-4 sm:px-0">
      <SearchInput handleSearch={debounceFunction} />
    </div>
  );
};

export default Search;