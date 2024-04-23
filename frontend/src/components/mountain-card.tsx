import './styles/MountainCard.css'; // Assuming you have a separate CSS file for the MountainCard
import { Mountain } from "../types"

const MountainCard = ({ mountain }: {mountain : Mountain}) => {
  return (
    <div className="mountain-card">
      <h2 className="mountain-name">{mountain.name}</h2>
      <p className="mountain-info">{mountain.name}, {mountain.region}, {mountain.country}</p>
      {/* Other details can be added here */}
    </div>
  );
};

export default MountainCard;
