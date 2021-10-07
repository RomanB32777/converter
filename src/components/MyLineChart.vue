<template>
  <div>
    <LineChart v-bind="lineChartProps" />
  </div>
</template>

<script>
import axios from "axios";
import { computed, ref, onMounted, watch } from "vue";
import { LineChart, useLineChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default {
  name: "my-line-chart",
  components: { LineChart },
  props: {
    from: {
      type: Object,
      required: true,
    },
    to: {
      type: Object,
      required: true,
    },
    currencies: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const dataValues = ref([]);
    const dataTitle = ref("");

    const testData = computed(() => ({
      labels: dataValues.value.map((obj) => obj.date),
      datasets: [
        {
          data: dataValues.value.map((obj) => obj.price),
          backgroundColor: "#77CEFF",
        },
      ],
    }));

    const options = computed(() => ({
      legend: {
        display: false,
      },
      scales: {
        myScale: {
          type: "logarithmic",
          position: "left",
        },
      },
      plugins: {
        legend: {
          display: false
        },
        title: {
          display: true,
          text: dataTitle.value
        },
      },
    }));

    const { lineChartProps, lineChartRef } = useLineChart({
      chartData: testData,
      options,
    });

    const fetching = async (from, to) => {
      console.log(from, to);
      if (from !== "uniswap-state-dollar" && to !== "uniswap-state-dollar") {
        try {
          const { data } = await axios.get(
            `https://api.coingecko.com/api/v3/coins/${from}/market_chart?vs_currency=${to}&days=14&interval=daily`
          );
          const chartPrices = data.prices.map((price) => ({
            date: new Date(price[0]).toLocaleDateString(),
            price: price[1],
          }));
          dataValues.value = chartPrices;
          dataTitle.value = `${from} to ${to} exchange rate`
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      }
    };

    watch(props.from, async (newValue) => {
      await fetching(newValue.select.id, props.to.select.value);
    });

    watch(
      () => props.to,
      async (newValue) => {
        if (props.from.select.value === "usd") {
          await fetching(newValue.select.id, props.from.select.value);
        } else {
          await fetching(props.from.select.id, newValue.select.value);
        }
      },
      { deep: true }
    );

    onMounted(() => {
      fetching(props.from.select.id, props.to.select.value);
    });

    return {
      testData,
      options,
      lineChartRef,
      lineChartProps,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>


