import React from 'react'
import TableComponents from '../components/TableComponents'
import Filters from '../components/Filters'

const Crypto = () => {
    return (
        <section className='w-[80%] h-full flex flex-col mt-16 mb-24 relative'>
            <Filters/>
            <TableComponents/>
        </section>
    )
}

export default Crypto