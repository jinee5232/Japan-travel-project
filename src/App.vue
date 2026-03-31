<template>
  <div class="app-layout">
    <!-- Splash intro: shows every page load, skipped only during SPA navigation -->
    <SplashScreen v-if="!introDone" @done="onIntroDone" />

    <!-- Main app: fade in from white after splash -->
    <template v-else>
      <div class="main-wrap" :class="{ 'fade-in': fadingIn }">
        <router-view v-slot="{ Component }">
          <transition name="page" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
        <BottomNav />
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import BottomNav from './components/BottomNav.vue'
import SplashScreen from './components/SplashScreen.vue'

// Module-level flag: resets on every page refresh (JS reload),
// but survives SPA route changes within the same session.
// ?skip=1 in URL bypasses splash for dev convenience.
let _splashDone = new URLSearchParams(window.location.search).has('skip')

const introDone = ref(_splashDone)
const fadingIn  = ref(_splashDone) // if skipping, start fully visible

async function onIntroDone() {
  _splashDone = true
  introDone.value = true
  await nextTick()
  requestAnimationFrame(() => { fadingIn.value = true })
}
</script>

<style scoped>
.app-layout {
  position: relative;
  min-height: 100vh;
  min-height: 100dvh;
}

/* Start invisible (white from flash), animate to fully visible */
.main-wrap {
  opacity: 0;
  transition: opacity 0.7s ease;
}
.main-wrap.fade-in {
  opacity: 1;
}
</style>
