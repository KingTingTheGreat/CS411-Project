import { useState } from "react";
import "./styles/styles.css";
import { Mountain } from "../types";
import MountainCard from "./mountain-card";

/**
 * wraps the MountainCard component
 * only requires the mountain id and user's favorites
 */
const MountainCardId = ({
  id,
  favorites,
}: {
  id: string;
  favorites: string[];
}) => {
  const [mountain, setMountain] = useState<Mountain>();
  const [loading, setLoading] = useState(true);

  // fetch the mountain data
  if (loading) {
    fetch(`http://localhost:6969/resort-by-id?id=${id}`)
      .then((response) => response.json())
      .then((data) => {
        setMountain(data);
        setLoading(false);
      });
  }

  if (!mountain) {
    return <div className="loader"></div>
  }

  return <MountainCard mountain={mountain} favorites={favorites} />;
};

export default MountainCardId;
