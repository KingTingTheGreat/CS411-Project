import React, { useState } from 'react';
import './styles/styles.css';
import MountainCard from './mountain-card';
import { Mountain, ResortApiData } from '../types';

const MountainsNearMeContent: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState<string>('');
  const [radius, setRadius] = useState<number>(50); // Default radius in kilometers
  const [mountains, setMountains] = useState<Mountain[]>([]);

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setAddress(event.target.value);
  };

  const handleRadiusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setRadius(Number(event.target.value));
  };

  const fetchMountains = (lat: number, lng: number) => {
    setLoading(true);
    console.log(`Fetching mountains with lat: ${lat}, lng: ${lng}, radius: ${radius}`);
    fetch(`http://localhost:6969/resorts?lat=${lat}&lng=${lng}&radius=${radius}`)
        .then(response => response.json())
        .then((resorts: ResortApiData[]) => { // Expecting the response to be a direct array
            console.log('Processed data:', resorts);
            const processedData = resorts.map(resort => ({
                name: resort.name,
                region: resort.region,
                country: resort.country,
                href: resort.href,
                liftsOpen: resort.lifts.stats.open,
                // other fields as needed
            }));
            console.log('Setting mountains:', processedData);
            setMountains(processedData);
            setLoading(false);
        })
        .catch(error => {
            console.error('Error fetching mountains:', error);
            setMountains([]); // Handle error by setting to empty array
            setLoading(false);
        });
};

  const searchMountains = () => {
      console.log('Fetching coordinates for address:', address);
      fetch(`http://localhost:6969/getCoordinates?address=${encodeURIComponent(address)}`)
          .then(response => response.json())
          .then(data => {
              console.log('Coordinates received:', data);
              fetchMountains(data.latitude, data.longitude);
          })
          .catch(error => {
              console.error('Error fetching coordinates:', error);
          });
  };

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
          <button onClick={searchMountains}>Search</button>
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