<template>
  <span class="badge blue">
    {{ winner.name }}
    <button @click="remove" class="btn btn-sm btn-danger">&times;</button>
  </span>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Participant } from "@/models/Participant";

export default defineComponent({
  name: "WinnerComponent",
  props: {
    winner: {
      type: Object as () => Participant,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  emits: ["remove-winner"],
  setup(props, { emit }) {
    const remove = () => emit("remove-winner", props.index);

    return {
      remove,
    };
  },
});
</script>

<style scoped>
.badge {
  display: flex;
  color: black;
  height: 35px;
  align-items: center;
  gap: 5px;
  padding: 10px;
  font-size: 1rem;
}

.blue {
  background-color: rgba(13, 110, 253, 0.5);
}
</style>
