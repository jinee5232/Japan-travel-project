<template>
  <main class="page-container">
    <header class="header-section">
      <h1 class="page-title">住宿資訊</h1>
      <p class="subtitle">我們的 Airbnb 預訂</p>
    </header>

    <section class="mt-4">
      <GlassCard 
        v-if="tripData.accommodation"
        :title="tripData.accommodation.title"
        :address="tripData.accommodation.address"
        :notes="tripData.accommodation.notes"
        :url="tripData.accommodation.url"
        :image="tripData.accommodation.image"
        tag="🏠 住宿"
      />
      <div class="glass-panel info-panel mt-4">
        <h3 class="font-bold text-primary-blue mb-2">入住資訊</h3>
        <p class="text-secondary text-sm">📅 Check-in Time: <strong>{{ tripData.accommodation.checkIn }}</strong></p>
      </div>
    </section>
  </main>
</template>

<script setup>
import { tripData } from '@/data/tripData';
import GlassCard from '@/components/GlassCard.vue';
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

.info-panel {
  padding: 16px;
  background: rgba(255, 255, 255, 0.45);
  backdrop-filter: blur(10px);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--glass-shadow);
  border: 1px solid rgba(255, 255, 255, 0.5);
}
</style>
