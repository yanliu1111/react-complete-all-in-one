import { FaLaptop, FaMobileAlt, FaTabletAlt } from 'react-icons/fa'

import React from 'react'

const Header = ({title, width}) => {
  return (
    <header className='Header'>
        <h1>{title}</h1>
        {width >= 992 && <FaLaptop className='icon' />}
        {width < 992 && width >= 768 && <FaTabletAlt className='icon' />}
        {width < 768 && <FaMobileAlt className='icon' />}
    </header>
  )
}

export default Header
