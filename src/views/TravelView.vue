<template>
  <div class="travel-view page-container pb-tabbar animate-fade-in shadow-inner">
    <header class="section-header">
      <h1 class="text-3xl font-bold tracking-tight text-primary">旅遊探索</h1>
      <p class="text-secondary mt-1">探索日本之美，分類收藏你的旅程</p>
    </header>

    <!-- Main Navigation Tabs -->
    <div class="main-tabs-container">
      <div class="tabs-scroll-wrapper no-scrollbar">
        <div class="tabs-list">
          <button 
            v-for="tab in mainTabs" 
            :key="tab.id"
            @click="activeMainTab = tab.id"
            class="tab-btn"
            :class="{ 'active': activeMainTab === tab.id }"
          >
            <span class="icon">{{ tab.icon }}</span>
            <span class="label">{{ tab.label }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Content Area -->
    <main class="content-area">
      <!-- Standard Themes (Fuji, Tokyo Food, Stationery) -->
      <div v-if="activeMainTab !== 'karuizawa'" class="theme-content">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <GlassCard
            v-for="item in currentThemeData"
            :key="item.id"
            v-bind="item"
            :title="item.name"
          />
        </div>
      </div>

      <!-- Karuizawa Special Layout (with sub-tabs) -->
      <div v-else class="karuizawa-content">

        <div class="sub-tabs-container glass-panel p-1 mb-4">
          <div class="sub-tabs-list">
            <button 
              v-for="subTab in karuizawaTabs" 
              :key="subTab.id"
              @click="activeKaruizawaTab = subTab.id"
              class="sub-tab-btn"
              :class="{ 'active': activeKaruizawaTab === subTab.id }"
            >
              {{ subTab.label }}
            </button>
          </div>
        </div>

        <!-- Karuizawa Cards -->
        <div v-if="activeKaruizawaTab !== 'tips'" class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <GlassCard
            v-for="item in karuizawaData[activeKaruizawaTab]"
            :key="item.id"
            v-bind="item"
            :title="item.name"
          />
        </div>

        <!-- Karuizawa Tips -->
        <div v-else class="tips-container">
          <div 
            v-for="(tip, index) in karuizawaData.tips" 
            :key="index"
            class="tip-card glass-panel p-4 mb-4"
          >
            <h4 class="font-bold text-lg mb-2 text-primary">{{ tip.title }}</h4>
            <p class="text-secondary leading-relaxed">{{ tip.desc }}</p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { tripData } from '@/data/tripData';
import GlassCard from '@/components/GlassCard.vue';

const route = useRoute();

// Main Tabs config
const mainTabs = [
  { id: 'fuji', label: '富士山之旅', icon: '🗻' },
  { id: 'tokyoFood', label: '東京美食', icon: '🍣' },
  { id: 'stationery', label: '文具聖地', icon: '🖋️' },
  { id: 'karuizawa', label: '輕井澤', icon: '🌲' }
];

const activeMainTab = ref('fuji');

// Karuizawa Sub-tabs config
const karuizawaTabs = [
  { id: 'sightseeing', label: '景點' },
  { id: 'food', label: '美食' },
  { id: 'experience', label: '體驗' },
  { id: 'tips', label: 'Tips' }
];

const activeKaruizawaTab = ref('sightseeing');

// Data mappings
const currentThemeData = computed(() => {
  return tripData.themedTravel[activeMainTab.value] || [];
});

const karuizawaData = computed(() => {
  return tripData.themedTravel.karuizawa || {};
});

onMounted(() => {
  // Handle tab from query param if provided
  if (route.query.tab && mainTabs.find(t => t.id === route.query.tab)) {
    activeMainTab.value = route.query.tab;
  }
});
</script>

<style scoped>
.travel-view {
  min-height: 100vh;
}

.section-header {
  padding: 24px 20px 16px;
}

/* Main Tabs Styling */
.main-tabs-container {
  padding: 0 20px 20px;
}

.tabs-scroll-wrapper {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.tabs-list {
  display: flex;
  gap: 10px;
  padding: 4px 0;
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px; /* Optimized padding for mobile */
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: var(--border-radius-lg);
  color: var(--text-secondary);
  font-weight: 600;
  white-space: nowrap;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  height: 48px;
}

.tab-btn .icon {
  font-size: 1.25rem;
}

.tab-btn.active {
  background: var(--primary-blue);
  color: white;
  border-color: var(--primary-blue);
  box-shadow: 0 8px 16px rgba(0, 115, 230, 0.2);
}

/* Sub-tabs Styling (Karuizawa) */
.sub-tabs-container {
  border-radius: var(--border-radius-pill);
}

.sub-tabs-list {
  display: flex;
  padding: 4px;
  gap: 4px;
}

.sub-tab-btn {
  flex: 1;
  padding: 8px 12px;
  border: none;
  background: transparent;
  border-radius: var(--border-radius-pill);
  color: var(--text-secondary);
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.2s;
  cursor: pointer;
}

.sub-tab-btn.active {
  background: white;
  color: var(--primary-blue);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.content-area {
  padding: 0 20px;
}

/* Tip Card Styling */
.tip-card {
  border-left: 4px solid var(--primary-blue);
}

/* Animation utilities */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fadeIn 0.4s ease-out;
}

/* Hide scrollbar for tabs */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* Featured Spotlight Styling */
.featured-card-spotlight {
  perspective: 1000px;
}

.qnav-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 20px;
  background: #ffffff;
  border: 1px solid #e8e0d5;
  border-radius: 20px;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s;
}

.qnav-card.accent {
  background: #1c1a17;
  border-color: #1c1a17;
  color: white;
}

.qnav-icon {
  font-size: 1.8rem;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,0.1);
  border-radius: 14px;
}

.qnav-text {
  flex: 1;
}

.qnav-title {
  font-size: 1.1rem;
  font-weight: 800;
  margin-bottom: 2px;
}

.qnav-title {
  font-size: 1.1rem;
  font-weight: 800;
  margin-bottom: 0px;
}
</style>
