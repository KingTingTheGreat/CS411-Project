import React from 'react';
import { GoogleMap, Marker, LoadScriptNext } from '@react-google-maps/api';

interface MountainMapProps {
  lat: number;
  lng: number;
}

const containerStyle = {
  width: '400px',
  height: '400px'
};

const MountainMap: React.FC<MountainMapProps> = ({ lat, lng }) => {
  const center = { lat, lng };

  return (
    <LoadScriptNext
      googleMapsApiKey="AIzaSyCBdo5WKX2UEAnMwuAe2xbDUjC8TI8WQ-Y"
      libraries={['places']} 
      onLoad={() => console.log('Google Maps script loaded successfully')}
      onError={(e) => console.error('Error loading Google Maps script:', e)}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        {/* Child components, like markers */}
        <Marker position={center} />
      </GoogleMap>
    </LoadScriptNext>
  );
}

export default MountainMap;