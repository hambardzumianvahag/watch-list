import { CircularProgress, Rating } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const FilmDetails = () => {
  const { imdbID } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inWatchList, setInWatchList] = useState(false);
  const [inViewedList, setInViewedList] = useState(false);
  const [rating, setRating] = useState(null);

  useEffect(() => {
    const savedRating = localStorage.getItem(`rating-${imdbID}`);
    if (savedRating) {
      setRating(Number(savedRating));
    }

    const viewedList = JSON.parse(localStorage.getItem('viewedList')) || [];
    setInViewedList(viewedList.includes(imdbID));
  }, [imdbID]);

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
    localStorage.setItem(`rating-${imdbID}`, newValue);
  };

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=186be766`);
        const data = await response.json();

        if (data.Response === 'True') {
          setMovie(data);
        } else {
          setError(data.Error);
        }
      } catch (err) {
        setError('Failed to fetch movie details');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [imdbID]);

  useEffect(() => {
    const watchList = JSON.parse(localStorage.getItem('watchList')) || [];
    const viewedList = JSON.parse(localStorage.getItem('viewedList')) || [];

    setInWatchList(watchList.includes(imdbID));
    setInViewedList(viewedList.includes(imdbID));
  }, [imdbID]);

  const handleAddToWatchList = () => {
    const watchList = JSON.parse(localStorage.getItem('watchList')) || [];

    if (watchList.includes(imdbID)) {
      const updatedWatchList = watchList.filter((id) => id !== imdbID);
      localStorage.setItem('watchList', JSON.stringify(updatedWatchList));
      setInWatchList(false);
    } else {
      watchList.push(imdbID);
      localStorage.setItem('watchList', JSON.stringify(watchList));
      setInWatchList(true);
    }
  };

  const handleAddToViewedList = () => {
    const viewedList = JSON.parse(localStorage.getItem('viewedList')) || [];

    if (viewedList.includes(imdbID)) {
      const updatedViewedList = viewedList.filter((id) => id !== imdbID);
      localStorage.setItem('viewedList', JSON.stringify(updatedViewedList));
      setInViewedList(false);
    } else {
      viewedList.push(imdbID);
      localStorage.setItem('viewedList', JSON.stringify(viewedList));
      setInViewedList(true);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center py-4"><CircularProgress /></div>
  }

  if (error) {
    return <p className="text-center mt-8 text-red-600">Error: {error}</p>;
  }

  function convertRuntime(runtime) {
    const minutes = parseInt(runtime.replace('m', '').trim(), 10);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  }

  return (
      <div className="max-w-4xl mx-auto p-6 mt-8 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
        {movie && (
            <div>
              <div>
                <h2 className="text-3xl font-bold mb-1">{movie.Title}</h2>
                <div className="flex gap-4 text-gray-600 dark:text-gray-400">
                  <span>{movie.Year}</span>
                  <span>{convertRuntime(movie.Runtime)}</span>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 mt-6">
                <img
                    src={movie.Poster}
                    alt={movie.Title}
                    className="w-full max-w-xs mx-auto md:mx-0 md:w-auto rounded-lg"
                />
                <div className="flex flex-col justify-start">
                  <p className="mb-2 text-gray-800 dark:text-gray-100">
                    <strong>Genre: </strong>{movie.Genre}
                  </p>
                  <p className="mb-2 text-gray-800 dark:text-gray-100">{movie.Plot}</p>
                  <p className="mb-1 text-gray-800 dark:text-gray-100">
                    <strong>Director: </strong>{movie.Director}
                  </p>
                  <p className="mb-1 text-gray-800 dark:text-gray-100">
                    <strong>Writer: </strong>{movie.Writer}
                  </p>
                  <p className="mb-1 text-gray-800 dark:text-gray-100">
                    <strong>Stars: </strong>{movie.Actors}
                  </p>
                  <div className="flex items-center gap-2 mt-4">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">IMDB Rating:</h3>
                    <Rating
                        value={Number(movie.imdbRating)}
                        readOnly
                        max={10}
                        precision={0.1}
                        size="large"
                    />
                    <span className="text-gray-800 dark:text-gray-100">
                  {movie.imdbRating}/10
                </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button
                    className={`px-6 py-3 rounded-xl text-white font-semibold
                ${inWatchList ? 'bg-red-500 hover:bg-red-600' : 'bg-yellow-600 hover:bg-yellow-700'}
                disabled:opacity-50 disabled:cursor-not-allowed`}
                    onClick={handleAddToWatchList}
                    disabled={inViewedList}
                >
                  {inWatchList ? 'Remove from Watch List' : 'Add to Watch List'}
                </button>

                <button
                    className={`px-6 py-3 rounded-xl text-white font-semibold
                ${inViewedList ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-700 hover:bg-blue-800'}
                disabled:opacity-50 disabled:cursor-not-allowed`}
                    onClick={handleAddToViewedList}
                    disabled={inWatchList}
                >
                  {inViewedList ? 'Remove from Viewed List' : 'Add to Viewed List'}
                </button>
              </div>

              {inViewedList && (
                  <div className="mt-8">
                    <p className="mb-2 text-gray-800 dark:text-gray-100">Rate this Movie:</p>
                    <Rating
                        name="simple-controlled"
                        value={rating}
                        max={10}
                        onChange={handleRatingChange}
                        size="large"
                    />
                  </div>
              )}
            </div>
        )}
      </div>
  );
};

export default FilmDetails;