import React from 'react';
import './styles/MountainCard.css'; // Assuming you have a separate CSS file for the MountainCard

interface MountainCardProps {
  mountain: {
    id: number;
    name: string;
    region: string;
    country: string;
    // ...include other properties as needed
  };
}

const MountainCard: React.FC<MountainCardProps> = ({ mountain }) => {
  return (
    <div className="mountain-card">
      <h2 className="mountain-name">{mountain.name}</h2>
      <p className="mountain-info">{mountain.name}, {mountain.region}, {mountain.country}</p>
      {/* Other details can be added here */}
    </div>
  );
};

export default MountainCard;