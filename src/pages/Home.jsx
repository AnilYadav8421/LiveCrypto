import React from 'react'
import { Outlet } from 'react-router-dom'
import Logo from '../components/Logo'
import Navigation from '../components/Navigation'

const Home = () => {
  return (
      <main className='w-full h-full flex flex-col content-center items-center relative text-white'>
        <div className='w-screen h-screen bg-gray-950 fixed -z-10' />
        <Logo />
        <Navigation />
        <Outlet />
      </main>
  )
}

export default Home