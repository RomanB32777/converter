<template>
  <div>
    <DoughnutChart v-bind="doughnutChartProps" />
  </div>
</template>

<script>
import { computed, ref, onMounted, watch } from "vue";
import { DoughnutChart, useDoughnutChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default {
  name: "my-pie-chart",
  components: { DoughnutChart },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const dataValues = ref([]); 
    const dataLabels = ref([]);
    const toggleLegend = ref(true);

    const testData = computed(() => ({
      labels: dataLabels.value, //dataValues.value.map((obj) => obj.date),
      datasets: [
        {
          data: dataValues.value,
          backgroundColor: [
              "#77CEFF",
              "#0079AF",
            ],
        },
      ],
    }));

    const options = computed(() => ({
      scales: {
        myScale: {
          type: "logarithmic",
          position: toggleLegend.value ? "left" : "right",
        },
      },
      plugins: {
        legend: {
          position: toggleLegend.value ? "top" : "bottom",
        },
        title: {
          display: true,
          text: "Distribution of cryptocurrencies in the portfolio.",
        },
      },
    }));

    const { doughnutChartProps, doughnutChartRef } = useDoughnutChart({
      chartData: testData,
      options,
    });

    function switchLegend() {
      toggleLegend.value = !toggleLegend.value;
    }

    watch(
      () => props.data,
      (currentValue) => {

        const labels = Object.keys(currentValue)
        const values = labels.map((i) =>  currentValue[i].total);

        dataValues.value = values
        dataLabels.value = labels
 
      },
      { deep: true }
    );

    return {
      switchLegend,
      testData,
      options,
      doughnutChartRef,
      doughnutChartProps,
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
