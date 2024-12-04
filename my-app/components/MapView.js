import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const MapView = ({ projects }) => {
  return (
    <MapContainer
      center={[20, 78]}
      zoom={5}
      style={{ height: '400px', width: '100%', margin: '20px 0' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {projects.map((project, idx) => (
        <Marker
          key={idx}
          position={[
            project.coordinates.latitude || 0,
            project.coordinates.longitude || 0,
          ]}
        >
          <Popup>
            <h2 style={{ fontSize: '16px' }}>{project.name}</h2>
            <p style={{ margin: '5px 0' }}>{project.priceRange}</p>
            <p style={{ margin: '5px 0' }}>{project.builder}</p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};