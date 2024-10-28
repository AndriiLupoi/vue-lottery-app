<template>
  <div class="card">
    <h3>REGISTER FORM</h3>
    <p>Please fill in all the fields.</p>
    <form @submit.prevent="registerParticipant" novalidate>
      <ParticipantInput
        label="Name"
        v-model="localParticipant.name"
        :errorMessage="nameError"
        :validate="validateName"
      />
      <ParticipantInput
        label="Date of Birth"
        inputType="date"
        v-model="localParticipant.dateOfBirth"
        :max="today"
        :errorMessage="dateError"
        :validate="validateDateOfBirth"
      />
      <ParticipantInput
        label="Email"
        inputType="email"
        v-model="localParticipant.email"
        :errorMessage="emailError"
        :validate="validateEmail"
      />
      <ParticipantInput
        label="Phone number"
        inputType="tel"
        v-model="localParticipant.phoneNumber"
        :errorMessage="phoneError"
        :validate="validatePhoneNumber"
      />
      <ActionButton text="Save" type="submit" :disabled="hasValidationError" />
    </form>
  </div>
</template>

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
    const hasValidationError = ref(false);

    watch(localParticipant, (newVal) => {
      emit("update:newParticipant", newVal);
    });
    watch([nameError, dateError, emailError, phoneError], () => {
      hasValidationError.value = !!(
        nameError.value ||
        dateError.value ||
        emailError.value ||
        phoneError.value
      );
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

      if (
        !nameError.value &&
        !dateError.value &&
        !emailError.value &&
        !phoneError.value
      ) {
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
      registerParticipant,
      validateName,
      validateDateOfBirth,
      validateEmail,
      validatePhoneNumber,
      hasValidationError,
    };
  },
});
</script>
