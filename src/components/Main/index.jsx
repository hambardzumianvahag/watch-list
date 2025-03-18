import React, { useState, useEffect } from 'react';
import TabHeader from '../TabHeader';
import MainContent from '../MainContent';

export default function Main({ isDarkMode }) {
  const [value, setValue] = useState(0);
  const [watchList, setWatchList] = useState([]);
  const [viewedList, setViewedList] = useState([]);
  const [watchHeader, setWatchHeader] = useState('');
  const [viewedHeader, setViewedHeader] = useState('');
  const [watchListDetails, setWatchListDetails] = useState([]);
  const [viewedListDetails, setViewedListDetails] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const storedWatchList = JSON.parse(localStorage.getItem('watchList'));
    const storedViewedList = JSON.parse(localStorage.getItem('viewedList'));

    if (storedWatchList && storedWatchList.length > 0) {
      setWatchList(storedWatchList);
      setWatchHeader('Your Watch List!');
    } else {
      setWatchList([]);
      setWatchHeader('Your Watch List is empty!');
      setRecommendedHeader('Recommended Movies!');
    }

    if (storedViewedList && storedViewedList.length > 0) {
      setViewedList(storedViewedList);
      setViewedHeader('Your Viewed List!');
    } else {
      setViewedList([]);
      setViewedHeader('Your Viewed List is empty!');
      setRecommendedHeader('Recommended Movies!');
    }
  }, []);


  useEffect(() => {
    const fetchFilmDetails = async (ids) => {
      const fetchedData = [];
      for (const id of ids) {
        const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=186be766`);
        const data = await response.json();
        if (data.Response === "True") {
          fetchedData.push(data);
        }
      }
      return fetchedData;
    };

    if (watchList.length > 0) {
      fetchFilmDetails(watchList).then((fetchedData) => {
        setWatchListDetails(fetchedData);
      });
    }

    if (viewedList.length > 0) {
      fetchFilmDetails(viewedList).then((fetchedData) => {
        setViewedListDetails(fetchedData);
      });
    }
  }, [watchList, viewedList]); 

  return (
    <>
      <TabHeader isDarkMode={isDarkMode} value={value} handleChange={handleChange} />
      <MainContent 
        watchList={watchListDetails} 
        watchHeader={watchHeader} 
        viewedList={viewedListDetails} 
        viewedHeader={viewedHeader}
        value={value} 
      />
    </>
  );
}