import logo from '../../assets/imdb_icon.png'
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import SearchResult from '../SearchResult';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import CloseIcon from '@mui/icons-material/Close';

export default function Header({ toggleTheme, isDarkMode }) {
  const navigate = useNavigate();
  const [searchVal, setSearchVal] = useState('');

  const handleClearSearchVal = () => setSearchVal('');

  return (
      <header className="relative md:p-4 p-2 flex flex-col items-center">
        <div className="w-full flex justify-between items-center">
          <div className="cursor-pointer" onClick={() => navigate('/')}>
            <img src={logo} alt="Logo" width="75" />
          </div>
          <button onClick={toggleTheme} className="p-2">
            {isDarkMode ? (
                <LightModeIcon className="text-white" />
            ) : (
                <DarkModeIcon className="text-gray-700" />
            )}
          </button>
        </div>
        <div className="relative mt-[-57px] md:w-full w-1/2 max-w-md">
          <input
              type="text"
              placeholder="Search..."
              className="py-2 px-5 w-full md:text-xl text-sm border rounded-md dark:bg-gray-700"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
          />
          {searchVal && (
              <CloseIcon
                  className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                  onClick={handleClearSearchVal}
              />
          )}

          {searchVal && (
              <div className="absolute left-1/2 -translate-x-1/2 w-full mt-2 z-50">
                <SearchResult searchVal={searchVal} setSearchVal={setSearchVal} />
              </div>
          )}
        </div>
      </header>
  );
}
