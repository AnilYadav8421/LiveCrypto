# Crypto Screener

A responsive web application for tracking and analyzing cryptocurrency data in real time. The project is built with **React.js** and **Tailwind CSS**, integrates the **CoinGecko API**, and demonstrates modern frontend practices such as **Context API state management** and **React Router navigation**.

## Features

* Real-time cryptocurrency data using the CoinGecko API
* Search, sort, and filter functionality for efficient exploration
* Currency conversion support
* Data visualization with Recharts
* Global state management with Context API
* Multi-page navigation with React Router
* Responsive design optimized for desktop and mobile devices

## Tech Stack

* **Frontend:** React.js, Tailwind CSS
* **State Management:** Context API
* **Routing:** React Router
* **Data Visualization:** Recharts
* **API:** CoinGecko

## Getting Started

Clone the repository:

```bash
git clone https://github.com/AnilYadav8421/crypto-screener.git
cd crypto-screener
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm start
```

The application will be available at `http://localhost:3000/`.

## Project Structure

```
src/
│── components/     # Reusable UI components  
│── context/        # Context API setup for global state  
│── pages/          # Application views (Home, Details, etc.)  
│── assets/         # Static assets (images, icons)  
│── App.js          # Main application component  
│── index.js        # Entry point  
```

## Future Enhancements

* User authentication and personalized watchlists
* Historical price charts with advanced filtering
* Notification system for price alerts

## Acknowledgements

* [CoinGecko API](https://www.coingecko.com/en/api) for market data
* [Recharts](https://recharts.org/) for charting
