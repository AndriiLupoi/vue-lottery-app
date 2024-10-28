<script lang="ts">
import { defineComponent, ref, computed, watch } from "vue";
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

    // Додаємо watch для пропсів participants
    watch(
      () => props.participants,
      (newParticipants) => {
        localParticipants.value = [...newParticipants];
      }
    );

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
      localParticipants.value.push(newParticipant); // Додаємо нового учасника
      MyStorage.saveParticipants(localParticipants.value);
      closeModal(); // Закриваємо модальне вікно після створення
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
      searchTerm.value = search; // Оновлюємо пошуковий термін на основі введення
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
      createParticipant, // Повертаємо createParticipant
      deleteParticipant,
      sortByName,
      sortByDateOfBirth,
      filterParticipants,
    };
  },
});
</script>
