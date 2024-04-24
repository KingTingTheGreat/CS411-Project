import React, { useEffect, useState } from 'react';
import './styles/styles.css';
import MountainCard from './mountain-card';
import { Mountain, ResortApiData } from '../types';

const MountainsNearMeContent: React.FC = () => {
  // Add useEffect to track when the component mounts
  useEffect(() => {
    console.log('MountainsNearMeContent mounted');
  }, []);

  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState<string>('');
  const [radius, setRadius] = useState<number>(50); // Default radius in kilometers
  const [mountains, setMountains] = useState<Mountain[]>([]);

  // Track state changes
  useEffect(() => {
    // console.log('Loading state changed:', loading);
  }, [loading]);

  useEffect(() => {
    // console.log('Mountains state changed:', mountains);
  }, [mountains]);

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log('Address changed:', event.target.value);
    setAddress(event.target.value);
  };

  const handleRadiusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // console.log('Radius changed:', event.target.value);
    setRadius(Number(event.target.value));
  };

  const fetchMountains = (lat: number, lng: number) => {
    // console.log(`Inside fetchMountains with lat: ${lat}, lng: ${lng}, radius: ${radius}`);
    setLoading(true);
    fetch(`http://localhost:6969/resorts?lat=${lat}&lng=${lng}&radius=${radius}`)
      .then(response => response.json())
      .then((resorts: ResortApiData[]) => {
        // console.log('Processed data:', resorts);
        const processedData = resorts.map(resort => ({
          id: resort.slug,
          name: resort.name,
          region: resort.region,
          country: resort.country,
          href: resort.href,
          liftsOpen: resort.lifts.stats.open,
          units: resort.units,
          location: resort.location,
          lifts: resort.lifts,
          conditions: resort.conditions,
          weather: resort.weather
        }));
        // console.log('Setting mountains:', processedData);
        setMountains(processedData);
      })
      .catch(error => {
        console.error('Error fetching mountains:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const searchMountains = () => {
    // console.log('searchMountains called for address:', address);
    fetch(`http://localhost:6969/getCoordinates?address=${encodeURIComponent(address)}`)
      .then(response => response.json())
      .then(data => {
        // console.log('Coordinates received:', data);
        fetchMountains(data.latitude, data.longitude);
      })
      .catch(error => {
        console.error('Error fetching coordinates:', error);
      });
  };

  // Track render
  // console.log('MountainsNearMeContent rendering');

  return (
    <div>
      <h1>Search for a mountain below:</h1>
      <input
        type="text"
        value={address}
        onChange={handleAddressChange}
        placeholder="Enter your address"
        style={{ color: 'black' }} // Ensure text is visible
      />
      <select value={radius} onChange={handleRadiusChange} style={{ color: 'black' }}>
        <option value="50">50 kilometers</option>
        <option value="100">100 kilometers</option>
        <option value="200">200 kilometers</option>
        <option value="300">300 kilometers</option>
      </select>
      <button className="search-button" onClick={searchMountains}>Search</button>
      {loading ? (
        <div className="loader"></div>
      ) : (
        <div className="mountains-container">
          {mountains.length > 0 ? mountains.map(mountain => (
            <MountainCard key={mountain.name} mountain={mountain} />
          )) : (
            <p>No mountains found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MountainsNearMeContent;
