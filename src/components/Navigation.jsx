import React from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Crypto' },
  { to: '/trending', label: 'Trending' },
  { to: '/saved', label: 'Saved' },
];

const Navigation = () => {
  return (
    <nav className="mt-24 mx-auto w-full max-w-xl px-4 py-2 flex justify-center gap-2 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 shadow-sm">
      {navItems.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex-1 text-center px-4 py-2 rounded-xl text-sm sm:text-base font-medium transition-all duration-200
            ${isActive
              ? 'bg-cyan-300 text-black shadow-md'
              : 'text-gray-300 hover:text-white hover:bg-white/10'
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
