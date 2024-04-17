import React, { useState } from 'react';
import './styles/styles.css';

// Define a TypeScript interface for mountain data
interface Mountain {
  id: number;
  name: string;
  //elevation: number; // example property, add more based on your data needs
}

const MountainsNearMeContent: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState<string>('');
  const [radius, setRadius] = useState<number>(50); // Default radius in miles
  const [mountains, setMountains] = useState<Mountain[]>([]);

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };

  const handleRadiusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRadius(Number(event.target.value));
  };

  const fetchMountains = (lat: number, lng: number) => {
    setLoading(true);
    fetch(`http://localhost:6969/resorts?lat=${lat}&lng=${lng}&radius=${radius}`)
  .then(response => response.json())
  .then(data => {
    if (data && Array.isArray(data)) {
      console.log("Mountains data received:", data);
      setMountains(data);
      setLoading(false);
    } else {
      setMountains([]);
      setLoading(false);
    }
  })
  .catch(error => {
    console.error('Error fetching mountains:', error);
    setMountains([]); // Handle error by setting to empty array
  });
}

  const searchMountains = () => {
    fetch(`http://localhost:6969/getCoordinates?address=${encodeURIComponent(address)}`)
      .then(response => response.json())
      .then(data => {
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
      ) : mountains.length > 0 ? (
        <ul>
          {mountains.map((mountain) => (
            <li key={mountain.id}>{mountain.name}</li>
          ))}
        </ul>
      ) : (
        <p>No mountains found.</p>
      )}
    </div>
  );
      }

export default MountainsNearMeContent;