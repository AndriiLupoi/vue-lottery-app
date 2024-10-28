<template>
  <div class="search-bar">
    <input
      type="text"
      placeholder="Search by name"
      v-model="searchTerm"
      @input="onSearch"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "SearchBar",
  setup(props, { emit }) {
    const searchTerm = ref("");

    const onSearch = () => {
      emit("filter-by-name", searchTerm.value);
    };

    return {
      searchTerm,
      onSearch,
    };
  },
});
</script>

<style scoped>
.search-bar {
  margin-bottom: 1rem;
}
.search-bar input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
