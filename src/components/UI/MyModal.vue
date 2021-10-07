<template>
  <div class="modal" v-if="modelValue" @click.stop="hideModal">
    <div @click.stop class="modal__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "my-modal",
  props: {
    modelValue: [Boolean],
  },
  methods: {
    hideModal() {
      this.$emit("close", false);
    },
  },
};
</script>

<style scoped>
.modal {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
}
.modal__content {
  margin: auto;
  background: white;
  border-radius: 8px;
  min-height: 50px;
  min-width: 300px;
  padding: 20px;
}
</style>