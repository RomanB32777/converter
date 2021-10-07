<template>
  <input ref="input" :disabled="disabled" type="number" :value="modelValue" class="form-control my-input" @input="updateInput" />
</template>

<script>
export default {
  name: "my-number-input",
  props: {
      modelValue: [Number],
      disabled: Boolean
  },
  methods: {
      updateInput (event) {
          this.$emit('update:modelValue', Number(event.target.value))
      },
      setVal (newVal) {
        this.$refs.input.value = newVal
      }
  }
};
</script>

<style lang="scss" scoped>
.form-control:disabled {
    background-color: $white !important;
}
</style>