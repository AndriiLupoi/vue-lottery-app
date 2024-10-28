<!-- use slots to pass data in modal -->
<!-- one modal for all purposes -->
<template>
  <div v-if="isVisible" class="modal-overlay">
    <div class="modal-content">
      <h3>Edit Participant</h3>
      <form @submit.prevent="updateParticipant">
        <div class="form-group">
          <label>Name:</label>
          <input v-model="localParticipant.name" type="text" required />
          <span v-if="nameError" class="text-danger">{{ nameError }}</span>
        </div>
        <div class="form-group">
          <label>Date of Birth:</label>
          <input v-model="localParticipant.dateOfBirth" type="date" required />
          <span v-if="dateError" class="text-danger">{{ dateError }}</span>
        </div>
        <div class="form-group">
          <label>Email:</label>
          <input v-model="localParticipant.email" type="email" required />
          <span v-if="emailError" class="text-danger">{{ emailError }}</span>
        </div>
        <div class="form-group">
          <label>Phone Number:</label>
          <input v-model="localParticipant.phoneNumber" type="tel" required />
          <span v-if="phoneError" class="text-danger">{{ phoneError }}</span>
        </div>
        <div class="button-group">
          <button type="submit" class="btn btn-primary">Update Data</button>
          <button type="button" @click="closeModal" class="btn btn-secondary">
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { Participant } from "@/models/Participant";
import { Validator } from "@/misc/Validator";

export default defineComponent({
  name: "ModalComponent",
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
  emits: ["update:participant", "close"],
  setup(props, { emit }) {
    const localParticipant = ref<Participant>({ ...props.participant });
    const nameError = ref("");
    const dateError = ref("");
    const emailError = ref("");
    const phoneError = ref("");

    watch(
      () => props.participant,
      (newParticipant) => {
        localParticipant.value = { ...newParticipant };
      }
    );

    const updateParticipant = () => {
      nameError.value = Validator.validateName(localParticipant.value.name);
      dateError.value = Validator.validateDateOfBirth(
        localParticipant.value.dateOfBirth,
        new Date().toISOString().split("T")[0]
      );
      emailError.value = Validator.validateEmail(
        localParticipant.value.email,
        true
      );
      phoneError.value = Validator.validatePhoneNumber(
        localParticipant.value.phoneNumber
      );

      if (
        !nameError.value &&
        !dateError.value &&
        !emailError.value &&
        !phoneError.value
      ) {
        emit("update:participant", localParticipant.value);
        closeModal();
      }
    };

    const closeModal = () => {
      emit("close");
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      } else if (event.key === "Enter") {
        updateParticipant();
      }
    };

    onMounted(() => {
      window.addEventListener("keydown", handleKeyDown);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("keydown", handleKeyDown);
    });
    return {
      localParticipant,
      nameError,
      dateError,
      emailError,
      phoneError,
      updateParticipant,
      closeModal,
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
  z-index: 1000; /* Ensure it overlays other content */
}

.modal-content {
  background-color: #fff;
  padding: 30px; /* Increased padding for more space */
  border-radius: 10px; /* More rounded corners */
  width: 400px; /* Increased width */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3); /* Deeper shadow */
  animation: fadeIn 0.3s; /* Add fade-in animation */
}

.form-group {
  margin-bottom: 15px; /* Space between form elements */
}

label {
  display: block; /* Ensure labels are block elements */
  margin-bottom: 5px; /* Space between label and input */
}

input {
  width: 100%; /* Full width inputs */
  padding: 8px; /* Padding inside inputs */
  border: 1px solid #ccc; /* Border style */
  border-radius: 4px; /* Slightly rounded corners */
  transition: border-color 0.3s; /* Smooth transition */
}

input:focus {
  border-color: #007bff; /* Blue border on focus */
  outline: none; /* Remove default outline */
}

.text-danger {
  color: red; /* Error message color */
  font-size: 0.9em; /* Smaller font size for error messages */
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

.btn-primary {
  background-color: #007bff; /* Primary button color */
  color: white; /* Text color */
}

.btn-secondary {
  background-color: #6c757d; /* Secondary button color */
  color: white; /* Text color */
}

.btn-primary:hover {
  background-color: #0056b3; /* Darker shade on hover */
}

.btn-secondary:hover {
  background-color: #5a6268; /* Darker shade on hover */
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
