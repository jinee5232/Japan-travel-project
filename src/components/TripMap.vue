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

// Fix for leaflet broken marker icons in bundle
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

onMounted(() => {
  // Initialize map centered at Kawaguchiko (approx 35.500, 138.760)
  map = L.map(mapContainer.value).setView([35.500, 138.760], 11);

  // Add OpenStreetMap tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
  }).addTo(map);

  // Combine sightseeing and food spots
  const allSpots = [...tripData.sightseeing, ...tripData.food];

  const bounds = [];

  allSpots.forEach(spot => {
    if (spot.lat && spot.lng) {
      const marker = L.marker([spot.lat, spot.lng]).addTo(map);
      marker.bindPopup(`<strong>${spot.name}</strong><br>${spot.notes || ''}`);
      bounds.push([spot.lat, spot.lng]);
    }
  });

  // Fit bounds to show all markers
  if (bounds.length > 0) {
    map.fitBounds(bounds, { padding: [20, 20] });
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
</style>
