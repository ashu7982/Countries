


import React, { useState, useEffect } from 'react';

const SearchInfo = ({ onSearchChange }) => {
  const handleChange = event => {
    onSearchChange(event.target.value);
  };

  // Adding a debounce function
  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  
  const debouncedHandleChange = debounce(handleChange, 300);

  return (
    <div style={styles.container}>
      <input
        type="text"
        placeholder="Search By currency INR, EUR"
        onChange={debouncedHandleChange}
        style={styles.input}
      />
    </div>
  );
};

const styles = {
  container: {
    margin: '20px 0',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    width: '100%',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    boxSizing: 'border-box',
    outline: 'none',
    transition: 'border-color 0.3s ease-in-out',
  },
};

export default SearchInfo;
