<template>
  <div class="container-right">
    <component
      :is="item.type | getCategoryName"
      :item="item"
      :key="item.id"
    ></component>
  </div>
</template>

<script>
import database from "./database";
import defaultCmp from "./defaultCmp";
import toolA from "./toolA";
import toolB from "./toolB";
import toolC from "./toolC";
import toolD from "./toolD";
import toolE from "./toolE";
import toolF from "./toolF";
import toolG from "./toolG";
import toolH from "./toolH";
import toolI from "./toolI";
import toolJ from "./toolJ";
import toolK from "./toolK";
import toolL from "./toolL";
import modelInfo from "./modelInfo";
import chartA from "./chartA";
import { mapGetters } from "vuex";
export default {
  computed: {

    ...mapGetters({
      item: "getCurrentClickNode"
    })
  },
  data() {
    return {};
  },
  components: {
    database,
    defaultCmp,
    toolA,
    toolB,
    toolC,
    toolD,
    toolE,
    toolF,
    toolG,
    toolH,
    toolI,
    toolJ,
    toolK,
    toolL,
    modelInfo,
    chartA
  }
};
</script>

<style lang="scss" scoped>
.container-right {
  width: 300px;
  padding: 10px;
  height: 100vh;
}
</style>
