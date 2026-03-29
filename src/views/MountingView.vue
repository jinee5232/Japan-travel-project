<template>
  <main class="page-container">
    <header class="header-section">
      <h1 class="page-title">富士山攻頂</h1>
      <p class="subtitle">08.01 - 08.02 行程表</p>
    </header>

    <section class="card-outline glass-panel mb-6">
      <div class="card-header">
        <h2 class="text-xl font-bold">🧗 野貓團隊 87cat</h2>
      </div>
      <div class="card-body">
        <div class="meeting-point glass-card">
          <p class="font-bold text-primary-blue mb-1">📍 集合地點與時間</p>
          <p class="text-sm">{{ tripData.mountFuji.meetingPoint }}</p>
        </div>
        <p class="mb-4 text-secondary text-sm">ℹ️ {{ tripData.mountFuji.notes }}</p>
        <a :href="tripData.mountFuji.url" target="_blank" class="action-btn">
          🔗 旅行團官方網站
        </a>
      </div>
    </section>

    <section class="mt-6">
      <h3 class="section-title">🕒 兩日攻頂行程預估</h3>
      
      <div v-for="day in tripData.mountFuji.schedule" :key="day.day" class="schedule-day mb-6">
        <h4 class="day-title text-lg font-bold">{{ day.day }}</h4>
        <div class="timeline">
          <div v-for="(event, index) in day.events" :key="index" class="timeline-event">
            <div class="event-time font-mono">{{ event.time }}</div>
            <div class="event-action">{{ event.action }}</div>
          </div>
        </div>
      </div>
    </section>

    <section class="mt-8 mb-12">
      <h3 class="section-title">🎒 富士山登山完全指南</h3>

      <!-- Section 1: 山屋與入住 -->
      <details class="glass-accordion mb-4" open>
        <summary class="font-bold text-lg"><span class="title-text">🏠 山屋須知與必備物品</span><span class="material-symbols-rounded accordion-icon">expand_more</span></summary>
        <div class="accordion-content">
          <h5 class="font-bold text-primary-gray mb-2">山屋是什麼樣子？（以萬年雪山莊為例）</h5>
          <ul class="text-secondary check-list mb-4">
            <li>🚿 無洗澡設備，山上水資源珍貴</li>
            <li>🔌 無插座，請自備行動電源</li>
            <li>💤 通鋪睡袋，戴耳塞防打呼</li>
            <li>❄ 室內暖、有提供室內拖鞋（也可自帶）</li>
            <li>🚽 山屋住客免費用廁所</li>
            <li>🚻 公共廁所需現金（200日圓/次）、有衛生紙</li>
            <li>🍱 晚餐是定食，份量普通，可加點（記得多帶現金）</li>
            <li>💧 提供熱水喝（需付費）</li>
          </ul>
          <h5 class="font-bold text-primary-gray mb-2">入住山屋必備物品</h5>
          <ul class="text-secondary check-list">
            <li>現金（山上無法刷卡）</li>
            <li>行動電源、頭燈、耳塞、濕紙巾</li>
            <li>輕便清潔用品（無法洗澡）</li>
            <li>保暖衣物（山屋外體感超冷）</li>
          </ul>
        </div>
      </details>

      <!-- Section 2: 地形、天氣與路線 -->
      <details class="glass-accordion mb-4">
        <summary class="font-bold text-lg"><span class="title-text">🌦 地形、天氣與路線</span><span class="material-symbols-rounded accordion-icon">expand_more</span></summary>
        <div class="accordion-content">
          <p class="mb-2"><strong>🟡 吉田線（人多、路長）</strong>：緩坡碎石路，人多如菜市場。上下山不同路線。滑，需登山杖＆護膝，防跌傷。</p>
          <p class="mb-2"><strong>🔴 富士宮線（短但陡）</strong>：跨距大、有大石塊。上下山同路線。攻頂路線較短，大腿肌力重要。</p>
          <p class="mb-4"><strong>🔥 共同提醒</strong>：無遮蔽物，防風防曬很重要！火山口風強，<strong>禁用雨傘或拖地雨衣</strong>；不建議穿雨鞋易滑倒。登山杖+護膝超重要！</p>
          <h5 class="font-bold text-primary-gray mb-2">天氣很瘋狂</h5>
          <ul class="text-secondary check-list">
            <li>上午晴天，下午可能突變暴雨</li>
            <li>山頂風強，體感接近 0°C</li>
            <li>必備裝備：保暖、防風、防水、防曬！</li>
          </ul>
        </div>
      </details>

      <!-- Section 3: 裝備清單 -->
      <details class="glass-accordion mb-4">
        <summary class="font-bold text-lg"><span class="title-text">🎒 完整裝備清單</span><span class="material-symbols-rounded accordion-icon">expand_more</span></summary>
        <div class="accordion-content">
          <ul class="text-secondary check-list">
            <li><strong>個人登山裝備：</strong> 登山大背包(30-60L含腰帶)、背包防雨套、內層防水大塑膠袋、登山杖2支、頭燈+備用電池。</li>
            <li><strong>個人衣物：</strong> 吸濕排汗底層衣(避純棉)、保暖中層(刷毛/羽絨)、防風防水外層+兩件式雨衣、耐磨登山長褲、兩截式雨衣、登山鞋(高筒)、毛帽、防水保暖手套、兩層襪(五指+羊毛)、備用衣物一套、護膝、頭巾。</li>
            <li><strong>其他用品：</strong> 飲用水(至少1000cc)、行動糧(巧克力/能量飲)、個人藥品(高山症藥等)、身分證件、日幣現金與零錢、濕紙巾與衛生紙、垃圾袋(垃圾自行帶下山)。</li>
          </ul>
        </div>
      </details>

      <!-- Section 4: 攻頂與高山症預防 -->
      <details class="glass-accordion mb-4">
        <summary class="font-bold text-lg"><span class="title-text">🧠 攻頂策略與高山症防護</span><span class="material-symbols-rounded accordion-icon">expand_more</span></summary>
        <div class="accordion-content">
          <h5 class="font-bold text-primary-gray mb-2">攻頂注意事項</h5>
          <ul class="text-secondary check-list mb-4">
            <li>凌晨出發，保暖＋防風很重要</li>
            <li>攜帶：頭燈、防水手套、毛帽、防風外套、保暖內層</li>
            <li>火山口風超強，不建議久留；攻頂隊伍可能塞車，請保持節奏與耐心</li>
            <li>日本文化：勿大聲喧嘩、垃圾帶下山、下山禮讓上山者</li>
          </ul>
          <h5 class="font-bold text-primary-gray mb-2">如何避免高山症？</h5>
          <ul class="text-secondary check-list mb-4">
            <li>前一晚睡飽，不衝刺慢慢走，調整呼吸</li>
            <li>注重保暖（尤其頭和腳），可預防性服用「丹木斯」（需醫師處方）</li>
            <li>不建議單攻，放鬆心情，發生時馬上下撤海拔最有效</li>
          </ul>
          <h5 class="font-bold text-primary-gray mb-2">行前體能訓練</h5>
          <ul class="text-secondary check-list">
            <li>爬樓梯取代電梯、室內慢跑、深蹲訓練</li>
            <li>實際背包走郊山，學習正確使用登山杖</li>
          </ul>
        </div>
      </details>

      <!-- Section 5: 特殊族群建議 -->
      <details class="glass-accordion mb-4">
        <summary class="font-bold text-lg"><span class="title-text">👵🧒 長輩與小孩特別注意</span><span class="material-symbols-rounded accordion-icon">expand_more</span></summary>
        <div class="accordion-content">
          <h5 class="font-bold text-primary-gray mb-2">小朋友登山</h5>
          <ul class="text-secondary check-list mb-4">
            <li>小孩不是縮小版大人，缺氧與疲勞反應更明顯</li>
            <li>至少 5–6 歲以上較適合</li>
            <li>補給與保暖比大人更重要（少量多餐、補電解質）</li>
            <li>觀察疲勞警訊：走路變慢、話變少、臉色怪</li>
          </ul>
          <h5 class="font-bold text-primary-gray mb-2">長輩 / 有慢性病者</h5>
          <ul class="text-secondary check-list">
            <li>先詢問主治醫師，控制好血壓血糖等慢性病</li>
            <li>慢、穩、分段上升，補水與電解質必須重視</li>
            <li>攜帶必要監測工具，同行者需了解其用藥狀況</li>
          </ul>
        </div>
      </details>
    </section>
  </main>
</template>

<script setup>
import { tripData } from '@/data/tripData';
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

.card-outline {
  padding: 20px;
}

.card-header {
  margin-bottom: 16px;
  border-bottom: 1px solid rgba(0,0,0,0.05);
  padding-bottom: 12px;
}

.meeting-point {
  padding: 12px 16px;
  background: var(--glass-bg);
  border-left: 4px solid var(--primary-blue);
  margin-bottom: 16px;
}

.action-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px;
  background: var(--text-primary);
  color: white;
  border-radius: var(--border-radius-lg);
  font-weight: 600;
  text-decoration: none;
  transition: transform 0.2s;
  font-size: 0.95rem;
}

.action-btn:active {
  transform: scale(0.98);
}

.section-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 16px;
  color: var(--text-primary);
}

.schedule-day {
  background: rgba(255, 255, 255, 0.45);
  backdrop-filter: blur(10px);
  border-radius: var(--border-radius-xl);
  padding: 20px;
  box-shadow: var(--glass-shadow);
  border: 1px solid rgba(255, 255, 255, 0.5);
}

.day-title {
  color: var(--primary-blue);
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 2px dashed rgba(0, 115, 230, 0.2);
}

.timeline {
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 48px;
  top: 8px;
  bottom: 8px;
  width: 2px;
  background: rgba(0, 115, 230, 0.2);
}

.timeline-event {
  display: flex;
  gap: 16px;
  position: relative;
}

.event-time {
  width: 48px;
  font-weight: 700;
  color: var(--text-secondary);
  font-size: 0.85rem;
  flex-shrink: 0;
  padding-top: 2px;
}

.event-action {
  flex: 1;
  background: white;
  padding: 12px 16px;
  border-radius: var(--border-radius-lg);
  box-shadow: 0 2px 8px rgba(0,0,0,0.03);
  font-size: 0.95rem;
  color: var(--text-primary);
  line-height: 1.5;
  position: relative;
}

.event-action::before {
  content: '';
  position: absolute;
  left: -20px;
  top: 14px;
  width: 8px;
  height: 8px;
  background: var(--primary-blue);
  border-radius: 50%;
  box-shadow: 0 0 0 4px rgba(0, 115, 230, 0.1);
}

/* Accordion Styles */
.glass-accordion {
  background: rgba(255, 255, 255, 0.45);
  backdrop-filter: blur(10px);
  border-radius: var(--border-radius-lg);
  padding: 16px 20px;
  box-shadow: var(--glass-shadow);
  border: 1px solid rgba(255, 255, 255, 0.6);
  transition: all 0.3s ease;
  overflow: hidden;
}

.glass-accordion summary {
  list-style: none; /* fix for firefox/webkit */
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--text-primary);
  cursor: pointer;
}

.glass-accordion summary::-webkit-details-marker {
  display: none;
}

.title-text {
  flex: 1;
}

.accordion-icon {
  color: var(--primary-blue);
  transition: transform 0.3s ease;
  font-size: 1.5rem;
}

.glass-accordion[open] .accordion-icon {
  transform: rotate(180deg);
}

.accordion-content {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px dashed rgba(0, 115, 230, 0.2);
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.6;
}

.check-list {
  list-style: none;
  padding: 0;
}

.check-list li {
  position: relative;
  padding-left: 28px;
  margin-bottom: 12px;
}

.check-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  top: -1px;
  color: var(--primary-blue);
  font-weight: bold;
  font-size: 1.1rem;
}
</style>
