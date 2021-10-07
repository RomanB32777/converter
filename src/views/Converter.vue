<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-6">
        <div class="app-block">
          <h3>Converter</h3>
          <div class="converter-block">
            <block-from-converter :options="currenciesOptions" />
            <div class="equals">
              <span>=</span>
            </div>
            <block-to-converter :options="toCurrenciesOptions" />
          </div>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="app-block">
          <my-line-chart
            :currencies="currencies"
            :from="currencyFromBlock"
            :to="currencyToBlock"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BlockFromConverter from "@/components/BlockFromConverter.vue";
import BlockToConverter from "@/components/BlockToConverter.vue";
import MyLineChart from "@/components/MyLineChart.vue";
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
  name: "Converter",
  components: { BlockFromConverter, BlockToConverter, MyLineChart },
  methods: {
    ...mapMutations({
      setCurrencyToBlock: "converter/setCurrencyToBlock",
    }),
  },
  computed: {
    ...mapState({
      currencies: (state) => state.converter.currencies,
      currencyToBlock: (state) => state.converter.currencyToBlock,
      currencyFromBlock: (state) => state.converter.currencyFromBlock,
    }),
    ...mapGetters({
      currenciesOptions: "converter/currenciesOptions",
    }),
    toCurrenciesOptions() {
      const options = this.currenciesOptions.filter(
        (c) => c.value !== this.currencyFromBlock.select.value
      );
      if (this.currencyFromBlock.select.value == this.currencyToBlock.select.value)
        this.setCurrencyToBlock({...this.currencyToBlock, select: {
          value: options[0].value,
          id: options[0].id
        }});
      return [...options];
    },
  },
};
</script>

<style lang="scss" scoped>
.converter-block {
  display: flex;
  flex-direction: column;
}
</style>