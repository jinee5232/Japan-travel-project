<template>
  <div class="glass-card glass-panel" @click="$emit('click')">
    <div v-if="image" class="cover-image-wrapper">
      <img :src="image" :alt="title" class="cover-image" loading="lazy" />
    </div>
    <div class="card-body">
      <div class="header">
        <div v-if="tag" class="badge">
          {{ tag }}
        </div>
        <h3 class="title">{{ title }}</h3>
      </div>
      <div class="content">
        <p v-if="address" class="address text-sm text-secondary">
          <span class="material-symbols-rounded icon-sm">location_on</span> {{ address }}
        </p>
        <p v-if="notes" class="notes text-sm text-muted">
          <span class="material-symbols-rounded icon-sm">info</span> {{ notes }}
        </p>
      </div>
      <div v-if="url || socialUrl" class="action-buttons">
        <a v-if="url" :href="url" target="_blank" @click.stop class="action-btn map-btn">
          <span class="material-symbols-rounded">location_on</span> Google 地圖
        </a>
        <a v-if="socialUrl" :href="socialUrl" target="_blank" @click.stop class="action-btn social-btn">
          <span class="material-symbols-rounded">link</span> 官方/社群資訊
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  address: String,
  notes: String,
  tag: String,
  url: String,
  socialUrl: String,
  image: String
});
</script>

<style scoped>
.glass-card {
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
  overflow: hidden;
}

.cover-image-wrapper {
  width: 100%;
  height: 180px;
  overflow: hidden;
}

.cover-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.glass-card:hover .cover-image {
  transform: scale(1.05);
}

.card-body {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.glass-card:active {
  transform: scale(0.98);
}

.title {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 4px;
}

.address, .notes {
  margin-bottom: 4px;
  line-height: 1.4;
  color: var(--text-secondary);
  display: flex;
  align-items: flex-start;
  gap: 4px;
}

.icon-sm {
  font-size: 1rem !important;
  margin-top: 2px;
}

.badge {
  margin-bottom: 8px;
}

.action-buttons {
  margin-top: 12px;
  display: flex;
  gap: 8px;
}

.action-btn {
  flex: 1;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  padding: 10px 8px;
  border-radius: var(--border-radius-pill);
  font-size: 0.85rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s;
}

.map-btn {
  background: var(--primary-blue);
  color: white;
  box-shadow: 0 4px 12px rgba(0, 115, 230, 0.25);
}

.social-btn {
  background: rgba(255, 255, 255, 0.8);
  color: var(--text-primary);
  border: 1px solid rgba(0,0,0,0.1);
  backdrop-filter: blur(5px);
}

.action-btn:active {
  transform: translateY(2px);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}
</style>
