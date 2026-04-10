<template>
  <div class="map-wrapper glass-panel">
    <div ref="mapContainer" class="map-container"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { tripData } from '@/data/tripData';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const mapContainer = ref(null);
let map = null;

// Custom icons for markers
const blueIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

onMounted(() => {
  // Initialize map
  map = L.map(mapContainer.value).setView([35.68, 139.76], 10);

  // Add OpenStreetMap tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
  }).addTo(map);

  const bounds = [];

  // 1. Plot Travel Spots (Blue)
  const allSpots = [];
  const extractSpots = (obj) => {
    if (!obj) return;
    if (Array.isArray(obj)) {
      obj.forEach(item => {
        if (item.lat && item.lng) {
          allSpots.push(item);
        }
      });
    } else if (typeof obj === 'object') {
      Object.values(obj).forEach(val => extractSpots(val));
    }
  };

  extractSpots(tripData.themedTravel);

  allSpots.forEach(spot => {
    const marker = L.marker([spot.lat, spot.lng], { icon: blueIcon }).addTo(map);
    
    // Premium Popup Content
    const popupContent = `
      <div class="custom-popup">
        ${spot.image ? `<div class="popup-img-wrapper"><img src="${spot.image}" class="popup-img" /></div>` : ''}
        <div class="popup-info">
          <strong class="popup-title">${spot.name}</strong>
          ${spot.address ? `<p class="popup-addr">${spot.address}</p>` : ''}
          <p class="popup-notes">${spot.notes || ''}</p>
          <div class="popup-actions">
            ${spot.url ? `<a href="${spot.url}" target="_blank" class="popup-btn maps">Google Maps</a>` : ''}
            ${spot.socialUrl ? `<a href="${spot.socialUrl}" target="_blank" class="popup-btn social">官網/社群</a>` : ''}
          </div>
        </div>
      </div>
    `;
    
    marker.bindPopup(popupContent, {
      maxWidth: 240,
      className: 'rich-popup'
    });
    bounds.push([spot.lat, spot.lng]);
  });

  // 2. Plot Accommodation (Red)
  const acc = tripData.accommodation;
  if (acc && acc.lat && acc.lng) {
    const accMarker = L.marker([acc.lat, acc.lng], { icon: redIcon }).addTo(map);
    
    const accPopupContent = `
      <div class="custom-popup">
        ${acc.image ? `<div class="popup-img-wrapper"><img src="${acc.image}" class="popup-img" /></div>` : ''}
        <div class="popup-info">
          <strong class="popup-title">🏠 ${acc.title}</strong>
          <p class="popup-addr">${acc.address || ''}</p>
          <div class="popup-actions">
            ${acc.url ? `<a href="${acc.url}" target="_blank" class="popup-btn airbnb">查看地點</a>` : ''}
            ${acc.socialUrl ? `<a href="${acc.socialUrl}" target="_blank" class="popup-btn airbnb">Airbnb</a>` : ''}
          </div>
        </div>
      </div>
    `;

    accMarker.bindPopup(accPopupContent, {
      maxWidth: 240,
      className: 'rich-popup'
    });
    bounds.push([acc.lat, acc.lng]);
  }

  // Fit bounds to show all markers
  if (bounds.length > 0) {
    map.fitBounds(bounds, { padding: [40, 40] });
  }
});

onUnmounted(() => {
  if (map) {
    map.remove();
  }
});
</script>

<style scoped>
.map-wrapper {
  margin-top: 16px;
  overflow: hidden;
  border-radius: var(--border-radius-lg);
}

.map-container {
  height: 250px;
  width: 100%;
  z-index: 10;
}

/* Custom Popup Styling */
:deep(.rich-popup .leaflet-popup-content-wrapper) {
  padding: 0;
  overflow: hidden;
  border-radius: 12px;
}

:deep(.rich-popup .leaflet-popup-content) {
  margin: 0;
  width: 240px !important;
}

:deep(.custom-popup) {
  width: 100%;
}

:deep(.popup-img-wrapper) {
  width: 100%;
  height: 120px;
  overflow: hidden;
}

:deep(.popup-img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

:deep(.popup-info) {
  padding: 12px;
}

:deep(.popup-title) {
  display: block;
  font-size: 1rem;
  margin-bottom: 4px;
  color: var(--text-primary);
}

:deep(.popup-addr) {
  font-size: 0.75rem;
  color: var(--text-secondary);
  margin-bottom: 6px;
  line-height: 1.4;
}

:deep(.popup-notes) {
  font-size: 0.75rem;
  color: var(--text-secondary);
  margin-bottom: 12px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

:deep(.popup-actions) {
  display: flex;
  gap: 8px;
}

:deep(.popup-btn) {
  flex: 1;
  text-align: center;
  padding: 6px 0;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 6px;
  text-decoration: none;
  transition: all 0.2s;
}

:deep(.popup-btn.maps) {
  background: var(--primary-blue);
  color: white;
}

:deep(.popup-btn.social) {
  background: #f0f0f0;
  color: var(--text-secondary);
}

:deep(.popup-btn.airbnb) {
  background: #ff5a5f;
  color: white;
}
</style>
