<template>
  <div class="input-group">
    <my-select :disabled="loading" v-model="currencyFromBlock.select" :options="options" />
    <my-number-input :disabled="loading" v-model="currencyFromBlock.number" />
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "block-from-converter",
  props: {
    options: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    ...mapMutations({
      setCurrencyFromBlock: "converter/setCurrencyFromBlock",
    }),
  },
  computed: {
    ...mapState({
      currencyFromBlock: (state) => state.converter.currencyFromBlock,
      loading: state =>  state.converter.loading
    }),
  },
  watch: {
    currencyFromBlock: {
      handler(newVal) {
        this.setCurrencyFromBlock(newVal);
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
</style>