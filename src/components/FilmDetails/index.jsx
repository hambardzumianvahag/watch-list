import { Rating } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const FilmDetail = () => {
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

        if (data.Response === "True") {
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
      const updatedWatchList = watchList.filter(id => id !== imdbID);
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
      const updatedViewedList = viewedList.filter(id => id !== imdbID);
      localStorage.setItem('viewedList', JSON.stringify(updatedViewedList));
      setInViewedList(false);
    } else {
      viewedList.push(imdbID);
      localStorage.setItem('viewedList', JSON.stringify(viewedList));
      setInViewedList(true);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>Error: {error}</p>;
  }

  function convertRuntime(runtime) {
    const minutes = parseInt(runtime.replace('m', '').trim(), 10);
  
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
  
    return `${hours}h ${remainingMinutes}m`;
  }

  return (
    <div>
      {movie && (
        <div>
          <div>
            <h2 className='text-3xl font-bold'>{movie.Title}</h2>
          </div>
          <div className='flex gap-2 text-gray-400'>
            <span>{movie.Year}</span>
            <span>{convertRuntime(movie.Runtime)}</span>
          </div>
          <div className='flex'>
            <div>
               <img src={movie.Poster} alt={movie.Title} />
            </div>
            <div>
              <p>{movie.Genre}</p>
              <p>{movie.Plot}</p>
              <p>Director: {movie.Director}</p>
              <p>Writer: {movie.Writer}</p>
              <p>Stars: {movie.Actors}</p>
            </div>
          </div>
          <div className="flex gap-4 py-4">
            <button 
              className='flex bg-yellow-600 p-4 rounded-xl text-white'
              onClick={handleAddToWatchList} 
              disabled={inViewedList}
            >
              {inWatchList ? 'Remove from Watch List' : 'Add to Watch List'}
            </button>

            <button 
              className='flex bg-blue-700 p-4 rounded-xl text-white'
              onClick={handleAddToViewedList} 
              disabled={inWatchList}
            >
              {inViewedList ? 'Remove from Viewed List' : 'Add to Viewed List'}
            </button>
          </div>
        </div>
      )}
      {inViewedList && (
        <div>
          <p>Rate this Movie:</p>
          <Rating
            name="simple-controlled"
            value={rating}
            max={10}
            onChange={handleRatingChange}
          />
        </div>
      )}
    </div>
  );
};

export default FilmDetail;
