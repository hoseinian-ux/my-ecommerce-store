'use client';

import { useEffect, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import type { Map as LeafletMap } from 'leaflet';
import type { LeafletWindow } from '@/types/leaflet';

interface MapProps {
  center: [number, number];
  zoom: number;

}

export default function Map({ center, zoom }: MapProps) {
  const mapRef = useRef<LeafletMap | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const L = await import('leaflet');

      L.Icon.Default.mergeOptions({
        iconRetinaUrl: '/leaflet/marker-icon-2x.png',
        iconUrl: '/leaflet/marker-icon.png',
        shadowUrl: '/leaflet/marker-shadow.png',
      });

      // ساخت آیکون سفارشی
      const customIcon = L.icon({
        iconUrl: '/leaflet/icons/custom-marker.png',
        iconSize: [36, 36],
        iconAnchor: [18, 36],
        popupAnchor: [0, -30],
      });

      const win = window as LeafletWindow;
      if (win.__LEAFLET_MAP__) {
        try {
          win.__LEAFLET_MAP__.remove();
        } catch {}
        delete win.__LEAFLET_MAP__;
      }

      const map = L.map('map', { center, zoom, scrollWheelZoom: false });
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);

      // اضافه کردن مارکر با آیکون سفارشی + پاپ‌آپ
      L.marker(center, { icon: customIcon })
        .addTo(map)
        .bindPopup('<b> آدرس: </b><br>تهران، خیابان کرمان ')
        .openPopup();

      mapRef.current = map;
      win.__LEAFLET_MAP__ = map;

      if (!cancelled) {
        setMapLoaded(true);
      }
    })();

    return () => {
      cancelled = true;
      if (mapRef.current) {
        try {
          mapRef.current.remove();
        } catch {}
        mapRef.current = null;
      }
      const win = window as LeafletWindow;
      if (win.__LEAFLET_MAP__) {
        try {
          win.__LEAFLET_MAP__.remove();
        } catch {}
        delete win.__LEAFLET_MAP__;
      }
    };
  }, [center, zoom]);

  return (
    <div
      id="map"
      style={{
        height: '400px',
        width: '100%',
        border: '1px solid #e6e6e6',
        borderRadius: 8,
        overflow: 'hidden',
      }}
    >
      {!mapLoaded && (
        <div style={{ padding: 12, textAlign: 'center' }}>
          در حال بارگذاری نقشه...
        </div>
      )}
    </div>
  );
}
