import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.svg'

const Logo = () => {
  return (
    <Link to='/' className='absolute top-[1.5rem] left-[1.5rem] text-xl text-cyan-300 flex items-center'>
        <img className='w-8' src={logo} alt='logo' />
        <span>LiveCrypto</span>
    </Link>
  )
}

export default Logo