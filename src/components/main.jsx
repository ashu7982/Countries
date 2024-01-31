




import React, { useState, useEffect } from 'react';
import SearchInfo from './search';

const CountryInfo = () => {
  const [countriesData, setCountriesData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        setCountriesData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const filteredCountries = searchTerm
    ? countriesData.filter(country => {
        if (country.currencies) {
          for (const currencyCode in country.currencies) {
            if (currencyCode.toUpperCase().includes(searchTerm.toUpperCase())) {
              return true;
            }
          }
        }
        return false;
      })
    : countriesData;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCountries.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => setCurrentPage(currentPage + 1);
  const prevPage = () => setCurrentPage(currentPage - 1);

  return (
    <div>
      <h1>Countries Information</h1>
      <SearchInfo onSearchChange={setSearchTerm} />
      <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {currentItems.map((country, index) => (
          <li key={index} style={{ flex: '0 0 30%', marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
            <img src={country.flags.svg} alt={`${country.name.common} flag`} style={{ width: '100%', height: 'auto' }} />
            <h2>{country.name.official}</h2>
            <p>Capital: {country.capital}</p>
            <p>Common Name: {country.name.common}</p>
          </li>
        ))}
      </ul>
      <div>
        {currentPage > 1 && (
          <button onClick={prevPage}>Previous</button>
        )}
        {currentItems.length === itemsPerPage && (
          <button onClick={nextPage}>Next</button>
        )}
      </div>
    </div>
  );
};

export default CountryInfo;
