import { useEffect, useState } from 'react';
import './App.css'
import { Route, Router, Routes } from 'react-router';
import Layout from './components/Layout';
import FilmDetails from './components/FilmDetails';
import Main from './components/Main';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });


  const toggleTheme = () => {
    setIsDarkMode(prevMode => {
      const newMode = !prevMode;
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      return newMode;
    });
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <Routes>
    <Route path="/" element={<Layout isDarkMode={isDarkMode} toggleTheme={toggleTheme} />}>
      <Route index element={<Main isDarkMode={isDarkMode} />} />
      <Route path=":imdbID" element={<FilmDetails />} />
    </Route>
  </Routes>
  )
}

