import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Coordinates for Rosario, Santa Fe, Argentina
const ROSARIO_COORDS = { lat: -32.9442, lng: -60.6505 };

interface MapProps {
  className?: string;
  style?: React.CSSProperties;
}

export function Map({ className = '', style = {} }: MapProps) {
  const [isClient, setIsClient] = useState(false);
  const mapRef = useRef<L.Map | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const [defaultIcon, setDefaultIcon] = useState<L.Icon | null>(null);

  // Set client-side flag on mount
  useEffect(() => {
    setIsClient(true);
    
    // Initialize the icon on the client side
    setDefaultIcon(
      L.icon({
        iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      })
    );
  }, []);

  // Disable map interactions after mount
  useEffect(() => {
    if (isClient && mapRef.current) {
      const map = mapRef.current;
      
      // Disable interactions
      map.dragging.disable();
      map.touchZoom.disable();
      map.doubleClickZoom.disable();
      map.scrollWheelZoom.disable();
      map.boxZoom.disable();
      map.keyboard.disable();
      if ('tap' in map) (map as any).tap.disable();
      
      setMapReady(true);
    }
  }, [isClient]);

  // Don't render on server-side
  if (!isClient || !defaultIcon) {
    return <div className={`bg-gray-100 ${className}`} style={style} />;
  }

  return (
    <div className={`relative w-full h-full ${className}`} style={style}>
      <MapContainer
        center={[ROSARIO_COORDS.lat, ROSARIO_COORDS.lng]}
        zoom={14}
        style={{
          height: '100%',
          width: '100%',
          zIndex: 0,
        }}
        zoomControl={false}
        className="select-none"
        ref={(map) => {
          if (map) {
            mapRef.current = map;
          }
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker 
          position={[ROSARIO_COORDS.lat, ROSARIO_COORDS.lng]} 
          icon={defaultIcon} 
        />
      </MapContainer>
      {mapReady && (
        <>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-4 h-4 bg-red-600 rounded-full border-2 border-white shadow-lg"></div>
          </div>
          <div className="absolute inset-0 border-2 border-amber-500 pointer-events-none"></div>
        </>
      )}
    </div>
  );
}