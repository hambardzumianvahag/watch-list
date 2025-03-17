import { useState, useEffect } from 'react';
import useDebounce from '../../hooks/useDebounce';
import { useNavigate } from 'react-router';
import { CircularProgress } from '@mui/material';

export default function SearchResult({ searchVal, setSearchVal }) {
  const navigate = useNavigate(); 
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const debouncedSearchVal = useDebounce(searchVal, 1000);

  function getData() {
    setLoading(true);
    setError(null);
    fetch(`https://www.omdbapi.com/?s=${debouncedSearchVal}&apikey=186be766`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then((item) => {
        setData(item.Search || []); 
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    if (debouncedSearchVal) {
      getData();
    } else {
      setData([]); 
    }
  }, [debouncedSearchVal]);

  function getId(id){
    navigate(`/${id}`);
    setSearchVal('')
  }

  return (
    <div>
      {loading && <CircularProgress />}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <div>
        {data.map((item, index) => item.Poster !== 'N/A' && (
          <div onClick={()=>getId(item.imdbID)} key={index} className='flex dark:bg-gray-500 bg-gray-100 shadow-lg hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer'>
              <div className='p-2'>
                <img src={item.Poster} width='48' height='71' className='min-w-[48px] h-[71px]'  alt={item.Title} />
              </div>
              <div className='p-2'>
                <h3>{item.Title}</h3>
                <p>{item.Year}</p>
                <p>{item.Actors}</p>
              </div>
          </div>
        ))}
      </div>
    </div>
  );
}
