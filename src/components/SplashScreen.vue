<template>
  <div class="splash-outer">
    <div
      class="splash"
      @touchstart.passive="onTouchStart" @touchmove.passive="onTouchMove" @touchend="onTouchEnd"
      @mousedown="onMouseDown" @mousemove="onMouseMove" @mouseup="onMouseUp" @mouseleave="onMouseUp"
    >
      <svg class="scene" viewBox="0 0 390 844" preserveAspectRatio="xMidYMax slice">
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   :stop-color="c.skyTop" />
            <stop offset="60%"  :stop-color="c.skyMid" />
            <stop offset="100%" :stop-color="c.skyBot" />
          </linearGradient>
          <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   :stop-color="c.sun" stop-opacity="0.6" />
            <stop offset="50%"  :stop-color="c.sun" stop-opacity="0.2" />
            <stop offset="100%" :stop-color="c.sun" stop-opacity="0" />
          </radialGradient>
          <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   :stop-color="c.waterTop" stop-opacity="0.88" />
            <stop offset="100%" :stop-color="c.waterBot" stop-opacity="0.5" />
          </linearGradient>
          <!-- clip so SVG mountain only fills lower portion of scene -->
          <clipPath id="mtClip">
            <rect x="0" :y="mtY - 10" width="390" height="844" />
          </clipPath>
          <!-- Grain / paper texture filter -->
          <filter id="grain" x="0%" y="0%" width="100%" height="100%" color-interpolation-filters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.68" numOctaves="4" stitchTiles="stitch" result="noise"/>
            <feColorMatrix in="noise" type="saturate" values="0" result="grey"/>
            <feBlend in="SourceGraphic" in2="grey" mode="overlay" result="blend"/>
            <feComposite in="blend" in2="SourceGraphic" operator="in"/>
          </filter>
        </defs>

        <!-- ① Sky -->
        <rect width="390" height="844" fill="url(#sky)" />


        <!-- ④ Sun glow halo (drawn BEFORE mountain so mountain covers bottom) -->
        <circle :cx="195" :cy="sunY" r="170" fill="url(#sunGlow)" :opacity="c.sunGlowA" />

        <!-- ⑤ Sun disc -->
        <circle :cx="195" :cy="sunY" r="82" :fill="c.sun" :opacity="c.sunDiscA" />


        <!-- ⑦ Fuji SVG from public — positioned at bottom, color-shifted via filter -->
        <!-- Mountain tint: dark at night, natural blue in day -->
        <g clip-path="url(#mtClip)">
          <image
            href="/富士山.svg"
            x="0" :y="mtY"
            width="390"
            :height="mtH"
            preserveAspectRatio="xMidYMin meet"
            :style="{ filter: mtFilter }"
          />
        </g>

        <!-- ⑧ Full-width lake (bottom, behind forest) -->
        <rect x="0" :y="lakeY" width="390" :height="844 - lakeY" fill="url(#water)" />

        <!-- ⑨ Sun reflection on water -->
        <ellipse cx="195" :cy="lakeY + 20" rx="90" ry="14"
          :fill="c.sun" :opacity="c.reflectA" />

        <!-- Water shimmer lines -->
        <line x1="80"  :y1="lakeY + 34" x2="310" :y2="lakeY + 34" stroke="white" stroke-width="1"   :opacity="c.shimA * 0.4" />
        <line x1="110" :y1="lakeY + 50" x2="280" :y2="lakeY + 50" stroke="white" stroke-width="0.6" :opacity="c.shimA * 0.25" />

        <!-- ⑩ Forest SVG (on top of lake) -->
        <image
          href="/forest.svg"
          x="0" :y="forestY"
          width="390" :height="forestH"
          preserveAspectRatio="xMidYMax meet"
          :style="{ filter: forestFilter }"
        />

        <!-- Night Overlay (Robust darkening for mobile) -->
        <rect width="390" height="844" fill="#040818" :opacity="c.nightA" style="pointer-events: none;" />

        <!-- ⑪ Cherry blossom — nalotu.svg, left side only -->
        <image
          href="/nalotu.svg"
          x="-30" :y="blossomY"
          :width="blossomW" :height="blossomH"
          preserveAspectRatio="xMinYMax meet"
          :opacity="c.blossomA"
        />
        <!-- ⑫ Grain / paper texture overlay (topmost layer) -->
        <rect width="390" height="844"
          filter="url(#grain)"
          opacity="0.13"
          style="mix-blend-mode: overlay; pointer-events: none;"
        />
      </svg>

      <!-- scroll hint -->
      <div class="hint" :style="{ opacity: hintA }">
        <div class="hint-arr">↑</div>
        <span class="hint-txt">往上滑動，迎接日出</span>
      </div>

      <!-- white flash overlay -->
      <div class="flash" :style="{ opacity: flashA }" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue'

const emit = defineEmits(['done'])

/* ── progress ── */
const p      = ref(0)
const flashA = ref(0)

/* ── gesture ── */
const DRAG = 340
const down = ref(false)
let sy = 0, sp = 0, raf = null

const onTouchStart = e => { sy = e.touches[0].clientY; sp = p.value; down.value = true;  stop() }
const onTouchMove  = e => { if (down.value) p.value = clamp(sp + (sy - e.touches[0].clientY) / DRAG) }
const onTouchEnd   = () => { if (!down.value) return; down.value = false; p.value > 0.04 ? animTo(1) : animTo(0) }
const onMouseDown  = e => { sy = e.clientY; sp = p.value; down.value = true;  stop() }
const onMouseMove  = e => { if (down.value) p.value = clamp(sp + (sy - e.clientY) / DRAG) }
const onMouseUp    = () => { if (!down.value) return; down.value = false; p.value > 0.04 ? animTo(1) : animTo(0) }

function animTo(target) {
  stop()
  const s = p.value, dur = Math.abs(target - s) * 2000, t0 = performance.now()
  const tick = now => {
    const t = Math.min((now - t0) / dur, 1)
    p.value = s + (target - s) * easeOut(t)
    if (t < 1) { raf = requestAnimationFrame(tick) }
    else        { p.value = target; if (target === 1) doFlash() }
  }
  raf = requestAnimationFrame(tick)
}
function doFlash() {
  const dur = 850, t0 = performance.now()
  const tick = now => {
    const t = Math.min((now - t0) / dur, 1)
    flashA.value = Math.min(1, t * 2.5)
    if (t < 1) { raf = requestAnimationFrame(tick) } else { emit('done') }
  }
  raf = requestAnimationFrame(tick)
}
function stop()    { if (raf) { cancelAnimationFrame(raf); raf = null } }
function clamp(v)  { return Math.max(0, Math.min(1, v)) }
function easeOut(t){ return 1 - Math.pow(1 - t, 3) }
onUnmounted(stop)

/* ── color helpers ── */
function lerp(a, b, t) { return a + (b - a) * t }
function lerpHex(a, b, t) {
  return '#' + [0,2,4].map(o => {
    const av = parseInt(a.slice(1+o,3+o),16), bv = parseInt(b.slice(1+o,3+o),16)
    return Math.round(av+(bv-av)*t).toString(16).padStart(2,'0')
  }).join('')
}
function kf(fr) {
  const v = p.value
  for (let i = 0; i < fr.length - 1; i++) {
    const [p1,c1] = fr[i], [p2,c2] = fr[i+1]
    if (v >= p1 && v <= p2) {
      const t = (p2-p1 < 0.001) ? 1 : (v-p1)/(p2-p1)
      return typeof c1 === 'number' ? lerp(c1,c2,t) : lerpHex(c1,c2,t)
    }
  }
  return fr[fr.length-1][1]
}

/* ── computed colors ── */
const c = computed(() => ({
  skyTop: kf([[0,'#04091a'],[.28,'#0c0828'],[.48,'#2a0a3a'],[.62,'#8c3010'],[.8,'#c87030'],[1,'#3a8eb8']]),
  skyMid: kf([[0,'#060c1e'],[.3,'#100830'],[.5,'#1e0830'],[.65,'#cc5520'],[.8,'#e09040'],[1,'#6dbad6']]),
  skyBot: kf([[0,'#08111e'],[.35,'#120a2a'],[.52,'#280a1a'],[.65,'#e07030'],[.8,'#f0b860'],[1,'#d4ecf7']]),
  starA:     kf([[0,1],[.38,.8],[.55,0]]),
  sun:       kf([[0,'#1a1000'],[.4,'#806000'],[.58,'#d4a020'],[.72,'#f0cc60'],[1,'#fce9a0']]),
  sunGlowA:  kf([[0,0],[.35,0],[.48,.18],[.65,.65],[.85,.45],[1,.28]]),
  sunDiscA:  kf([[0,0],[.44,0],[.5,.35],[.62,.9],[1,1]]),
  // mountain image tint via CSS filter (brightness + sepia for night→day)
  waterTop:  kf([[0,'#040c1c'],[.5,'#0a1838'],[.75,'#1a4860'],[1,'#4898b8']]),
  waterBot:  kf([[0,'#020810'],[.5,'#080e20'],[1,'#2a6888']]),
  reflectA:  kf([[0,0],[.55,0],[.7,.2],[1,.15]]),
  tree:      kf([[0,'#020508'],[.5,'#060e10'],[.75,'#0e2818'],[1,'#184028']]),
  blossom:   kf([[0,'#1a0808'],[.5,'#3a1010'],[.75,'#e07090'],[1,'#f090a8']]),
  blossomA:  kf([[0,0],[.65,0],[.8,.5],[1,1]]),
  cloudA:    kf([[0,0],[.55,0],[.7,.4],[.85,.85],[1,.95]]),
  shimA:     kf([[0,.1],[.5,.2],[1,.55]]),
  wispA:     kf([[0,0],[.55,0],[.75,.3],[1,.55]]),
  nightA:    kf([[0, 0.92], [0.35, 0.75], [0.55, 0], [1, 0]]),
}))

/* ── Mountain image tint filter (CSS filter string) ── */
// Night: very dark (brightness near 0) + blue tint
// Sunrise: warm (sepia + hue-rotate orange)
// Day: natural (no filter / brightness 1)
const mtFilter = computed(() => {
  const v = p.value
  if (v < 0.35) {
    const b = lerp(0.05, 0.25, v / 0.35)
    return `brightness(${b.toFixed(2)}) saturate(0.3) hue-rotate(180deg)`
  } else if (v < 0.60) {
    const t = (v - 0.35) / 0.25
    const b = lerp(0.25, 0.7, t)
    const h = lerp(180, 20, t)
    return `brightness(${b.toFixed(2)}) saturate(${lerp(0.3, 1.2, t).toFixed(2)}) hue-rotate(${h.toFixed(0)}deg) sepia(${lerp(0, 0.5, t).toFixed(2)})`
  } else if (v < 0.85) {
    const t = (v - 0.60) / 0.25
    const b = lerp(0.7, 1.0, t)
    const sepia = lerp(0.5, 0, t)
    return `brightness(${b.toFixed(2)}) saturate(${lerp(1.2, 1.0, t).toFixed(2)}) sepia(${sepia.toFixed(2)})`
  } else {
    return 'none'
  }
})

/* ── Forest image filter (same logic as mountain) ── */
const forestFilter = computed(() => {
  const v = p.value
  if (v < 0.35) return `brightness(${(0.04 + v * 0.3).toFixed(2)}) saturate(0)`
  if (v < 0.65) {
    const t = (v - 0.35) / 0.3
    return `brightness(${(0.14 + t * 0.86).toFixed(2)}) saturate(${t.toFixed(2)})`
  }
  return 'none'
})

/* ── Lake Y position ── */
const forestH = Math.round(390 * 419 / 1199)  // ≈ 136px
const forestY = 844 - forestH                  // anchored at very bottom
const lakeY   = computed(() => 844 - 58)       // thin water strip at very bottom
// SVG viewBox is 1203×888. We display it 390px wide.
// Rendered height = 390 * (888/1203) ≈ 288px
// Position mountain at bottom area, anchor at top of mountain image
const mtH = Math.round(390 * 888 / 1203)   // ≈ 288
const mtY = computed(() => 844 - mtH + 30)  // sits at bottom with slight overlap

/* ── Sun position ── */
// Start hidden deep in mountain area, rise to y=320 (clearly above mountain top)
const sunY = computed(() => {
  const v = p.value
  if (v < 0.42) return 730
  const t = (v - 0.42) / 0.58
  return 730 - t * 370   // 730 → 360
})

/* ── Hint: visible at start, hides while dragging, fades as p rises ── */
const hintA = computed(() => {
  if (down.value) return 0
  return Math.max(0, 1 - p.value * 5)
})



/* ── Cherry blossom (nalotu.svg) position ── */
// nalotu.svg viewBox: 576×1024 → display at width 215px on left side
const blossomW = 215
const blossomH = Math.round(blossomW * 1024 / 576)  // ≈ 383
const blossomY = 844 - blossomH                       // anchored to bottom


</script>

<style scoped>
/* ── Outer: centers the phone-sized window on desktop ── */
.splash-outer {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ── Inner: always phone width, full height ── */
.splash {
  position: relative;
  width: 100%;
  max-width: 600px;   /* match #app max-width in main.css */
  height: 100%;
  max-height: 100dvh;
  overflow: hidden;
  touch-action: none;
  cursor: ns-resize;
  user-select: none;
  -webkit-user-select: none;
}

.scene {
  width: 100%;
  height: 100%;
  display: block;
}

.twinkle { animation: twinkle 2.4s ease-in-out infinite alternate; }
@keyframes twinkle { from { opacity:.2 } to { opacity:1 } }

/* Hint */
.hint {
  position: absolute;
  bottom: 72px;
  left: 0; right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  pointer-events: none;
  transition: opacity .3s;
}
.hint-arr {
  font-size: 1.5rem;
  color: rgba(255,255,255,.88);
  animation: bounce 1.6s ease-in-out infinite;
}
.hint-txt {
  font-size: .72rem;
  font-weight: 700;
  letter-spacing: .14em;
  color: rgba(255,255,255,.65);
}
@keyframes bounce {
  0%,100% { transform: translateY(0) }
  50%      { transform: translateY(-8px) }
}

/* Flash */
.flash {
  position: absolute;
  inset: 0;
  background: #fff;
  pointer-events: none;
}
</style>
