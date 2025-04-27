import { createContext, useEffect, useState } from "react";

// context object
export const CryptoContext = createContext({});

// provider Component
export const CryptoProvider = ({children}) => {
    const [cryptoData, setCryptoData] = useState([]);

    const getCryptoData = async () => {
        try {
            const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false`);
            const data = await response.json();
            
            setCryptoData(data)                     
            
        } catch (error) {
            console.log('getCryptoData : ' + error);
        }
    }
    useEffect(()=>{
        getCryptoData();
    }, []);
    return(
        <CryptoContext.Provider value={{cryptoData}}>
            {children}
        </CryptoContext.Provider>
    )
}
