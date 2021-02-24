import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "./Map.css";
function Map({ center, zoom }) {
  return (
    <div className="map">
      <MapContainer center={center} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; Shoutout to <a href="http://osm.org/copyright">OpenStreetMap</a>'
        />
      </MapContainer>
    </div>
  );
}

export default Map;
