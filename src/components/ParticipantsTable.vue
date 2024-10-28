<template>
  <div class="card">
    <SearchBar @filter-by-name="filterParticipants" />
    <table class="table table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>
            Name
            <button
              @click="sortByName"
              aria-label="Sort by Name"
              class="sort-button"
            >
              <img src="@/assets/sort-alpha-down.svg" alt="AZ" />
            </button>
          </th>
          <th>
            Date of Birth
            <button
              @click="sortByDateOfBirth"
              aria-label="Sort by Date of Birth"
              class="sort-button"
            >
              <img src="@/assets/sort-down.svg" alt="^" />
            </button>
          </th>
          <th>Email</th>
          <th>Phone number</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(participant, index) in filteredParticipants" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ participant.name }}</td>
          <td>{{ participant.dateOfBirth }}</td>
          <td>{{ participant.email }}</td>
          <td>{{ participant.phoneNumber }}</td>
          <td>
            <button @click="openEditModal(participant)">Edit</button>
          </td>
          <td>
            <button @click="openDeleteModal(participant)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <ModalComponent
      v-if="isModalVisible && selectedParticipant"
      :isVisible="isModalVisible"
      :participant="selectedParticipant"
      @update:participant="updateParticipant"
      @create="createParticipant"
      @close="closeModal"
    />

    <ModalConfirm
      v-if="isDeleteModalVisible && selectedParticipant"
      :isVisible="isDeleteModalVisible"
      :participant="selectedParticipant"
      @confirm="deleteParticipant"
      @close="closeDeleteModal"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { Participant } from "@/models/Participant";
import ModalComponent from "@/components/ModalComponent.vue";
import ModalConfirm from "@/components/ModalConfirm.vue";
import MyStorage from "@/misc/MyStorage";
import SearchBar from "@/components/SearchBar.vue";

export default defineComponent({
  name: "ParticipantsTable",
  props: {
    participants: {
      type: Array as () => Participant[],
      required: true,
      default: () => [],
    },
  },
  components: {
    ModalComponent,
    ModalConfirm,
    SearchBar,
  },
  setup(props) {
    const isModalVisible = ref(false);
    const isDeleteModalVisible = ref(false);
    const selectedParticipant = ref<Participant | null>(null);
    const localParticipants = ref<Participant[]>([...props.participants]);
    const searchTerm = ref("");

    const filteredParticipants = computed(() => {
      return localParticipants.value.filter((participant) =>
        participant.name.toLowerCase().includes(searchTerm.value.toLowerCase())
      );
    });

    const openEditModal = (participant: Participant) => {
      selectedParticipant.value = { ...participant };
      isModalVisible.value = true;
    };

    const closeModal = () => {
      isModalVisible.value = false;
      selectedParticipant.value = null;
    };

    const openDeleteModal = (participant: Participant) => {
      selectedParticipant.value = { ...participant };
      isDeleteModalVisible.value = true;
    };

    const closeDeleteModal = () => {
      selectedParticipant.value = null;
      isDeleteModalVisible.value = false;
    };

    const updateParticipant = (updatedParticipant: Participant) => {
      const index = localParticipants.value.findIndex(
        (p) => p.email === updatedParticipant.email
      );
      if (index !== -1) {
        localParticipants.value[index] = updatedParticipant;
        MyStorage.saveParticipants(localParticipants.value);
      }
    };

    const createParticipant = (newParticipant: Participant) => {
      localParticipants.value.push(newParticipant); // Add the new participant to localParticipants
      MyStorage.saveParticipants(localParticipants.value);
      closeModal(); // Close the modal after creation
    };

    const deleteParticipant = () => {
      if (selectedParticipant.value) {
        const emailToDelete = selectedParticipant.value.email;
        localParticipants.value = localParticipants.value.filter(
          (participant) => participant.email !== emailToDelete
        );
        MyStorage.saveParticipants(localParticipants.value);
        closeDeleteModal();
      }
    };

    const sortByName = () => {
      localParticipants.value.sort((a, b) => a.name.localeCompare(b.name));
    };

    const sortByDateOfBirth = () => {
      localParticipants.value.sort((a, b) => {
        return (
          new Date(a.dateOfBirth).getTime() - new Date(b.dateOfBirth).getTime()
        );
      });
    };

    const filterParticipants = (search: string) => {
      searchTerm.value = search; // Update search term based on the input
    };

    return {
      isModalVisible,
      isDeleteModalVisible,
      selectedParticipant,
      filteredParticipants,
      openEditModal,
      closeModal,
      openDeleteModal,
      closeDeleteModal,
      updateParticipant,
      createParticipant, // Include createParticipant in the return
      deleteParticipant,
      sortByName,
      sortByDateOfBirth,
      filterParticipants,
    };
  },
});
</script>

<style scoped>
.sort-button {
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 5px;
}
.sort-button i {
  font-size: 16px; /* Adjust icon size */
}
</style>
