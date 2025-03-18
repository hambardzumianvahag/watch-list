import React, { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';

export default function TabHeader({ isDarkMode, value, handleChange }) {
  
  return (
    <Box sx={{ width: '100%'}}>
      <Tabs
        value={value}
        onChange={handleChange}
        centered
        className="w-full"
        indicatorColor="transparent"
        sx={{
          '.MuiTabs-indicator': {
            backgroundColor: isDarkMode ? 'white': 'rgb(17,24,39)', 
          },
        }}
      >
        <Tab
          label="Watch List"
          sx={{
          fontSize: '18px',
            width: '200px',
            color: isDarkMode ? 'white' : 'black',
            backgroundColor: isDarkMode ? 'rgb(17, 24, 39)' : 'rgb(249, 250, 251)', 
            '&:hover': {
              backgroundColor: isDarkMode
                ? 'rgb(31, 41, 55)'
                : 'rgb(240, 240, 240)',
            },
            '&.Mui-selected': {
              color: isDarkMode ? 'white': 'rgb(17,24,39)', 
            },
            '@media (max-width: 768px)': {
              fontSize: '14px',
              width: '160px' 
            }
          }}
        />
        <Tab
          label="Viewed List"
          sx={{
            fontSize: '18px',
            width: '200px',
            color: isDarkMode ? 'white' : 'black',
            backgroundColor: isDarkMode ? 'rgb(17, 24, 39)' : 'rgb(249, 250, 251)',
            '&:hover': {
              backgroundColor: isDarkMode
                ? 'rgb(31, 41, 55)'
                : 'rgb(240, 240, 240)',
            },
            '&.Mui-selected': {
              color: isDarkMode ? 'white': 'rgb(17,24,39)', 
            },
            '@media (max-width: 768px)': {
              fontSize: '14px',
              width: '160px' 
            }
          }}
        />
      </Tabs>
    </Box>
  );
}