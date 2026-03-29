<template>
  <main class="home-view page-container">
    <header class="hero glass-panel">
      <h1 class="gradient-text">日本富士山之旅</h1>
      <p class="subtitle">2026.07.29 - 08.02</p>
      
      <div class="countdown" v-if="daysLeft > 0">
        <span class="days">{{ daysLeft }}</span>
        <span class="label">天後出發</span>
      </div>
      <div class="countdown" v-else>
        <span class="label">旅途愉快！</span>
      </div>
    </header>

    <section class="mt-6">
      <h2 class="section-title">行程地圖總覽</h2>
      <TripMap />
    </section>

    <section class="mt-6 important-notices">
      <h2 class="section-title">⚠️ 重要提醒 (4月起新制)</h2>
      <div class="glass-card alert-card">
        <h3 class="alert-title">🔋 赴日行動電源攜帶規定</h3>
        <ul class="alert-list text-sm">
          <li>每人最多僅能攜帶 <strong>2 個</strong> 備用電池/行動電源</li>
          <li>必須確認符合<strong>容量規定</strong></li>
          <li>產品上需印有清晰的<strong>合格標籤</strong>及容量標示</li>
          <li><span class="text-danger">違規者可能會被海關沒收丟棄</span>，請務必行前檢查！</li>
        </ul>
        <a href="https://www.threads.net/@de3296/post/DWEXPdpk3Zp" target="_blank" class="source-link mt-3 block text-right text-xs">
          資訊來源：Threads 討論串 👉
        </a>
      </div>
    </section>

    <section class="mt-6 highlights">
      <h2 class="section-title">重點行程</h2>
      <div class="timeline-item glass-panel">
        <div class="date">Day 4-5 (08/01 - 08/02)</div>
        <div class="title">🧗 挑戰登頂富士山</div>
        <p class="desc text-sm">野貓團隊 87cat 帶領的兩日登山行程</p>
      </div>
    </section>
  </main>
</template>

<script setup>
import { computed } from 'vue';
import { tripData } from '@/data/tripData';
import TripMap from '@/components/TripMap.vue';

const daysLeft = computed(() => {
  const tripDate = new Date('2026-07-29T00:00:00+08:00');
  const today = new Date();
  const diffTime = Math.max(tripDate - today, 0);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});
</script>

<style scoped>
.page-container {
  padding: 24px 20px 120px;
}

.hero {
  text-align: center;
  padding: 40px 20px;
  border-radius: var(--border-radius-xl);
  background: rgba(255, 255, 255, 0.45);
  backdrop-filter: blur(20px);
  box-shadow: 0 10px 40px rgba(0, 115, 230, 0.1);
}

.gradient-text {
  font-size: 2rem;
  font-weight: 800;
  background: linear-gradient(135deg, var(--text-primary) 0%, var(--primary-blue) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 8px;
}

.subtitle {
  font-size: 1.125rem;
  color: var(--text-secondary);
  font-weight: 500;
  letter-spacing: 0.05em;
  margin-bottom: 24px;
}

.countdown {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  background: white;
  padding: 16px 32px;
  border-radius: var(--border-radius-lg);
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
}

.countdown .days {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--primary-blue);
  line-height: 1;
}

.countdown .label {
  font-size: 0.8rem;
  color: var(--text-secondary);
  margin-top: 4px;
  font-weight: 600;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 16px;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-title::before {
  content: '';
  display: block;
  width: 4px;
  height: 20px;
  background: var(--primary-blue);
  border-radius: 4px;
}

/* Alert Card Styles */
.alert-card {
  padding: 16px 20px;
  border-left: 4px solid #ff4d4f;
  background: var(--glass-bg);
  box-shadow: var(--glass-shadow);
  margin-bottom: 16px;
}

.alert-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: #ff4d4f;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.alert-list {
  list-style-type: none;
  padding-left: 0;
  color: var(--text-primary);
  line-height: 1.6;
}

.alert-list li {
  margin-bottom: 8px;
  position: relative;
  padding-left: 20px;
}

.alert-list li::before {
  content: '•';
  color: #ff4d4f;
  position: absolute;
  left: 6px;
  font-weight: bold;
}

.text-danger {
  color: #d9363e;
  font-weight: 600;
}

:global(.dark) .text-danger {
  color: #ff7875;
}

.source-link {
  color: var(--primary-blue);
  text-decoration: none;
  opacity: 0.8;
  display: block;
  text-align: right;
  margin-top: 12px;
}

.source-link:hover {
  opacity: 1;
}

.timeline-item {
  padding: 20px;
  border-left: 4px solid var(--primary-blue);
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--glass-shadow);
}

.timeline-item .date {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--primary-blue);
  margin-bottom: 8px;
}

.timeline-item .title {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 6px;
}

.timeline-item .desc {
  color: var(--text-secondary);
}
</style>
