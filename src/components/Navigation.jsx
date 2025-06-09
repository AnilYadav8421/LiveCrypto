import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="w-[90%] sm:w-[70%] md:w-[60%] lg:w-[40%] mt-20 flex flex-wrap justify-center gap-4 p-4 border border-cyan-300 rounded-lg bg-gray-800">
      {[
        { to: '/', label: 'Crypto' },
        { to: '/trending', label: 'Trending' },
        { to: '/saved', label: 'Saved' },
      ].map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `px-4 py-2 min-w-[100px] text-sm sm:text-base text-center rounded font-semibold transition-colors duration-200 ${
              isActive
                ? 'bg-cyan-300 text-gray-800'
                : 'bg-gray-700 text-gray-100 hover:text-cyan-300'
            }`
          }
        >
          {label}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navigation;
