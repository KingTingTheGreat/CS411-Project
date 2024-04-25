import React from "react";
import "./styles/MountainCard.css"; // Reuse styles from MountainCard or create new ones as needed
import { MountainShort } from "../types";

// Define the MountainShort interface if it's not imported from another file

interface MountainShortCardProps {
  mountain: MountainShort;
}

const MountainShortCard: React.FC<MountainShortCardProps> = ({ mountain }) => {
  return (
    <div className="mountain-card">
      <h2 className="mountain-name">{mountain.name}</h2>
      <p className="mountain-info">
        {mountain.name}, {mountain.region}, {mountain.country}
      </p>
    </div>
  );
};

export default MountainShortCard;
