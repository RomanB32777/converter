<template>
  <div>
    <form @submit.prevent>
      <h4>{{ typeEvent === "add" ? "Adding" : "Removal of " }} cryptocurrency</h4>
      <div class="input-group">
        <my-select
          v-model="purchase.selectedCurrency"
          :options="cryptoCurrenciesOptions"
        />
        <my-number-input v-model="purchase.number" />
      </div>

      <my-button class="btn-form" :type="typeEvent === 'add' ? 'success' : 'danger'" @click="eventCryptoPuchase">{{
        typeEvent === "add" ? "+" : "-"
      }}</my-button>
    </form>
  </div>
</template>

<script>
import MySelect from "./UI/MySelect.vue";
import { mapState, mapGetters } from "vuex";

export default {
  components: { MySelect },
  name: "form-purchase",
  props: {
    typeEvent: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      purchase: {
        number: 1,
        selectedCurrency: {
          value: "btc",
          id: "bitcoin",
        },
      },
    };
  },
  computed: {
    ...mapState({
      exchangeRates: (state) => state.portfolio.exchangeRates,
    }),
    ...mapGetters({
      cryptoCurrenciesOptions: "converter/cryptoCurrenciesOptions",
    }),
  },
  methods: {
    eventCryptoPuchase() {
      this.$emit("event", { purchase: this.purchase, event: this.typeEvent });
    },
  },
};
</script>

<style lang="scss" scoped>
.btn-form {
  margin-top: 1rem;
}
</style>