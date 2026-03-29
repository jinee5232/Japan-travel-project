<template>
  <main class="page-container">
    <header class="header-section">
      <h1 class="page-title">東京文具聖地</h1>
      <p class="subtitle">來東京必買的文具、手帳、生活雜貨</p>
    </header>

    <section class="list-section">
      <GlassCard 
        v-for="shop in tripData.shopping" 
        :key="shop.id"
        :title="shop.name"
        :notes="shop.notes"
        :url="shop.url"
        :socialUrl="shop.socialUrl"
        tag="購物"
        :image="shop.image"
      />
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
  margin-bottom: 32px;
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
</style>
