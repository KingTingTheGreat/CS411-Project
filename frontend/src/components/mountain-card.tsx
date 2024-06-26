import React, { useState } from "react";
import "./styles/MountainCard.css";
import MountainDetailsModal from "./mountain-details-modal";
import { Mountain } from "../types";

const MountainCard = ({
  mountain,
  favorites,
}: {
  mountain: Mountain;
  favorites: string[];
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(
    favorites.includes(mountain.id) || favorites.includes(mountain.slug)
  );
  const token = localStorage.getItem("411ProjectToken");

  // console.log(mountain)

  const getLiftsOpenColor = (liftsOpen: number) => {
    if (liftsOpen < 3) return "red";
    if (liftsOpen >= 3 && liftsOpen <= 8) return "orange";
    return "green";
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleFavorite = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const toggleDB = () => {
    console.log("updating db");
    const formData = new FormData();
    formData.append("id", mountain.id ?? mountain.slug);
    formData.append("status", isFavorite ? "false" : "true");
    fetch("http://localhost:6969/favorite-status", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
  };

  const weatherIconUrl = mountain.weather.current.condition.icon;
  const iconName = weatherIconUrl.split("/").pop();
  const timeOfDayFolder = mountain.weather.current.is_day ? "day" : "night";
  const localIconPath = `/weather/64x64/${timeOfDayFolder}/${iconName}`;

  return (
    <>
      <div className="mountain-card" onClick={toggleModal}>
        <h2 className="mountain-name">{mountain.name}</h2>
        <p className="mountain-info">
          {mountain.name}, {mountain.region}, {mountain.country}
        </p>
        <p
          className="mountain-lifts"
          style={{ color: getLiftsOpenColor(mountain.lifts.stats.open) }}
        >
          {mountain.lifts.stats.open} lifts open
        </p>
        <div className="weather-container">
          <img
            src={localIconPath}
            alt={mountain.weather.current.condition.text}
            className="weather-icon"
          />
          <span className="temperature-text">
            {mountain.weather.current.temp_f}°F
          </span>
        </div>
        <svg
          onClick={(e) => {
            toggleFavorite(e);
            toggleDB();
          }}
          className="favorite-star"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={isFavorite ? "gold" : "none"}
          stroke="black"
          strokeWidth="2"
        >
          <polygon points="12 17.27 18.18 21 16.54 13.97 22 9.24 14.81 8.69 12 2 9.19 8.69 2 9.24 7.46 13.97 5.82 21 12 17.27" />
        </svg>
      </div>
      {isModalOpen && (
        <MountainDetailsModal
          resort={mountain}
          onClose={toggleModal}
          isFavorite={isFavorite}
          favoriteClick={(e) => {
            toggleFavorite(e);
            toggleDB();
          }}
        />
      )}
    </>
  );
};

export default MountainCard;
