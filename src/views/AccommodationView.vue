<template>
  <main class="page-container">
    <!-- Hero Header -->
    <header class="hero-header">
      <div class="hero-bg-overlay"></div>
      <div class="hero-content">
        <div class="hero-badge">
          <span class="material-symbols-rounded icon-badge">home</span> Airbnb 住宿
        </div>
        <h1 class="hero-title">Clavis Asakusa Skytree</h1>
        <p class="hero-subtitle">都市旅館風格・融合東方美學</p>
        <div class="hero-meta">
          <span class="meta-pill"><span class="material-symbols-rounded icon-pill">location_on</span> 墨田區</span>
          <span class="meta-pill"><span class="material-symbols-rounded icon-pill">group</span> 最多 10 人</span>
          <span class="meta-pill"><span class="material-symbols-rounded icon-pill">bed</span> 3 臥室</span>
          <span class="meta-pill"><span class="material-symbols-rounded icon-pill">square_foot</span> 97㎡</span>
        </div>
      </div>
    </header>

    <!-- Quick Links -->
    <div class="action-row">
      <a :href="accommodation.url" target="_blank" class="action-btn btn-map">
        <span class="material-symbols-rounded">location_on</span>
        <span>Google 地圖</span>
      </a>
      <a :href="accommodation.socialUrl" target="_blank" class="action-btn btn-airbnb">
        <span class="material-symbols-rounded">home</span>
        <span>Airbnb 頁面</span>
      </a>
    </div>

    <!-- Notice Banner -->
    <div class="notice-banner">
      <span class="material-symbols-rounded notice-icon">warning</span>
      <span>請注意：本公寓<strong>沒有電梯</strong>，請自行安排行李搬運。</span>
    </div>

    <!-- Description -->
    <section class="glass-section">
      <h2 class="section-title"><span class="material-symbols-rounded">magic_button</span> 空間介紹</h2>
      <p class="desc-text">
        採用「都市旅館」的概念設計，融合了東海岸的現代風格和日本美學的寧靜優雅。
        室內有受日本大自然和傳統日本藝術啟發的藝術品和織物，營造出精緻和現代的日本氛圍。
      </p>
    </section>

    <!-- Transport Highlights -->
    <section class="glass-section">
      <h2 class="section-title"><span class="material-symbols-rounded">directions_subway</span> 交通資訊</h2>
      <div class="transport-grid">
        <div class="transport-card">
          <div class="material-symbols-rounded transport-icon">directions_walk</div>
          <div class="transport-info">
            <div class="transport-name">本所吾妻橋站</div>
            <div class="transport-time">步行 3 分鐘</div>
            <div class="transport-sub">都營淺草線</div>
          </div>
        </div>
        <div class="transport-card">
          <div class="material-symbols-rounded transport-icon">location_city</div>
          <div class="transport-info">
            <div class="transport-name">東京晴空塔</div>
            <div class="transport-time">步行 10-11 分鐘</div>
            <div class="transport-sub">著名地標</div>
          </div>
        </div>
        <div class="transport-card">
          <div class="material-symbols-rounded transport-icon">flight</div>
          <div class="transport-info">
            <div class="transport-name">羽田機場</div>
            <div class="transport-time">約 50 分鐘</div>
            <div class="transport-sub">電車前往</div>
          </div>
        </div>
        <div class="transport-card">
          <div class="material-symbols-rounded transport-icon">flight_takeoff</div>
          <div class="transport-info">
            <div class="transport-name">成田機場</div>
            <div class="transport-time">約 60 分鐘</div>
            <div class="transport-sub">快速列車</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Check-in Info -->
    <section class="glass-section">
      <h2 class="section-title"><span class="material-symbols-rounded">calendar_today</span> 入住資訊</h2>
      <div class="info-rows">
        <div class="info-row">
          <span class="info-label">最早入住</span>
          <span class="info-value highlight-green">上午 10:00</span>
        </div>
         <div class="info-row">
          <span class="info-label">最晚退房</span>
          <span class="info-value highlight-green">上午 10:00</span>
        </div>
        <div class="info-row">
          <span class="info-label">最多房客</span>
          <span class="info-value">10 人</span>
        </div>
        <div class="info-row">
          <span class="info-label">坪數</span>
          <span class="info-value">97 ㎡</span>
        </div>
        <div class="info-row">
          <span class="info-label">格局</span>
          <span class="info-value">3LDK</span>
        </div>
        <div class="info-row">
          <span class="info-label">電梯</span>
          <span class="info-value warn"><span class="material-symbols-rounded icon-inline">close</span> 無電梯</span>
        </div>
      </div>
    </section>

    <!-- Bedrooms -->
    <section class="glass-section">
      <h2 class="section-title"><span class="material-symbols-rounded">bed</span> 臥室配置</h2>
      <div class="room-grid">
        <div class="room-card">
          <div class="room-number">臥室 1</div>
          <div class="room-bed"><span class="material-symbols-rounded icon-inline">bed</span> 雙人床 × 1</div>
        </div>
        <div class="room-card">
          <div class="room-number">臥室 2</div>
          <div class="room-bed"><span class="material-symbols-rounded icon-inline">bed</span> 雙人床 × 1</div>
        </div>
        <div class="room-card room-card--special">
          <div class="room-number">臥室 3 (閣樓)</div>
          <div class="room-bed"><span class="material-symbols-rounded icon-inline">bed</span> 雙人床 × 1 + 單人床 × 1</div>
          <div class="room-extra">＋閣樓區額外 3 套日式床墊<br><span class="text-muted-sm">（可依喜好擺放）</span></div>
        </div>
      </div>
    </section>

    <!-- Amenities Grid -->
    <section class="glass-section">
      <h2 class="section-title"><span class="material-symbols-rounded">cooking</span> 廚房與餐廳</h2>
      <div class="amenities-grid">
        <div class="amenity-item" v-for="item in kitchenItems" :key="item.icon">
          <span class="material-symbols-rounded amenity-icon">{{ item.icon }}</span>
          <span class="amenity-label">{{ item.label }}</span>
        </div>
      </div>
    </section>

    <!-- Bathroom -->
    <section class="glass-section">
      <h2 class="section-title"><span class="material-symbols-rounded">shower</span> 衛浴設備</h2>
      <div class="bathroom-grid">
        <div class="bathroom-card">
          <div class="bathroom-heading">
            <span class="material-symbols-rounded icon-header text-primary-blue">wc</span> 洗手間 × 2
          </div>
          <p class="bathroom-desc">配有智慧型旗艦坐浴盆 (Washlet)</p>
        </div>
        <div class="bathroom-card">
          <div class="bathroom-heading">
            <span class="material-symbols-rounded icon-header text-primary-blue">shower</span> 淋浴間 × 2
          </div>
          <p class="bathroom-desc">配備洗髮精、潤髮乳、香皂</p>
        </div>
      </div>
      <div class="amenities-grid mt-2">
        <div class="amenity-item" v-for="item in bathroomItems" :key="item.icon">
          <span class="material-symbols-rounded amenity-icon">{{ item.icon }}</span>
          <span class="amenity-label">{{ item.label }}</span>
        </div>
      </div>
    </section>

    <!-- Other Facilities -->
    <section class="glass-section">
      <h2 class="section-title"><span class="material-symbols-rounded">home</span> 其他設施</h2>
      <div class="amenities-grid">
        <div class="amenity-item" v-for="item in otherItems" :key="item.icon">
          <span class="material-symbols-rounded amenity-icon">{{ item.icon }}</span>
          <span class="amenity-label">{{ item.label }}</span>
        </div>
      </div>
    </section>

    <!-- Nearby Spots -->
    <section class="glass-section">
      <h2 class="section-title"><span class="material-symbols-rounded">location_on</span> 周邊便利設施</h2>
      <div class="nearby-list">
        <div class="nearby-item" v-for="spot in nearbySpots" :key="spot.name">
          <span class="material-symbols-rounded nearby-icon">{{ spot.icon }}</span>
          <div class="nearby-info">
            <span class="nearby-name">{{ spot.name }}</span>
            <span class="nearby-walk">{{ spot.walk }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Summary Highlights -->
    <section class="glass-section highlight-section">
      <h2 class="section-title"><span class="material-symbols-rounded">star</span> 住宿亮點摘要</h2>
      <ul class="highlight-list">
        <li><span class="material-symbols-rounded icon-inline">home</span> 寬敞舒適，最多可入住 10 位房客</li>
        <li><span class="material-symbols-rounded icon-inline">directions_subway</span> 步行 3 分鐘抵達都營淺草線本所吾妻橋站</li>
        <li><span class="material-symbols-rounded icon-inline">location_city</span> 步行 11 分鐘即達東京晴空塔</li>
        <li><span class="material-symbols-rounded icon-inline">square_foot</span> 97㎡ 超大空間，家庭或團體皆宜</li>
        <li><span class="material-symbols-rounded icon-inline">flight</span> 羽田約 50 分鐘、成田約 60 分鐘可達</li>
        <li><span class="material-symbols-rounded icon-inline">schedule</span> 最早 10:00 即可入住</li>
      </ul>
    </section>
  </main>
</template>

<script setup>
import { tripData } from '@/data/tripData';

const accommodation = tripData.accommodation;

const kitchenItems = [
  { icon: 'kitchen', label: '冰箱' },
  { icon: 'cooking', label: '電磁爐' },
  { icon: 'microwave', label: '微波爐' },
  { icon: 'rice_bowl', label: '電鍋' },
  { icon: 'kettle', label: '電熱水壺' },
  { icon: 'tv', label: '智慧電視 (Netflix / YouTube)' },
  { icon: 'tv_gen', label: 'Amazon Fire TV Stick' },
  { icon: 'restaurant', label: '烹飪用具與餐具' },
  { icon: 'cleaning_services', label: '洗碗機與海綿' },
  { icon: 'chair', label: '餐桌 + 高腳椅' },
  { icon: 'child_care', label: '兒童餐具' },
];

const bathroomItems = [
  { icon: 'air', label: '吹風機' },
  { icon: 'soap', label: '洗手皂' },
  { icon: 'bathtub', label: '浴巾與毛巾' },
  { icon: 'dentistry', label: '一次性牙刷' },
  { icon: 'face_retouching_natural', label: '梳子' },
  { icon: 'cleaning_services', label: '刮鬍刀' },
];

const otherItems = [
  { icon: 'ac_unit', label: '空調' },
  { icon: 'wifi', label: '免費 WiFi' },
  { icon: 'soap', label: '洗衣機與洗衣精' },
];

const nearbySpots = [
  { icon: 'storefront', name: '羅森便利商店', walk: '步行 2 分鐘' },
  { icon: 'shopping_cart', name: 'My Basket 超市', walk: '步行 4 分鐘' },
  { icon: 'medical_services', name: 'Drug Papas 藥妝', walk: '步行 2 分鐘' },
  { icon: 'water', name: '隅田水族館', walk: '步行圈內' },
  { icon: 'park', name: '隅田公園', walk: '步行圈內' },
];
</script>

<style scoped>
.page-container {
  padding: 0 0 120px;
}

/* ── Hero ── */
.hero-header {
  position: relative;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%);
  padding: 48px 24px 36px;
  overflow: hidden;
}

.hero-bg-overlay {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 80% 20%, rgba(255, 184, 0, 0.12) 0%, transparent 55%),
    radial-gradient(circle at 20% 80%, rgba(0, 180, 216, 0.10) 0%, transparent 55%);
  pointer-events: none;
}

.hero-content {
  position: relative;
  z-index: 1;
}

.hero-badge {
  display: inline-block;
  background: rgba(255, 184, 0, 0.2);
  color: #ffd166;
  border: 1px solid rgba(255, 184, 0, 0.35);
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 700;
  padding: 4px 14px;
  letter-spacing: 0.04em;
  margin-bottom: 12px;
}

.hero-title {
  font-size: 1.75rem;
  font-weight: 900;
  color: #ffffff;
  line-height: 1.2;
  margin-bottom: 6px;
  letter-spacing: -0.01em;
}

.hero-subtitle {
  font-size: 0.92rem;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 20px;
}

.hero-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.meta-pill {
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.88);
  padding: 5px 12px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.icon-badge {
  font-size: 1rem !important;
  vertical-align: middle;
}

.icon-pill {
  font-size: 0.9rem !important;
}

.icon-inline {
  font-size: 1.1rem !important;
  vertical-align: middle;
  margin-right: 2px;
}

.icon-header {
  font-size: 1.25rem !important;
  vertical-align: middle;
  margin-bottom: 2px;
}

.text-primary-blue {
  color: #0073e6;
}

/* ── Action Buttons Row ── */
.action-row {
  display: flex;
  gap: 12px;
  padding: 16px 20px;
}

.action-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 13px 8px;
  border-radius: 14px;
  font-size: 0.88rem;
  font-weight: 700;
  text-decoration: none;
  transition: transform 0.18s, box-shadow 0.18s;
}

.action-btn:active {
  transform: scale(0.97);
}

.btn-map {
  background: linear-gradient(135deg, #0073e6, #0056b3);
  color: white;
  box-shadow: 0 4px 14px rgba(0, 115, 230, 0.35);
}

.btn-airbnb {
  background: linear-gradient(135deg, #ff5a5f, #e00b41);
  color: white;
  box-shadow: 0 4px 14px rgba(255, 90, 95, 0.35);
}

.btn-icon {
  font-size: 1rem;
}

/* ── Notice Banner ── */
.notice-banner {
  margin: 0 20px 4px;
  background: rgba(255, 184, 0, 0.12);
  border: 1px solid rgba(255, 184, 0, 0.4);
  border-radius: 12px;
  padding: 12px 16px;
  font-size: 0.85rem;
  color: #8a6400;
  display: flex;
  align-items: flex-start;
  gap: 8px;
  line-height: 1.5;
}

:global(.dark) .notice-banner {
  color: #ffd166;
  background: rgba(255, 184, 0, 0.1);
}

.notice-icon {
  font-size: 1rem;
  flex-shrink: 0;
  margin-top: 1px;
}

/* ── Sections ── */
.glass-section {
  margin: 16px 20px 0;
  background: rgba(255, 255, 255, 0.45);
  backdrop-filter: blur(14px);
  border-radius: 18px;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
}

.section-title {
  font-size: 1rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.desc-text {
  font-size: 0.9rem;
  line-height: 1.75;
  color: var(--text-secondary);
}

/* ── Transport Grid ── */
.transport-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.transport-card {
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 14px;
  padding: 14px 12px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.transport-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.transport-name {
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.3;
}

.transport-time {
  font-size: 0.95rem;
  font-weight: 800;
  color: var(--primary-blue, #0073e6);
  margin: 2px 0;
}

.transport-sub {
  font-size: 0.72rem;
  color: var(--text-secondary);
}

/* ── Info Rows ── */
.info-rows {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 11px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  font-size: 0.88rem;
}

.info-row:last-child {
  border-bottom: none;
}

.info-label {
  color: var(--text-secondary);
  font-weight: 500;
}

.info-value {
  font-weight: 700;
  color: var(--text-primary);
}

.info-value.highlight-green {
  color: #16a34a;
}

.info-value.warn {
  color: #dc2626;
}

/* ── Room Grid ── */
.room-grid {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.room-card {
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 14px;
  padding: 14px 16px;
}

.room-card--special {
  border-color: rgba(0, 115, 230, 0.3);
  background: rgba(0, 115, 230, 0.05);
}

.room-number {
  font-size: 0.78rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--primary-blue, #0073e6);
  margin-bottom: 6px;
}

.room-bed {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-primary);
}

.room-extra {
  font-size: 0.82rem;
  color: var(--text-secondary);
  margin-top: 6px;
  line-height: 1.5;
}

.text-muted-sm {
  font-size: 0.76rem;
  color: var(--text-secondary);
  opacity: 0.7;
}

/* ── Amenities Grid ── */
.amenities-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.amenity-item {
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 12px;
  padding: 10px 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 5px;
}

.amenity-icon {
  font-size: 1.3rem;
}

.amenity-label {
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--text-secondary);
  line-height: 1.3;
}

/* ── Bathroom ── */
.bathroom-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 12px;
}

.bathroom-card {
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 14px;
  padding: 14px 12px;
  text-align: center;
}

.bathroom-heading {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.bathroom-desc {
  font-size: 0.76rem;
  color: var(--text-secondary);
  line-height: 1.4;
}

.mt-2 {
  margin-top: 8px;
}

/* ── Nearby ── */
.nearby-list {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.nearby-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 11px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.nearby-item:last-child {
  border-bottom: none;
}

.nearby-icon {
  font-size: 1.2rem;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 10px;
  flex-shrink: 0;
}

.nearby-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
}

.nearby-name {
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--text-primary);
}

.nearby-walk {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--primary-blue, #0073e6);
  background: rgba(0, 115, 230, 0.08);
  padding: 3px 9px;
  border-radius: 999px;
}

/* ── Highlights ── */
.highlight-section {
  background: linear-gradient(135deg, rgba(0, 115, 230, 0.08), rgba(0, 184, 212, 0.06));
  border-color: rgba(0, 115, 230, 0.2);
}

.highlight-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.highlight-list li {
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--text-primary);
  padding: 10px 14px;
  background: rgba(255, 255, 255, 0.55);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.7);
  line-height: 1.4;
}
</style>
