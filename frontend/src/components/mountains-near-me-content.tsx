import React, { useState } from 'react';

// Define a TypeScript interface for mountain data
interface Mountain {
  id: number;
  name: string;
  //elevation: number; // example property, add more based on your data needs
}

const MountainsNearMeContent: React.FC = () => {
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
    fetch(`http://localhost:6969/resorts?lat=${lat}&lng=${lng}&radius=${radius}`)
  .then(response => response.json())
  .then(data => {
    if (data && Array.isArray(data)) {
      console.log("Mountains data received:", data);
      setMountains(data);
    } else {
      setMountains([]); // Ensure it's always an array
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
      <h1>Mountains Near Me</h1>
      <input
        type="text"
        value={address}
        onChange={handleAddressChange}
        placeholder="Enter your address"
        style={{ color: 'black' }} // Ensure text is visible
      />
      <select value={radius} onChange={handleRadiusChange}>
        <option value="50">50 miles</option>
        <option value="100">100 miles</option>
        <option value="200">200 miles</option>
        <option value="300">300 miles</option>
      </select>
      <button onClick={searchMountains}>Search</button>
      {mountains.length > 0 ? (
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
};

export default MountainsNearMeContent;