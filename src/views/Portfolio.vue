<template>
  <div class="container">
    <transition name="fade">
      <b-spinner v-if="loading" variant="success"></b-spinner>
    </transition>
    <div v-if="!loading" class="row">
      <div class="col-lg-7">
        <div class="app-block">
          <h3>Portfolio history</h3>
          <b-table responsive striped hover :items="getTransactionHistory">
            <template #cell(delete)="data">
              <my-button
                :type="'danger'"
                :data-id="data.value"
                @click="removePuchaseFromHistory"
                >X</my-button
              >
            </template>
          </b-table>
          <div class="portfolio-buttons">
            <my-button :type="'success'" @click="() => eventAddModal(true)">+ Coin</my-button>
            <my-button :type="'danger'" @click="() => eventRemoveModal(true)">- Coin</my-button>
          </div>
        </div>
      </div>
      <div class="col-lg-5">
        <div class="app-block">
          <h3>Total USD: {{ getPurceTotalValue }}$</h3>
          <my-pie-chart :data="getCryptoWallet" />
        </div>
      </div>
    </div>

    <my-modal v-model="addVisible" @close="() => eventAddModal(false)">
      <form-purchase :typeEvent="'add'" @event="eventCryptoPuchase" />
    </my-modal>

    <my-modal v-model="removeVisible" @close="() => eventRemoveModal(false)">
      <form-purchase :typeEvent="'remove'" @event="eventCryptoPuchase" />
    </my-modal>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
import MyPieChart from "@/components/MyPieChart.vue";
import FormPurchase from "@/components/FormPurchase.vue";

export default {
  name: "Portfolio",
  components: { MyPieChart, FormPurchase },
  data() {
    return {
      addVisible: false,
      removeVisible: false,
    };
  },
  computed: {
    ...mapState({
      transactionHistory: (state) => state.portfolio.transactionHistory,
      exchangeRates: (state) => state.portfolio.exchangeRates,
      currencies: (state) => state.converter.currencies,
      loading: (state) => state.converter.loading,
    }),
    ...mapGetters({
      getTransactionHistory: "portfolio/getTransactionHistory",
      getPurceTotalValue: "portfolio/getPurceTotalValue",
      getCryptoWallet: "portfolio/getCryptoWallet",
    }),
  },
  methods: {
    ...mapActions({
      fetchExchangeRates: "portfolio/fetchExchangeRates",
    }),
    ...mapMutations({
      setTransactionHistory: "portfolio/setTransactionHistory",
    }),
    eventAddModal(flag) {
      this.addVisible = flag;
    },
    eventRemoveModal(flag) {
      this.removeVisible = flag;
    },
    addCryptoPuchase(purchase) {
      this.setTransactionHistory([
        ...this.transactionHistory,
        {
          id: this.transactionHistory.length
            ? this.transactionHistory[this.transactionHistory.length - 1].id + 1
            : 0,
          ...purchase,
        },
      ]);
    },
    removeNumPuchase(remote) {
      console.log(remote);
    },
    eventCryptoPuchase({ purchase, event }) {
      const price = this.exchangeRates[purchase.selectedCurrency.id];
      const total = price * purchase.number;

      if (
        event !== "add" &&
        this.getCryptoWallet[purchase.selectedCurrency.id] &&
        this.getCryptoWallet[purchase.selectedCurrency.id].number <
          purchase.number
      )
        return;

      this.setTransactionHistory([
        ...this.transactionHistory,
        {
          id: this.transactionHistory.length
            ? this.transactionHistory[this.transactionHistory.length - 1].id + 1
            : 0,
          action: event,
          coin: purchase.selectedCurrency.id,
          number: purchase.number,
          price,
          total: +total.toFixed(2),
        },
      ]);
      event !== "add"
        ? (this.removeVisible = false)
        : (this.addVisible = false);
    },

    removePuchaseFromHistory({ target }) {
      this.setTransactionHistory([
        ...this.transactionHistory.filter(
          (puchase) => puchase.id !== +target.dataset.id
        ),
      ]);
    },
  },
  mounted() {
    this.fetchExchangeRates(this.currencies);
  },
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.portfolio-buttons button {
  margin-right: 1rem;
}
</style>