<template>
  <input type="text" :value="modelValue" class="form-control my-input" @input="updateInput" />
</template>

<script>
export default {
  name: "my-text-input",
  props: {
      modelValue: [String],
  },
  methods: {
      updateInput (event) {
          this.$emit('update:modelValue', event.target.value)
      }
  }
};
</script>

<style lang="scss" scoped>
</style>