<template>
  <select class="form-select" v-model="modelValue.value" @change="changeOption">
    <option disabled value="">Выберите</option>
    <option
      v-for="option in options"
      :data-id="option.id"
      :key="option.value"
      :value="option.value"
    >
      {{ option.name }}
    </option>
  </select>
</template>

<script>
export default {
  name: "my-select",
  props: {
    modelValue: {
      type: Object,
    },
    options: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    changeOption({ target }) {
      this.$emit("update:modelValue", {
        ...this.modelValue,
        id: target.options[target.options.selectedIndex].dataset.id,
        value: target.value,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.form-select:disabled {
    background-color: $white !important;
}
</style>