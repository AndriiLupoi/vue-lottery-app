<script setup lang="ts">

import AppNavigation from "@/components/AppNavigation.vue";
</script>

<template>
  <div class="header">
    <div>
      <h1 class="m-2">Lottery</h1>
    </div>
    <div class="headerNavigation">
      <AppNavigation></AppNavigation>
    </div>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid black;
  background-color: #0d6efd;
}

.headerNavigation {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>