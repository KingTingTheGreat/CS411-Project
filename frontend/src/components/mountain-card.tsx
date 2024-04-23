import React, { useState } from 'react';
import './styles/MountainCard.css';
import MountainDetailsModal from './mountain-details-modal';
import { Mountain } from '../types';

interface MountainCardProps {
  mountain: Mountain; // Use the updated Mountain interface
}

const MountainCard: React.FC<MountainCardProps> = ({ mountain }) => {
  const [expanded, setExpanded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

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
    

  const toggleFavorite = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <div>
      <div className="mountain-card" onClick={toggleExpand}>
        <h2 className="mountain-name">{mountain.name}</h2>
        <p className="mountain-info">{mountain.name}, {mountain.region}, {mountain.country}</p>
        <p className="mountain-lifts" style={{ color: getLiftsOpenColor(mountain.lifts.stats.open) }}>
          {mountain.lifts.stats.open} lifts open
        </p>
        <svg
          onClick={toggleFavorite}
          className="favorite-star"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={isFavorite ? 'yellow' : 'none'}
          stroke="black"
          strokeWidth="2"
        >
          <polygon points="12 17.27 18.18 21 16.54 13.97 22 9.24 14.81 8.69 12 2 9.19 8.69 2 9.24 7.46 13.97 5.82 21 12 17.27"/>
        </svg>
      </div>
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