<template>
  <main class="home-view">

    <!-- ── Infinite Carousel ── -->
    <section class="carousel-section" ref="carouselRef"
      @mousedown="onDragStart" @mousemove="onDragMove" @mouseup="onDragEnd" @mouseleave="onDragEnd"
      @touchstart.passive="onTouchStart" @touchmove.passive="onTouchMove" @touchend="onTouchEnd"
    >
      <div class="carousel-track" ref="trackRef" :style="trackStyle">
        <div
          class="carousel-slide"
          v-for="(slide, i) in infiniteSlides"
          :key="slide.uid"
          :class="{ active: (i % slides.length) === currentSlide }"
        >
          <img :src="slide.img" :alt="slide.title" class="slide-img" :style="{ objectPosition: slide.pos || 'center' }" />
          <div class="slide-overlay"></div>
          <div class="slide-content">
            <span class="slide-label">{{ slide.label }}</span>
            <h2 class="slide-title">{{ slide.title }}</h2>
            <p class="slide-sub">{{ slide.sub }}</p>
          </div>
        </div>
      </div>

      <!-- Dots -->
      <div class="carousel-dots">
        <span
          v-for="(_, i) in slides"
          :key="i"
          class="dot"
          :class="{ active: currentSlide === i }"
          @click="jumpTo(i)"
        ></span>
      </div>
    </section>

    <!-- ── Trip Identity ── -->
    <section class="identity-section">
      <div class="identity-eyebrow">Japan Trip 2026</div>
      <h1 class="identity-heading">日本富士山之旅</h1>
      <p class="identity-date">2026.07.29 — 08.04</p>
      <div class="countdown-wrap" v-if="daysLeft > 0">
        <div class="count-block">
          <span class="count-num">{{ daysLeft }}</span>
          <span class="count-label">Days to go</span>
        </div>
        <div class="count-divider"></div>
        <div class="count-block">
          <span class="count-num">7</span>
          <span class="count-label">Nights</span>
        </div>
        <div class="count-divider"></div>
        <div class="count-block">
          <span class="count-num">7</span>
          <span class="count-label">Travelers</span>
        </div>
      </div>
      <div class="countdown-gone" v-else>🎉 旅途愉快！</div>
    </section>


    <!-- ── Divider ── -->
    <div class="section-rule"><span>行程地圖</span></div>

    <!-- ── Map ── -->
    <section class="map-section">
      <TripMap />
    </section>

    <!-- ── Divider ── -->
    <div class="section-rule"><span>注意事項</span></div>

    <!-- ── Alert Notice ── -->
    <section class="notice-section">
      <div class="notice-card">
        <div class="notice-header">
          <span class="notice-dot"></span>
          <span class="notice-tag">4月起新制</span>
        </div>
        <h3 class="notice-title">🔋 赴日行動電源攜帶規定</h3>
        <ul class="notice-list">
          <li>每人最多攜帶 <strong>2 個</strong> 備用電池／行動電源</li>
          <li>需符合<strong>容量規定</strong>，產品上印有清晰合格標籤</li>
          <li class="warn">⚠️ 違規者可能會被海關沒收，出發前務必檢查！</li>
        </ul>
        <a href="https://www.threads.net/@de3296/post/DWEXPdpk3Zp" target="_blank" class="notice-link">
          查看詳細討論 →
        </a>
      </div>
    </section>

    <!-- ── Footer Note ── -->
    <footer class="home-footer">
      <p>Made with JY for Japan Trip 2026</p>
    </footer>

  </main>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import TripMap from '@/components/TripMap.vue';

/* ── Countdown ── */
const daysLeft = computed(() => {
  const tripDate = new Date('2026-07-29T00:00:00+08:00');
  const today = new Date();
  const diffTime = Math.max(tripDate - today, 0);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

/* ── Slides Data ── */
const slides = [
  {
    label: 'Day 1–3 · Tokyo',
    title: '東京 浅草 Asakusa',
    sub: '晴空塔、淺草寺、隅田川',
    img: 'https://images.pexels.com/photos/1440476/pexels-photo-1440476.jpeg?auto=compress&cs=tinysrgb&w=800',
    pos: 'center',
  },
  {
    label: 'Day 4–5 · Mt.Fuji',
    title: '富士山 攻頂',
    sub: '吉田路線・御來光・缽巡',
    img: 'https://images.pexels.com/photos/33368129/pexels-photo-33368129.jpeg?auto=compress&cs=tinysrgb&w=800',
    pos: 'center',
  },
  {
    label: 'Day 2 · Kawaguchiko',
    title: '河口湖 自由探索',
    sub: '忍野八海・牧場・美食',
    img: 'https://images.pexels.com/photos/3408354/pexels-photo-3408354.jpeg?auto=compress&cs=tinysrgb&w=800',
    pos: 'center',
  },
  {
    label: 'Shopping · Tokyo',
    title: '東京 文具 & 藥妝',
    sub: '東急Hands・Loft・伊東屋',
    img: 'https://media.walkerland.com.tw/wlk_media/thumbnail/images/upload/jnews/2019/11/9bdaf7b40a74aaae76b7a7a3d86aa28129d73570-800x533.webp?auto=compress&cs=tinysrgb&w=800',
    pos: 'center',
  },
  {
    label: 'Food · Tokyo',
    title: '美食地圖',
    sub: '壽司・拉麵・甜點・居酒屋',
    img: 'https://images.pexels.com/photos/29089211/pexels-photo-29089211.jpeg?auto=compress&cs=tinysrgb&w=800',
    pos: 'bottom',
  },
  {
    label: 'Side Trip · Karuizawa',
    title: '輕井澤 避暑山城',
    sub: '舊輕井澤、榆樹街、採草莓',
    img: 'https://www.likejapan.com/wp-content/uploads/2023/07/0054_24-1024x683.jpg?auto=compress&cs=tinysrgb&w=800',
    pos: 'center',
  },
];

/* ── Infinite Clone Logic ── */
// Triple the slides for seamless looping: [...slides, ...slides, ...slides]
const CLONE_COUNT = slides.length;
const infiniteSlides = computed(() =>
  [...slides, ...slides, ...slides].map((s, i) => ({ ...s, uid: i }))
);

/* ── Carousel State ── */
const carouselRef = ref(null);
const trackRef = ref(null);
const SLIDE_WIDTH = ref(0);
const currentSlide = ref(0); // 0..slides.length-1 (logical)
const isTransitioning = ref(false);
const rawOffset = ref(0);

const trackStyle = computed(() => ({
  transform: `translateX(${rawOffset.value}px)`,
  transition: isTransitioning.value ? 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
}));

function getSlideW() {
  return carouselRef.value ? carouselRef.value.offsetWidth : 320;
}

function initOffset() {
  SLIDE_WIDTH.value = getSlideW();
  isTransitioning.value = false;
  // Start at the middle set's first slide
  rawOffset.value = -(CLONE_COUNT * SLIDE_WIDTH.value);
  currentSlide.value = 0;
}

function jumpTo(i) {
  stopAuto();
  const sw = SLIDE_WIDTH.value || getSlideW();
  isTransitioning.value = true;
  currentSlide.value = i;
  rawOffset.value = -((CLONE_COUNT + i) * sw);
  
  setTimeout(() => {
    checkLoop();
    startAuto();
  }, 800);
}

/* ── Teleport (seamless loop) ── */
function checkLoop() {
  const sw = SLIDE_WIDTH.value || getSlideW();
  const totalSlides = slides.length;
  
  // Logical index check based on offset
  const realIndex = Math.round(Math.abs(rawOffset.value / sw));
  
  if (realIndex >= CLONE_COUNT * 2) {
    // Jump from end of 2nd set back to end of 1st set
    isTransitioning.value = false;
    rawOffset.value += (totalSlides * sw);
  } else if (realIndex < CLONE_COUNT) {
    // Jump from start of 2nd set to start of 3rd set
    isTransitioning.value = false;
    rawOffset.value -= (totalSlides * sw);
  }
}

/* ── Auto-scroll ── */
let autoTimer = null;
const AUTO_INTERVAL = 5000; // Stay for 5s

function nextSlide() {
  const sw = SLIDE_WIDTH.value || getSlideW();
  isTransitioning.value = true;
  rawOffset.value -= sw;
  
  // Calculate new currentSlide
  currentSlide.value = (currentSlide.value + 1) % slides.length;

  setTimeout(() => {
    checkLoop();
  }, 800);
}

function startAuto() {
  stopAuto();
  autoTimer = setInterval(nextSlide, AUTO_INTERVAL);
}

function stopAuto() {
  if (autoTimer) clearInterval(autoTimer);
  autoTimer = null;
}

/* ── Snap after user interaction ── */
function snapNearest() {
  const sw = SLIDE_WIDTH.value || getSlideW();
  isTransitioning.value = true;
  
  const snappedIndex = Math.round(Math.abs(rawOffset.value / sw));
  rawOffset.value = -(snappedIndex * sw);
  
  // Update logical index
  currentSlide.value = (snappedIndex % slides.length);
  
  setTimeout(() => {
    checkLoop();
    startAuto();
  }, 800);
}

/* ── Mouse Drag ── */
let dragStartX = 0;
let dragStartOffset = 0;
let isDragging = false;

function onDragStart(e) {
  stopAuto();
  isTransitioning.value = false;
  isDragging = true;
  dragStartX = e.clientX;
  dragStartOffset = rawOffset.value;
}
function onDragMove(e) {
  if (!isDragging) return;
  const dx = e.clientX - dragStartX;
  rawOffset.value = dragStartOffset + dx;
}
function onDragEnd() {
  if (!isDragging) return;
  isDragging = false;
  snapNearest();
}

/* ── Touch Swipe ── */
let touchStartX = 0;
let touchStartOffset = 0;

function onTouchStart(e) {
  stopAuto();
  isTransitioning.value = false;
  touchStartX = e.touches[0].clientX;
  touchStartOffset = rawOffset.value;
}
function onTouchMove(e) {
  const dx = e.touches[0].clientX - touchStartX;
  rawOffset.value = touchStartOffset + dx;
}
function onTouchEnd() {
  snapNearest();
}

/* ── Lifecycle ── */
onMounted(() => {
  initOffset();
  window.addEventListener('resize', () => {
    initOffset();
  });
  startAuto();
});
onUnmounted(() => {
  stopAuto();
});
</script>

<style scoped>
/* ── Reset ── */
.home-view {
  min-height: 100vh;
  padding-bottom: 120px;
  background: #f9f6f1;
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━
   CAROUSEL
━━━━━━━━━━━━━━━━━━━━━━━━ */
.carousel-section {
  position: relative;
  width: 100%;
  height: 58vw;
  max-height: 340px;
  min-height: 200px;
  overflow: hidden;
  user-select: none;
  cursor: grab;
}
.carousel-section:active { cursor: grabbing; }

.carousel-track {
  display: flex;
  height: 100%;
  will-change: transform;
}

.carousel-slide {
  flex: 0 0 100%;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  background: #1c1a17;
}

.slide-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  pointer-events: none;
  transition: transform 1.2s ease-out;
  will-change: transform;
  transform: scale(1.05); /* Slightly zoomed out by default */
}

/* Ken Burns Effect when active */
.carousel-slide.active .slide-img {
  transform: scale(1.15) translateY(-2%);
  transition: transform 6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.slide-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.5) 100%);
  pointer-events: none;
}

.slide-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 24px 24px 32px;
  z-index: 2;
  transition: opacity 0.4s ease, transform 0.6s ease;
  opacity: 0.9;
  transform: translateY(0);
}

.carousel-slide.active .slide-content {
  opacity: 1;
  transform: translateY(-5px);
}
@media (max-width: 640px) {
  .slide-content {
    padding: 16px 20px 24px;
    display: block !important; /* Force visibility */
    visibility: visible !important;
  }
}

.slide-label {
  display: inline-block;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.65);
  margin-bottom: 6px;
}

.slide-title {
  font-size: 1.8rem;
  font-weight: 800;
  color: #ffffff;
  line-height: 1.15;
  margin-bottom: 4px;
  letter-spacing: -0.01em;
  text-shadow: 0 2px 10px rgba(0,0,0,0.3);
}

@media (max-width: 640px) {
  .slide-title {
    font-size: 1.4rem;
  }
  .slide-sub {
    font-size: 0.75rem;
  }
}

.slide-sub {
  font-size: 0.85rem;
  color: rgba(255,255,255,0.85);
  font-weight: 500;
}

/* Dots */
.carousel-dots {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 6px;
  z-index: 10;
}

.dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: rgba(255,255,255,0.4);
  transition: all 0.3s;
  cursor: pointer;
}

.dot.active {
  width: 18px;
  border-radius: 3px;
  background: rgba(255,255,255,0.95);
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━
   IDENTITY SECTION
━━━━━━━━━━━━━━━━━━━━━━━━ */
.identity-section {
  padding: 36px 24px 32px;
  text-align: center;
  background: #f9f6f1;
}

.identity-eyebrow {
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #9c8b73;
  margin-bottom: 10px;
}

.identity-heading {
  font-size: 2rem;
  font-weight: 900;
  letter-spacing: -0.02em;
  color: #1c1a17;
  line-height: 1.1;
  margin-bottom: 8px;
}

.identity-date {
  font-size: 0.85rem;
  color: #9c8b73;
  font-weight: 500;
  letter-spacing: 0.06em;
  margin-bottom: 28px;
}

/* Countdown */
.countdown-wrap {
  display: inline-flex;
  align-items: center;
  gap: 0;
  background: #ffffff;
  border: 1px solid #e8e0d5;
  border-radius: 18px;
  padding: 16px 32px;
  box-shadow: 0 4px 24px rgba(28, 26, 23, 0.06);
}

.count-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;
}

.count-num {
  font-size: 1.8rem;
  font-weight: 900;
  color: #1c1a17;
  line-height: 1;
  font-variant-numeric: tabular-nums;
}

.count-label {
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #9c8b73;
  margin-top: 4px;
}

.count-divider {
  width: 1px;
  height: 32px;
  background: #e8e0d5;
}

.countdown-gone {
  font-size: 1.3rem;
  font-weight: 700;
  color: #1c1a17;
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━
   SECTION RULE
━━━━━━━━━━━━━━━━━━━━━━━━ */
.section-rule {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 24px;
  margin: 4px 0 20px;
}

.section-rule::before,
.section-rule::after {
  content: '';
  flex: 1;
  height: 1px;
  background: #e8e0d5;
}

.section-rule span {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #b5a898;
  white-space: nowrap;
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━
   QUICK NAV CARDS
━━━━━━━━━━━━━━━━━━━━━━━━ */
.quicknav-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 20px;
}

.qnav-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 18px;
  background: #ffffff;
  border: 1px solid #e8e0d5;
  border-radius: 16px;
  text-decoration: none;
  color: inherit;
  transition: transform 0.18s, box-shadow 0.18s, background 0.18s;
}

.qnav-card:active {
  transform: scale(0.98);
}

.qnav-card.accent {
  background: #1c1a17;
  border-color: #1c1a17;
}

.qnav-card.accent .qnav-title {
  color: #ffffff;
}

.qnav-card.accent .qnav-sub {
  color: rgba(255,255,255,0.5);
}

.qnav-card.accent .qnav-arrow {
  color: rgba(255,255,255,0.4);
}

.qnav-icon {
  font-size: 1.4rem;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f9f6f1;
  border-radius: 12px;
  flex-shrink: 0;
}

.qnav-card.accent .qnav-icon {
  background: rgba(255,255,255,0.1);
}

.qnav-text {
  flex: 1;
}

.qnav-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: #1c1a17;
  margin-bottom: 2px;
}

.qnav-sub {
  font-size: 0.75rem;
  color: #9c8b73;
  font-weight: 400;
}

.qnav-arrow {
  font-size: 1rem;
  color: #c8bead;
  font-weight: 300;
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━
   NOTICE SECTION
━━━━━━━━━━━━━━━━━━━━━━━━ */
/* ── Map Section ── */
.map-section {
  padding: 0 20px;
}

.map-section :deep(.map-wrapper) {
  margin-top: 0;
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid #e8e0d5;
  box-shadow: 0 4px 20px rgba(28, 26, 23, 0.08);
}

.notice-section {
  padding: 0 20px;
}

.notice-card {
  background: #fffbf5;
  border: 1px solid #f0e8d8;
  border-left: 3px solid #c0392b;
  border-radius: 16px;
  padding: 18px 20px;
}

.notice-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
}

.notice-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #c0392b;
  flex-shrink: 0;
}

.notice-tag {
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #c0392b;
}

.notice-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: #1c1a17;
  margin-bottom: 12px;
}

.notice-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0;
  margin-bottom: 14px;
}

.notice-list li {
  font-size: 0.83rem;
  color: #5a5040;
  line-height: 1.55;
  padding-left: 14px;
  position: relative;
}

.notice-list li::before {
  content: '–';
  position: absolute;
  left: 0;
  color: #9c8b73;
}

.notice-list li.warn {
  color: #c0392b;
  font-weight: 600;
}
.notice-list li.warn::before { color: #c0392b; }

.notice-link {
  font-size: 0.78rem;
  font-weight: 600;
  color: #9c8b73;
  text-decoration: none;
  letter-spacing: 0.02em;
  transition: color 0.2s;
}
.notice-link:hover { color: #1c1a17; }

/* ━━━━━━━━━━━━━━━━━━━━━━━━
   FOOTER
━━━━━━━━━━━━━━━━━━━━━━━━ */
.home-footer {
  text-align: center;
  padding: 36px 24px 16px;
  font-size: 0.72rem;
  color: #b5a898;
  letter-spacing: 0.04em;
}
</style>
