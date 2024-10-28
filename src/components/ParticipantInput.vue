<template>
  <div class="form-group">
    <label>{{ label }}</label>
    <input
      v-model="inputValue"
      @input="onInput"
      :type="inputType"
      class="form-control"
      :class="{ 'is-invalid': hasError }"
      required
    />
    <div class="text-danger" v-if="hasError">{{ errorMessage }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from "vue";

export default defineComponent({
  name: "ParticipantInput",
  props: {
    label: String,
    inputType: {
      type: String,
      default: "text",
    },
    modelValue: String,
    errorMessage: String,
    validate: Function,
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const inputValue = ref(props.modelValue);

    watch(
      () => props.modelValue,
      (newValue) => {
        inputValue.value = newValue;
      }
    );

    const onInput = () => {
      emit("update:modelValue", inputValue.value);
      if (props.validate) {
        props.validate();
      }
    };

    const hasError = computed(() => !!props.errorMessage);

    return {
      inputValue,
      onInput,
      hasError,
    };
  },
});
</script>

<style scoped>
.text-danger {
  font-size: 0.875em;
}
</style>
