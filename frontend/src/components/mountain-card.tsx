import React, { useState } from 'react';
import './styles/MountainCard.css';
import MountainDetailsModal from './mountain-details-modal'; // Make sure this path is correct
import { Mountain } from '../types'; // Update the path as needed

interface MountainCardProps {
  mountain: Mountain; // Assuming you've changed this from Mountain to ResortApiData for more detail
}

const MountainCard: React.FC<MountainCardProps> = ({ mountain }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getLiftsOpenColor = (liftsOpen: number) => {
    if (liftsOpen < 3) return 'red';
    if (liftsOpen >= 3 && liftsOpen <= 8) return 'orange';
    return 'green';
  };

  // Function to toggle the modal's visibility
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <div className="mountain-card" onClick={toggleModal}>
        <h2 className="mountain-name">{mountain.name}</h2>
        <p className="mountain-info">{mountain.region}, {mountain.country}</p>
        <p className="mountain-lifts" style={{ color: getLiftsOpenColor(mountain.lifts.stats.open) }}>
          {mountain.lifts.stats.open} lifts open
        </p>
      </div>
      {isModalOpen && (
        <MountainDetailsModal
          resort={mountain}
          onClose={toggleModal}
        />
      )}
    </>
  );
};

export default MountainCard;