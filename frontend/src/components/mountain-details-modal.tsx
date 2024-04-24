import React, { useState } from 'react';
import { Mountain } from '../types';
import './styles/MountainDetailsModal.css';
import MountainMap from './mountain-map'

interface MountainDetailsModalProps {
  resort: Mountain;
  onClose: () => void;
}

interface VisibleForecast {
  [key: string]: boolean; // Each key is a date string, value is visibility boolean
}

const MountainDetailsModal: React.FC<MountainDetailsModalProps> = ({ resort, onClose }) => {
  const [showLifts, setShowLifts] = useState(false);
  const [showConditions, setShowConditions] = useState(false);
  const [showWeather, setShowWeather] = useState(false);
  const [visibleForecast, setVisibleForecast] = useState<VisibleForecast>({});

  const toggleLifts = () => setShowLifts(!showLifts);
  const toggleConditions = () => setShowConditions(!showConditions);
  const toggleWeather = () => setShowWeather(!showWeather);
  const toggleForecast = (date: string) => {
    setVisibleForecast(prevState => ({
      ...prevState,
      [date]: !prevState[date]
    }));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const unit = resort.units === 'metric' ? 'cm' : 'in'; // Assuming 'metric' means centimeters

  const getIconPath = (fullUrl: string): string => {
    const parts = fullUrl.split('/');
    return '/' + parts.slice(-4).join('/');
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-left">
          <h2 className="modal-title">
            <a href={resort.href} target="_blank" rel="noopener noreferrer">
              {resort.name}
            </a>
          </h2>

          {/* Toggle button for conditions */}
          <div className="conditions-toggle" onClick={toggleConditions}>
            Conditions
            <span className={`arrow ${showConditions ? 'up' : 'down'}`}></span>
          </div>

          {/* Conditions details, shown only when showConditions is true */}
          {showConditions && (
            <div className={`conditions-list ${showConditions ? 'show' : ''}`}>
              <div className="condition-item">Base: {resort.conditions.base} {unit}</div>
              <div className="condition-item">Season: {resort.conditions.season} {unit}</div>
              <div className="condition-item">Last 12 Hours: {resort.conditions.twelve_hours} {unit}</div>
              <div className="condition-item">Last 24 Hours: {resort.conditions.twentyfour_hours} {unit}</div>
              <div className="condition-item">Last 48 Hours: {resort.conditions.fortyeight_hours} {unit}</div>
              <div className="condition-item">Last 7 Days: {resort.conditions.seven_days} {unit}</div>
            </div>
          )}

          {/* Toggle button for lifts */}
          <div className="lifts-toggle" onClick={toggleLifts}>
            Lifts
            <span className={`arrow ${showLifts ? 'up' : 'down'}`}></span>
          </div>

          {/* Lifts details, shown only when showLifts is true */}
          {showLifts && (
            <div className={`lifts-list ${showLifts ? 'show' : ''}`}>
              {Object.entries(resort.lifts.status).map(([liftName, status]) => (
              <div key={liftName} className="lift-item">
                {liftName}: <span className={status === 'open' ? 'lift-status-open' : 'lift-status-closed'}>
                  {status === 'open' ? '✔️' : '❌'}
                </span>
              </div>
            ))}
            </div>
          )}

          <button className="close-button" onClick={onClose}> X </button>
          <br/>
          <div className="weather-title" onClick={toggleWeather}>
            Weather
            <span className={`arrow ${showWeather ? 'up' : 'down'}`}></span>
          </div>
          {showWeather && (
            <div className="weather-details">
              {resort.weather.forecast.forecastday.map(day => (
                <div key={day.date}>
                  <div className="forecast-toggle" onClick={() => toggleForecast(day.date)}>
                    <strong>{formatDate(day.date)}</strong>
                    <img src={getIconPath(day.day.condition.icon)} alt={day.day.condition.text} className="weather-icon" />
                    <span className={`arrow ${visibleForecast[day.date] ? 'up' : 'down'}`}></span>
                  </div>
                  {visibleForecast[day.date] && (
                    <div className="forecast-details">
                      <div>Max Temp: {day.day.maxtemp_f} F</div>
                      <div>Min Temp: {day.day.mintemp_f} F</div>
                      <div>Wind: {day.day.maxwind_mph} mph</div>
                      <div>Precipitation: {day.day.totalprecip_in} in</div>
                      <div>Snow: {day.day.totalsnow_cm} cm</div>
                      <div>Rain Chance: {day.day.daily_chance_of_rain}%</div>
                      <div>Snow Chance: {day.day.daily_chance_of_snow}%</div>
                      <div>UV Index: {day.day.uv}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="map-container">
          <MountainMap lat={resort.location.latitude} lng={resort.location.longitude} />
        </div>
      </div>
    </div>
  );
};

export default MountainDetailsModal;
