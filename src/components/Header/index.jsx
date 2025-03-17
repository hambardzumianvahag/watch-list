import logo from '../../assets/imdb_icon.png'
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import SearchResult from '../SearchResult';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import CloseIcon from '@mui/icons-material/Close';

export default function Header({toggleTheme, isDarkMode, }) {
  const navigate = useNavigate();
  const [searchVal, setSearchVal] = useState('');

  const handleClearSearchVal=()=>setSearchVal('');

  return (
    <header className="relative md:p-4 p-1 flex justify-between items-center">
    <div className='cursor-pointer' onClick={()=>navigate('/')}>
      <img className='cursor-pointer' src={logo} alt='Logo' width='75' />
    </div>
    <div className='relative'>
      <input
        type="text"
        placeholder='Search...'
        className="py-2 px-5 md:text-3xl text-xs border rounded-md dark:bg-gray-700"
        value={searchVal}
        onChange={(e)=>setSearchVal(e.target.value)}
      />
      {searchVal && <CloseIcon className='absolute top-1/3 right-2 cursor-pointer' onClick={handleClearSearchVal} />}
    </div>
    <div>
      <button onClick={toggleTheme} className="p-2">
        {isDarkMode ? (
          <LightModeIcon className="text-white" />
        ) : (
          <DarkModeIcon className="text-gray-700" />
        )}
      </button>
    </div>
    <div className='absolute left-[36%] top-[100px] z-50 min-w-[320px] max-w-[380px]'>
      {searchVal && <SearchResult searchVal={searchVal} setSearchVal={setSearchVal} />}
    </div>
  </header>
  )
}

