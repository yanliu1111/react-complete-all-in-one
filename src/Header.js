import { FaLaptop, FaMobileAlt, FaTabletAlt } from 'react-icons/fa'

import useWindowSize from './hooks/useWindowSize'

const Header = ({title}) => {
  const { width } = useWindowSize()
  // useWindowSize is a custom hook that returns the current window size
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
