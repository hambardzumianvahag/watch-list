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

  function handleClick(id) {
    navigate(`/${id}`);
    setSearchVal('');
  }

  return (
      <div className="max-h-[400px] overflow-y-auto bg-gray-100 dark:bg-gray-700 shadow-md rounded-lg p-2">
        {loading && (
            <div className="flex items-center justify-center py-4">
              <CircularProgress />
            </div>
        )}
        {error && (
            <p className="text-red-600 text-sm mb-4 px-2">
              Error: {error}
            </p>
        )}
        {!loading && !error && debouncedSearchVal && data.length === 0 && (
            <div className="py-4 text-center text-sm text-gray-600 dark:text-gray-300">
              No results found for &quot;{debouncedSearchVal}&quot;
            </div>
        )}
        {data.map(
            (item, index) =>
                item.Poster !== 'N/A' && (
                    <div
                        key={index}
                        onClick={() => handleClick(item.imdbID)}
                        className="flex items-center p-2 rounded-md mb-2
                         hover:bg-gray-200 dark:hover:bg-gray-600
                         cursor-pointer transition-colors"
                    >
                      <div className="flex-shrink-0 mr-3">
                        <img
                            src={item.Poster}
                            width="48"
                            height="71"
                            alt={item.Title}
                            className="object-cover rounded-md min-w-[48px] h-[71px]"
                        />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                          {item.Title}
                        </h3>
                        <p className="text-xs text-gray-600 dark:text-gray-300">
                          {item.Year}
                        </p>
                      </div>
                    </div>
                )
        )}
      </div>
  );
}