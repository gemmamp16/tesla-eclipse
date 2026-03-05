"use client";

import { useEffect, useRef } from "react";

const STOPS = [
  { pos: [38.1056, -0.7875] as [number, number], label: "Almoradí", type: "start" },
  { pos: [39.4333, -0.4614] as [number, number], label: "SC Torrent", type: "charger" },
  { pos: [40.0528, -0.8693] as [number, number], label: "Camping Javalambre", type: "destination" },
];

export default function RouteMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<unknown>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    import("leaflet").then((L) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;

      const map = L.map(containerRef.current!, {
        center: [39.3, -0.72],
        zoom: 7,
        zoomControl: true,
        attributionControl: false,
      });
      mapRef.current = map;

      // Tiles oscuros
      L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        maxZoom: 19,
      }).addTo(map);

      const makeIcon = (bg: string, emoji: string) =>
        L.divIcon({
          html: `<div style="width:34px;height:34px;border-radius:50%;background:${bg};border:2.5px solid #fff;display:flex;align-items:center;justify-content:center;font-size:15px;box-shadow:0 2px 10px rgba(0,0,0,0.7)">${emoji}</div>`,
          className: "",
          iconSize: [34, 34],
          iconAnchor: [17, 17],
          popupAnchor: [0, -20],
        });

      const icons: Record<string, ReturnType<typeof makeIcon>> = {
        start:       makeIcon("#181818", "📍"),
        charger:     makeIcon("#F59E0B", "⚡"),
        destination: makeIcon("#22c55e", "⛺"),
      };

      STOPS.forEach(({ pos, label, type }) => {
        L.marker(pos, { icon: icons[type] })
          .addTo(map)
          .bindPopup(`<b style="font-size:13px">${label}</b>`, { closeButton: false });
      });

      // Ruta real via OSRM
      const coords = STOPS.map(({ pos }) => `${pos[1]},${pos[0]}`).join(";");
      fetch(`https://router.project-osrm.org/route/v1/driving/${coords}?overview=full&geometries=geojson`)
        .then((r) => r.json())
        .then((data) => {
          if (data.routes?.[0]) {
            const geo = data.routes[0].geometry;
            L.geoJSON(geo, { style: { color: "#fff", weight: 3, opacity: 0.85, dashArray: "8,5" } }).addTo(map);
            map.fitBounds(L.geoJSON(geo).getBounds(), { padding: [30, 30] });
          }
        })
        .catch(() => {
          const lls = STOPS.map(({ pos }) => pos as [number, number]);
          L.polyline(lls, { color: "#fff", weight: 3, opacity: 0.7, dashArray: "8,5" }).addTo(map);
          map.fitBounds(L.latLngBounds(lls), { padding: [30, 30] });
        });
    });

    return () => {
      if (mapRef.current) {
        (mapRef.current as { remove: () => void }).remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: 210, borderRadius: 16, overflow: "hidden" }}
    />
  );
}
