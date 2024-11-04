<script setup lang="ts"></script>

<template>
  <div class="wrapper">
    <h1>About page</h1>
    <hr class="line" />
    <p>My name is Ivan</p>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
  margin-left: 20px;
}

.line {
  height: 1px;
  width: 90%;
  border: 2px solid black;
}

p {
  font-size: 18px;
}
</style>
