import React, { useState } from 'react';
import { ResortApiData } from '../types';
import './styles/MountainDetailsModal.css';
import MountainMap from './mountain-map'

interface MountainDetailsModalProps {
  resort: ResortApiData;
  onClose: () => void;
}

const MountainDetailsModal: React.FC<MountainDetailsModalProps> = ({ resort, onClose }) => {
  const [showLifts, setShowLifts] = useState(false);
  const [showConditions, setShowConditions] = useState(false);

  const toggleLifts = () => setShowLifts(!showLifts);
  const toggleConditions = () => setShowConditions(!showConditions);

  const unit = resort.units === 'metric' ? 'cm' : 'in'; // Assuming 'metric' means centimeters

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-left">
          <h2 className="modal-title">{resort.name}</h2>

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
        </div>
        <div className="map-container">
          <MountainMap lat={resort.location.latitude} lng={resort.location.longitude} />
        </div>
      </div>
    </div>
  );
};

export default MountainDetailsModal;