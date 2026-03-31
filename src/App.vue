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
import { useRouter } from 'vue-router'
import BottomNav from './components/BottomNav.vue'
import SplashScreen from './components/SplashScreen.vue'

const router = useRouter()

// Module-level flag resets on every page refresh
let _splashDone = new URLSearchParams(window.location.search).has('skip')

// Force back to home on any full page reload to ensure splash plays 
// and to avoid 404 issues on static hosting refresh.
if (window.location.hash && window.location.hash !== '#/' && !_splashDone) {
  router.replace('/')
}

const introDone = ref(_splashDone)
const fadingIn  = ref(_splashDone)

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
