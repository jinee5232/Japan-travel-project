<template>
  <main class="page-container">
    <header class="header-section">
      <h1 class="page-title">周邊景點</h1>
      <p class="subtitle">富士山周邊觀光與美食</p>
    </header>

    <!-- Filters/Tabs for separating food and sightseeing -->
    <div class="tabs">
      <button :class="{ active: currentTab === 'sightseeing' }" @click="currentTab = 'sightseeing'">
        🏞️ 觀光
      </button>
      <button :class="{ active: currentTab === 'food' }" @click="currentTab = 'food'">
        🍴 美食
      </button>
    </div>

    <section class="list-section">
      <transition-group name="list">
        <GlassCard 
          v-for="spot in currentList" 
          :key="spot.id"
          :title="spot.name"
          :address="spot.address"
          :notes="spot.notes"
          :tag="spot.tag"
          :url="spot.url"
          :socialUrl="spot.socialUrl"
          :image="spot.image"
        />
      </transition-group>
    </section>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue';
import { tripData } from '@/data/tripData';
import GlassCard from '@/components/GlassCard.vue';

const currentTab = ref('sightseeing');

const currentList = computed(() => {
  return tripData[currentTab.value];
});
</script>

<style scoped>
.page-container {
  padding: 24px 20px 120px;
}

.header-section {
  margin-bottom: 24px;
}

.page-title {
  font-size: 2rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.subtitle {
  color: var(--text-secondary);
}

.tabs {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
}

.tabs button {
  flex: 1;
  padding: 12px;
  border-radius: var(--border-radius-pill);
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(10px);
  font-weight: 600;
  color: var(--text-secondary);
  transition: all 0.3s;
  border: 1px solid rgba(255, 255, 255, 0.6);
}

.tabs button.active {
  background: var(--primary-blue);
  color: white;
  border-color: var(--primary-blue);
  box-shadow: 0 4px 12px rgba(0, 115, 230, 0.25);
  transform: translateY(-2px);
}

.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
