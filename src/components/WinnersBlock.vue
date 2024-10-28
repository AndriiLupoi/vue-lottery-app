<template>
  <div class="card">
    <div class="d-flex">
      <div class="winner-tags gray-border">
        <WinnerComponent
          v-for="(winner, index) in winners"
          :key="index"
          :winner="winner"
          :index="index"
          @remove-winner="removeWinner"
        />
        <span class="badge">Winners</span>
      </div>
    </div>
    <button
      class="btn btn-primary mt-2"
      :disabled="winners.length >= 3 || participants.length === 0"
      @click="selectWinner"
    >
      New winner
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Participant } from "@/models/Participant";
import WinnerComponent from "@/components/WinnerComponent.vue"; // Adjust the path as necessary

export default defineComponent({
  name: "WinnersBlock",
  components: {
    WinnerComponent,
  },
  props: {
    winners: {
      type: Array as () => Participant[],
      default: () => [],
    },
    participants: {
      type: Array as () => Participant[],
      default: () => [],
    },
  },
  emits: ["remove-winner", "select-winner"],
  setup(props, { emit }) {
    const removeWinner = (index: number) => emit("remove-winner", index);
    const selectWinner = () => emit("select-winner");

    return {
      removeWinner,
      selectWinner,
    };
  },
});
</script>

<style scoped>
.card {
  border: 1px solid #dee2e6;
  border-radius: 8px;
  background-color: #f8f9fa;
  padding: 3%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.d-flex {
  display: flex;
  flex-direction: column;
}

.winner-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.gray-border {
  border: solid gray 1px;
  border-radius: 10px;
  padding: 10px;
}
.badge {
  display: flex;
  color: black;
  height: 35px;
  align-items: center;
  gap: 5px;
  padding: 10px;
  font-size: 1rem;
}
</style>
