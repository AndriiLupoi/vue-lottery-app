<script setup lang="ts">
import { computed } from 'vue'
import { AuthService } from '@/helpers/auth-service'

const isUserAuthenticated = computed(() => {
  console.log(AuthService.userAuthenticated.value)
  return AuthService.userAuthenticated.value
})

const logout = () => {
  AuthService.logout()
}
</script>

<template>
  <ul class="navigation">
    <li>
      <RouterLink class="navigationLink" to="/">Home</RouterLink>
    </li>

    <li>
      <RouterLink class="navigationLink" to="/about">About</RouterLink>
    </li>

    <li>
      <RouterLink class="navigationLink" to="/lottery">Lottery</RouterLink>
    </li>

    <li>
      <RouterLink v-if="!isUserAuthenticated" class="navigationLink" to="/login">Login</RouterLink>
      <button @click="logout" v-if="isUserAuthenticated" class="btn btn-secondary">Logout</button>
    </li>
  </ul>
</template>

<style scoped>
.navigation {
  list-style: none;
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  margin: 0;
}

.navigationLink {
  text-decoration: none;
  font-size: 16px;
  padding: 5px;
  border-radius: 10px;
  color: black;
}

.navigationLink.link-active {
  color: white;
  background-color: #083578;
}
</style>
