<template>
  <div v-if="isVisible" class="modal-overlay">
    <div class="modal-content">
      <h3>Confirm Deletion</h3>
      <p>
        Ви дійсно бажаєте видалити учасника "{{ participant.name }}", "{{
          participant.email
        }}"?
      </p>
      <div class="button-group">
        <button class="btn btn-danger" @click="confirm">Так</button>
        <button class="btn btn-secondary" @click="close">Ні</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted } from "vue";
import { Participant } from "@/models/Participant";

export default defineComponent({
  name: "ModalConfirm",
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
    participant: {
      type: Object as () => Participant,
      required: true,
    },
  },
  emits: ["confirm", "close"],
  setup(props, { emit }) {
    const confirm = () => {
      emit("confirm");
    };

    const close = () => {
      emit("close");
    };

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      } else if (event.key === "Enter") {
        confirm();
      }
    };
    onMounted(() => {
      window.addEventListener("keydown", handleKeydown);
    });
    onBeforeUnmount(() => {
      window.removeEventListener("keydown", handleKeydown);
    });

    return {
      confirm,
      close,
    };
  },
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.button-group {
  display: flex;
  justify-content: space-between; /* Space buttons evenly */
}

.btn {
  padding: 10px 15px; /* Padding for buttons */
  border: none;
  border-radius: 4px; /* Rounded corners */
  cursor: pointer; /* Pointer cursor on hover */
}

.btn-danger {
  background-color: #dc3545; /* Danger button color */
  color: white; /* Text color */
}

.btn-secondary {
  background-color: #6c757d; /* Secondary button color */
  color: white; /* Text color */
}
</style>
