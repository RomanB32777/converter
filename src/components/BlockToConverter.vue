<template>
  <div class="input-group">
    <my-select :disabled="loading" v-model="currencyToBlock.select" :options="options" />
    <my-number-input
      ref="numberInput"
      :disabled="true"
      v-model="currencyToBlock.number"
    />
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import axios from "axios";

export default {
  name: "block-to-converter",
  props: {
    options: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    ...mapMutations({
      setCurrencyToBlock: "converter/setCurrencyToBlock",
      setLoading: "converter/setLoading",
    }),
    async fetchCurrencies(from, to) {
      try {
        this.setLoading(true);
        const { data } = await axios.get(
          `https://api.coingecko.com/api/v3/simple/price?ids=${from}&vs_currencies=${to}`
        );
        this.setLoading(false);
        return data[from][to];
      } 
      catch (error) {
        console.log(error);
        this.setLoading(false);
      }
    },
  },
  computed: {
    ...mapState({
      currencyToBlock: state => state.converter.currencyToBlock,
      currencyFromBlock: state => state.converter.currencyFromBlock,
      loading: state =>  state.converter.loading
    }),
  },
  watch: {
    currencyFromBlock: {
      async handler(newVal) {
        this.fetchCurrencies(
          newVal.select.id,
          this.currencyToBlock.select.value
        ).then((price) => this.$refs.numberInput.setVal(price * newVal.number));
      },
      deep: true,
    },
    currencyToBlock: {
      async handler(newVal) {
        this.setCurrencyToBlock(newVal);

        this.fetchCurrencies(
          this.currencyFromBlock.select.id,
          newVal.select.value
        ).then((price) => this.$refs.numberInput.setVal(price * this.currencyToBlock.number));
      },
      deep: true,
    },
  },
  mounted() {
    this.fetchCurrencies(
      this.currencyFromBlock.select.id,
      this.currencyToBlock.select.value
    ).then((price) =>
      this.$refs.numberInput.setVal(price * this.currencyFromBlock.number)
    );
  },
};
// this.setCurrencyToBlock({
//   ...this.currencyToBlock,
//   number:
//     data[from.id][this.currencyToBlock.select.value] * newVal.number,
// });
</script>

<style lang="scss" scoped>
</style>