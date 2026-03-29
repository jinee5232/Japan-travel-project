<template>
  <div class="app-layout">
    <router-view v-slot="{ Component }">
      <transition name="page" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <BottomNav />
  </div>
</template>

<script setup>
import BottomNav from './components/BottomNav.vue'
</script>

<style scoped>
.app-layout {
  position: relative;
  min-height: 100vh;
  min-height: 100dvh;
}
</style>
