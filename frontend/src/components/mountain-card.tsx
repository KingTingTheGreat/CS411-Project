import React, { useState } from 'react';
import './styles/MountainCard.css';
import { Mountain } from '../types';

interface MountainCardProps {
  mountain: Mountain; // Use the updated Mountain interface
}

const MountainCard: React.FC<MountainCardProps> = ({ mountain }) => {
  const [expanded, setExpanded] = useState(false);

  // Determine the color of the lifts open indicator
  const getLiftsOpenColor = (liftsOpen: number) => {
    if (liftsOpen < 3) return 'red';
    if (liftsOpen >= 3 && liftsOpen <= 8) return 'orange';
    return 'green';
  };

  // Toggles the expanded state
  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="mountain-card" onClick={toggleExpand}>
      <h2 className="mountain-name">{mountain.name}</h2>
      <p className="mountain-info">{mountain.name}, {mountain.region}, {mountain.country}</p>
      <p className="mountain-lifts" style={{ color: getLiftsOpenColor(mountain.liftsOpen) }}>
        {mountain.liftsOpen} lifts open
      </p>
      {expanded && (
        <div className="mountain-details">
          {/* Insert additional details here */}
          <a href={mountain.href} target="_blank" rel="noopener noreferrer">More Info</a>
        </div>
      )}
    </div>
  );
};

export default MountainCard;