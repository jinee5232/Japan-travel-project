<template>
  <nav class="bottom-nav glass-panel">
    <router-link to="/" class="nav-item" active-class="active">
      <div class="icon material-symbols-rounded">home</div>
      <span>首頁</span>
    </router-link>
    <router-link to="/places" class="nav-item" active-class="active">
      <div class="icon material-symbols-rounded">location_on</div>
      <span>景點</span>
    </router-link>
    <router-link to="/shopping" class="nav-item" active-class="active">
      <div class="icon material-symbols-rounded">local_mall</div>
      <span>購物</span>
    </router-link>
    <router-link to="/mounting" class="nav-item" active-class="active">
      <div class="icon material-symbols-rounded">landscape</div>
      <span>登山</span>
    </router-link>
    <router-link to="/accommodation" class="nav-item" active-class="active">
      <div class="icon material-symbols-rounded">hotel</div>
      <span>住宿</span>
    </router-link>
  </nav>
</template>

<style scoped>
.bottom-nav {
  position: fixed;
  bottom: env(safe-area-inset-bottom, 20px);
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 32px);
  max-width: 568px; /* Slightly less than app wrapper */
  display: flex;
  justify-content: space-around;
  padding: 12px 0;
  border-radius: var(--border-radius-pill);
  z-index: 100;
  border: 1px solid rgba(255, 255, 255, 0.4);
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--text-secondary);
  transition: all 0.3s ease;
  flex: 1;
}

.nav-item .icon {
  font-size: 1.5rem;
  margin-bottom: 4px;
  color: var(--text-secondary);
  opacity: 0.6;
  transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
}

.nav-item span {
  font-size: 0.7rem;
  font-weight: 600;
}

.nav-item.active {
  color: var(--primary-blue);
}

.nav-item.active .icon {
  color: var(--primary-blue);
  opacity: 1;
  transform: translateY(-2px) scale(1.1);
}
</style>
