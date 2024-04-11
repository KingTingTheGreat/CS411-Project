import React, { useState } from 'react';

// If you have defined types for your mountains or coordinates, import them
// import { Coordinate, Mountain } from './types';

const MountainsNearMeContent: React.FC = () => {
  const [address, setAddress] = useState<string>('');

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };

  const searchMountains = () => {
    // Example endpoint - replace with your actual endpoint
    const url = `http://localhost:6969/getCoordinates?address=${encodeURIComponent(address)}`;
    
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Coordinates:', data);
        // Now you can use these coordinates to fetch the nearby mountains
        // fetchMountains(data.lat, data.lng); // You might have a function like this
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
      />
      <button onClick={searchMountains}>Search</button>
    </div>
  );
};

export default MountainsNearMeContent;

