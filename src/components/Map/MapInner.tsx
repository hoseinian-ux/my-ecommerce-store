'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';

// ایمپورت آیکون‌ها
import marker2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// ست کردن آیکون پیش‌فرض
delete (Icon.Default.prototype as unknown as { _getIconUrl: unknown })._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: marker2x.src,
  iconUrl: markerIcon.src,
  shadowUrl: markerShadow.src,
});

export default function MapInner() {
  const position: [number, number] = [35.6892, 51.3890]; // تهران

  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          اینجا تهران است 🚀
        </Popup>
      </Marker>
    </MapContainer>
  );
}
