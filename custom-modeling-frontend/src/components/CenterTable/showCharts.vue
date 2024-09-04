<template>
  <v-chart class="chart" :option="getChartOptions" />
</template>

<script>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);

import { mapGetters } from "vuex";
export default {
  components: {
    VChart,
  },
  provide: {
    [THEME_KEY]: "dark",
  },
  computed: {
    ...mapGetters({
      getChartOptions: "getChartOptions",
    }),
  },
  data() {
    return {
    };
  }
};
</script>

<style lang="scss" scoped>
.chart {
  height: 500px;
}
</style>