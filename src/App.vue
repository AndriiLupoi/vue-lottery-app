<template>
  <div class="lottery-app">
    <!-- Winners Block -->
    <div class="card">
      <div class="d-flex">
        <div class="winner-tags gray-border">
          <span
            v-for="(winner, index) in winners"
            :key="index"
            class="badge blue"
          >
            {{ winner.name }}
            <button @click="removeWinner(index)" class="btn btn-sm btn-danger">
              &times;
            </button>
          </span>
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

    <!-- Registration Form -->
    <div class="card">
      <h3>REGISTER FORM</h3>
      <p>Please fill in all the fields.</p>
      <form @submit.prevent="registerParticipant" novalidate>
        <div class="form-group">
          <label>Name</label>
          <input
            v-model="newParticipant.name"
            type="text"
            class="form-control"
            placeholder="Enter user name"
            :class="{ 'is-invalid': nameError }"
            required
          />
          <div class="text-danger" v-if="nameError">{{ nameError }}</div>
        </div>
        <div class="form-group">
          <label>Date of Birth</label>
          <input
            v-model="newParticipant.dateOfBirth"
            type="date"
            class="form-control"
            :max="today"
            :class="{ 'is-invalid': dateError }"
            required
          />
          <div class="text-danger" v-if="dateError">{{ dateError }}</div>
        </div>
        <div class="form-group">
          <label>Email</label>
          <input
            v-model="newParticipant.email"
            type="email"
            class="form-control"
            placeholder="Enter email"
            :class="{ 'is-invalid': emailError }"
            required
          />
          <div class="text-danger" v-if="emailError">{{ emailError }}</div>
        </div>
        <div class="form-group">
          <label>Phone number</label>
          <input
            v-model="newParticipant.phoneNumber"
            type="tel"
            class="form-control"
            placeholder="Enter phone number"
            :class="{ 'is-invalid': phoneError }"
            required
          />
          <div class="text-danger" v-if="phoneError">{{ phoneError }}</div>
        </div>
        <button type="submit" class="btn btn-primary">Save</button>
      </form>
    </div>

    <!-- Participants Table -->
    <div class="card">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Email</th>
            <th>Phone number</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(participant, index) in participants" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ participant.name }}</td>
            <td>{{ participant.dateOfBirth }}</td>
            <td>{{ participant.email }}</td>
            <td>{{ participant.phoneNumber }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Validator } from "@/misc/Validator";
import { Participant } from "@/models/Participant";

export default defineComponent({
  name: "LotteryApp",
  setup() {
    const today = new Date().toISOString().split("T")[0]; // Current date
    const newParticipant = ref<Participant>({
      name: "",
      dateOfBirth: "",
      email: "",
      phoneNumber: "",
    });

    // Participants
    const participants = ref<Participant[]>([
      {
        name: "John Doe",
        dateOfBirth: "1990-01-01",
        email: "john@example.com",
        phoneNumber: "+1234567890",
      },
      {
        name: "Jane Smith",
        dateOfBirth: "1985-05-15",
        email: "jane@example.com",
        phoneNumber: "+1987654321",
      },
      {
        name: "Alice Johnson",
        dateOfBirth: "1992-03-10",
        email: "alice@example.com",
        phoneNumber: "+11234567890",
      },
      {
        name: "Bob Brown",
        dateOfBirth: "1988-07-22",
        email: "bob@example.com",
        phoneNumber: "+19987654321",
      },
      {
        name: "Charlie Green",
        dateOfBirth: "1995-10-05",
        email: "charlie@example.com",
        phoneNumber: "+17654321098",
      },
    ]);
    const winners = ref<Participant[]>([]);

    // Error messages
    const nameError = ref("");
    const dateError = ref("");
    const emailError = ref("");
    const phoneError = ref("");

    const registerParticipant = () => {
      nameError.value = Validator.validateName(newParticipant.value.name);
      dateError.value = Validator.validateDateOfBirth(
        newParticipant.value.dateOfBirth,
        today
      );
      emailError.value = Validator.validateEmail(newParticipant.value.email);
      phoneError.value = Validator.validatePhoneNumber(
        newParticipant.value.phoneNumber
      );

      if (
        nameError.value ||
        dateError.value ||
        emailError.value ||
        phoneError.value
      ) {
        return;
      }

      participants.value.push({ ...newParticipant.value });
      newParticipant.value.name = "";
      newParticipant.value.dateOfBirth = "";
      newParticipant.value.email = "";
      newParticipant.value.phoneNumber = "";
    };

    const selectWinner = () => {
      if (participants.value.length > 0 && winners.value.length < 3) {
        const randomIndex = Math.floor(
          Math.random() * participants.value.length
        );
        const winner = participants.value[randomIndex];
        winners.value.push(winner);
        participants.value.splice(randomIndex, 1);
      }
    };

    const removeWinner = (index: number) => {
      participants.value.push(winners.value[index]);
      winners.value.splice(index, 1);
    };

    return {
      newParticipant,
      participants,
      winners,
      nameError,
      dateError,
      emailError,
      phoneError,
      today,
      registerParticipant,
      selectWinner,
      removeWinner,
    };
  },
});
</script>

<style scoped>
/** {
  border: solid green 1px;
}*/

.lottery-app {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  max-width: 800px;
  margin: 0 auto;
}

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

.winner-tags .badge {
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

.winner-tags button {
  margin-left: 2px;
  margin-top: 1px;
}

.gray-border {
  border: solid gray 1px;
  border-radius: 10px;
  padding: 10px;
}

form div {
  margin-bottom: 10px;
}

.text-danger {
  color: red;
  font-size: 0.875rem;
}

table {
  width: 100%;
}

thead {
  background-color: #e9ecef;
}

th,
td {
  padding: 8px;
  text-align: center;
}

button {
  margin-top: 10px;
}
</style>
