import { createContext, useContext, useEffect, useState } from "react";

// context object
export const CryptoContext = createContext({});

// provider Component
export const CryptoProvider = ({children}) => {
    const [cryptoData, setCryptoData] = useState([]);
    const [searchData, setSearchData] = useState();
    const [coinSearch, setCoinSearch] = useState("");
    const [currency, setCurrency] = useState('inr');
    const [sortBy, setSortBy] = useState('market_cap_desc');
    const [page, setPage] = useState(1)

    const getCryptoData = async () => {
        try {
            const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${coinSearch}&order=${sortBy}&per_page=10&page=${page}&sparkline=false`);
            const data = await response.json();
            setCryptoData(data)                     
            
        } catch (error) {
            console.log('getCryptoData : ' + error);
        }
    }

    const getSearchResult = async (query) => {
        try {
            const response = await fetch(`https://api.coingecko.com/api/v3/search?query=${query}`)
            const data = await response.json();
            setSearchData(data.coins)
            console.log(data.coins);
            
        } catch (error) {
            console.log('getSearchResult : ' + error);
        }
    }
    useEffect(()=>{
        getCryptoData();
    }, [coinSearch, currency, sortBy, page]);
    return(
        <CryptoContext.Provider value={{cryptoData, searchData, getSearchResult, setCoinSearch, setSearchData, currency, setCurrency, sortBy, setSortBy, page, setPage}}>
            {children}
        </CryptoContext.Provider>
    )
}
