"use client";

import { useEffect, useRef } from "react";

// Paradas de la ruta
const STOPS = [
  {
    pos: [38.1056, -0.7875] as [number, number],
    label: "Almoradí",
    type: "start",
  },
  {
    pos: [39.4333, -0.4614] as [number, number],
    label: "SC Torrent",
    type: "charger",
  },
  {
    pos: [40.0528, -0.8693] as [number, number],
    label: "Camping Javalambre",
    type: "destination",
  },
];

export default function RouteMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<unknown>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Leaflet solo funciona en el cliente
    import("leaflet").then((L) => {
      // Fix para el icono por defecto de leaflet con webpack
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const map = L.map(mapRef.current!, {
        center: [39.3, -0.95],
        zoom: 7,
        zoomControl: false,
        attributionControl: false,
      });

      mapInstanceRef.current = map;

      // Tiles oscuros estilo Tesla
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        { maxZoom: 19 }
      ).addTo(map);

      // Función para crear iconos custom SVG
      const makeIcon = (color: string, symbol: string) =>
        L.divIcon({
          html: `<div style="
            width:32px;height:32px;border-radius:50%;
            background:${color};border:2px solid #fff;
            display:flex;align-items:center;justify-content:center;
            font-size:14px;box-shadow:0 2px 8px rgba(0,0,0,0.6);
          ">${symbol}</div>`,
          className: "",
          iconSize: [32, 32],
          iconAnchor: [16, 16],
          popupAnchor: [0, -18],
        });

      const icons: Record<string, ReturnType<typeof makeIcon>> = {
        start: makeIcon("#181818", "📍"),
        charger: makeIcon("#F59E0B", "⚡"),
        destination: makeIcon("#22c55e", "⛺"),
      };

      // Añadir marcadores con popup
      STOPS.forEach(({ pos, label, type }) => {
        L.marker(pos, { icon: icons[type] })
          .addTo(map)
          .bindPopup(
            `<div style="font-family:sans-serif;font-size:13px;font-weight:600;color:#111">${label}</div>`,
            { closeButton: false }
          );
      });

      // Obtener ruta real de OSRM
      const coords = STOPS.map(({ pos }) => `${pos[1]},${pos[0]}`).join(";");
      fetch(
        `https://router.project-osrm.org/route/v1/driving/${coords}?overview=full&geometries=geojson`
      )
        .then((r) => r.json())
        .then((data) => {
          if (data.routes?.[0]) {
            const geojson = data.routes[0].geometry;
            L.geoJSON(geojson, {
              style: {
                color: "#fff",
                weight: 3,
                opacity: 0.8,
                dashArray: "6,4",
              },
            }).addTo(map);

            // Ajustar el mapa a la ruta
            const bounds = L.geoJSON(geojson).getBounds();
            map.fitBounds(bounds, { padding: [28, 28] });
          }
        })
        .catch(() => {
          // Fallback: línea directa entre paradas
          const latlngs = STOPS.map(({ pos }) => pos);
          L.polyline(latlngs, { color: "#fff", weight: 3, opacity: 0.7, dashArray: "6,4" }).addTo(map);
          map.fitBounds(L.latLngBounds(latlngs), { padding: [28, 28] });
        });
    });

    return () => {
      if (mapInstanceRef.current) {
        (mapInstanceRef.current as { remove: () => void }).remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <>
      {/* Leaflet CSS */}
      {/* eslint-disable-next-line @next/next/no-css-tags */}
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      />
      <div
        ref={mapRef}
        style={{ width: "100%", height: 210, borderRadius: 16, overflow: "hidden" }}
      />
    </>
  );
}
