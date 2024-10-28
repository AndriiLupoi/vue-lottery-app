<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { Validator } from "@/misc/Validator";
import { Participant } from "@/models/Participant";
import ParticipantInput from "@/components/ParticipantInput.vue"; // Adjust the path as necessary
import ActionButton from "@/components/ActionButton.vue"; // Import the new ActionButton component

export default defineComponent({
  name: "RegistrationForm",
  components: {
    ParticipantInput,
    ActionButton,
  },
  props: {
    newParticipant: Object as () => Participant,
    today: String,
  },
  emits: ["register-participant", "update:newParticipant"],
  setup(props, { emit }) {
    const localParticipant = ref<Participant>({
      name: props.newParticipant?.name || "",
      dateOfBirth: props.newParticipant?.dateOfBirth || "",
      email: props.newParticipant?.email || "",
      phoneNumber: props.newParticipant?.phoneNumber || "",
    });

    const nameError = ref<string>("");
    const dateError = ref<string>("");
    const emailError = ref<string>("");
    const phoneError = ref<string>("");

    // Додати реактивну змінну для перевірки наявності помилок
    const hasValidationErrors = ref<boolean>(false);

    watch(localParticipant, (newVal) => {
      emit("update:newParticipant", newVal);
    });

    // Спостерігати за помилками та автоматично оновлювати hasValidationErrors
    watch([nameError, dateError, emailError, phoneError], () => {
      hasValidationErrors.value =
        !!nameError.value ||
        !!dateError.value ||
        !!emailError.value ||
        !!phoneError.value;
    });

    const validateName = () => {
      nameError.value = Validator.validateName(localParticipant.value.name);
    };

    const validateDateOfBirth = () => {
      const today = props.today || new Date().toISOString().split("T")[0];
      dateError.value = Validator.validateDateOfBirth(
        localParticipant.value.dateOfBirth,
        today
      );
    };

    const validateEmail = () => {
      emailError.value = Validator.validateEmail(
        localParticipant.value.email,
        false
      );
    };

    const validatePhoneNumber = () => {
      phoneError.value = Validator.validatePhoneNumber(
        localParticipant.value.phoneNumber
      );
    };

    const registerParticipant = () => {
      validateName();
      validateDateOfBirth();
      validateEmail();
      validatePhoneNumber();

      if (!hasValidationErrors.value) {
        emit("register-participant", localParticipant.value); // Emit localParticipant

        localParticipant.value = {
          name: "",
          dateOfBirth: "",
          email: "",
          phoneNumber: "",
        };
      }
    };

    return {
      localParticipant,
      nameError,
      dateError,
      emailError,
      phoneError,
      hasValidationErrors, // Повертаємо змінну
      registerParticipant,
      validateName,
      validateDateOfBirth,
      validateEmail,
      validatePhoneNumber,
    };
  },
});
</script>
