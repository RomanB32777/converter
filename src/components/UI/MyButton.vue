<template>
  <b-button :variant="type">
    <slot></slot>
  </b-button>
</template>

<script>
export default {
  name: "my-button",
  props: {
    type: [String]
  }
};
</script>

<style lang="scss" scoped>
</style>